package com.pb.expressdrive.Service;

import com.pb.expressdrive.Domain.Dto.ImgDto;
import com.pb.expressdrive.Domain.Dto.ResponseDto;
import com.pb.expressdrive.Helper.Error.CustomException;
import com.pb.expressdrive.Helper.Error.ErrorInfo;
import com.pb.expressdrive.Util.GifSequenceWriter.GifDecoder;
import com.pb.expressdrive.Util.GifSequenceWriter.GifSequenceWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.FileImageOutputStream;
import javax.imageio.stream.ImageOutputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImgService {
    private final UserService userService;
    private final String defaultPath = System.getProperty("user.dir") + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static";
    private final String path = defaultPath + File.separator + "img" + File.separator;


    private final String dirName = "/img";

    public String getImgPath() {
        return this.path;
    }

    public String getBasePath() {
        return this.defaultPath;
    }

    public String getRelativeImgPath(String imgSrc) {
        return dirName + "/" + imgSrc;
    }

    public void setUserProfileImgSrc(Authentication authentication, String path) {
        if (path != null) userService.setProfileImgSrc(authentication, path);
    }

    //validation
    public void imgValidation(MultipartFile multipartFile, String originalNameExtension) {

        if (!(multipartFile != null && !(multipartFile.getOriginalFilename().equals("")))) {
            throw new CustomException(ErrorInfo.VALID_CHECK_ERROR);
        }

        if (!((originalNameExtension.equals("jpg")) || (originalNameExtension.equals("jpeg")) || (originalNameExtension.equals("png")) || (originalNameExtension.equals("bmp") || (originalNameExtension.equals("gif"))))) {
            throw new CustomException(ErrorInfo.VALID_CHECK_ERROR);
        }

        long filesize = multipartFile.getSize(); // 파일크기
        long limitFileSize = 10 * 1024 * 1024;
        if (limitFileSize < filesize) { // 제한보다 파일크기가 클 경우
            throw new CustomException(ErrorInfo.SIZE_ERROR);
        }
    }

    public List<ImgDto> addImg(List<MultipartFile> multipartFiles, Boolean needResize) {
        List<ImgDto> resultList = new ArrayList<>();
        for (MultipartFile multipartFile : multipartFiles) {
            if (multipartFile != null && !(multipartFile.getOriginalFilename().equals(""))) {
                // 파일 저장명 처리 (20150702091941-fd8-db619e6040d5.확장자)
                SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
                String today = formatter.format(new Date());
                String originalName = multipartFile.getOriginalFilename(); // 실제 파일명
                String originalNameExtension = originalName.substring(originalName.lastIndexOf(".") + 1).toLowerCase(); // 실제파일 확장자 (소문자변경)
                String modifyName = today + "-" + UUID.randomUUID().toString().substring(20) + "." + originalNameExtension;

                imgValidation(multipartFile,originalNameExtension);

                // 저장경로 처리
                String path = getImgPath();
                File file = new File(path);
                if (!file.exists()) { // 디렉토리 존재하지 않을경우 디렉토리 생성
                    file.mkdirs();
                }

                try {
                    if(needResize) resize(multipartFile,path + modifyName);
                    else multipartFile.transferTo(new File(path + modifyName));

                } catch (Exception ex) {
                    throw new RuntimeException(ex);
                }

                // 로그
                System.out.println("** upload 정보 **");
                System.out.println("** path : " + path + " **");
                System.out.println("** originalName : " + originalName + " **");
                System.out.println("** modifyName : " + modifyName + " **");

                ImgDto imgDto = ImgDto.builder()
                        .filename(modifyName)
                        .imagealign("C")
                        .imageurl("/get.cf?fileName=" + modifyName)
                        .thumburl("/get.cf?fileName=" + modifyName)
                        .filesize(String.valueOf(multipartFile.getSize()))
                        .originalurl(originalName)
                        .build();
                resultList.add(imgDto);
//            // CallBack - Map에 담기
//            String imageurl = httpSession.getServletContext().getContextPath() + "/upload/board/images/" + modifyName;    // separator와는 다름!
//            fileInfo.put("imageurl", imageurl);     // 상대파일경로(사이즈변환이나 변형된 파일)
//            fileInfo.put("filename", modifyName);   // 파일명
//            fileInfo.put("filesize", filesize);     // 파일사이즈
//            fileInfo.put("imagealign", "C");        // 이미지정렬(C:center)
//            fileInfo.put("originalurl", imageurl);  // 실제파일경로
//            fileInfo.put("thumburl", imageurl);     // 썸네일파일경로(사이즈변환이나 변형된 파일)
//            fileInfo.put("result", 1);                // -1, -2를 제외한 아무거나 싣어도 됨
            }
        }
        return resultList;

    }

    private void resize(MultipartFile multipartFile, String outputPath) throws Exception{
        int targetWidth = 200;
        int targetHeight = 200;

        BufferedImage originalImage = ImageIO.read(multipartFile.getInputStream());
        BufferedImage resizedImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        String type = multipartFile.getContentType().substring(multipartFile.getContentType().indexOf("/") + 1);

        Graphics2D graphics2D = resizedImage.createGraphics();
        graphics2D.drawImage(originalImage, 0, 0, targetWidth, targetHeight, null);
        graphics2D.dispose();

        if(type.equals("gif")){
            gifResize(multipartFile,outputPath);
        }else{
            elseResize(originalImage,resizedImage,outputPath,type);
        }

    }

    private void elseResize(BufferedImage originalImage, BufferedImage resizedImage, String outputPath,String type) throws IOException {
        File outputfile = new File(outputPath);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ImageIO.write(resizedImage, type, new File(outputPath));

        if (outputfile.createNewFile()) {
//            InputStream inputStream = new ByteArrayInputStream(bos.toByteArray());
//            Files.copy(inputStream, outputfile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        }

    }

    private void gifResize(MultipartFile multipartFile,String outputPath) throws IOException {
        InputStream targetStream = new ByteArrayInputStream(multipartFile.getBytes());
        GifDecoder gifDecoder = new GifDecoder();
        gifDecoder.read(targetStream);

        ImageOutputStream imageOutputStream = new FileImageOutputStream(new File(outputPath));
        final int DELAY_TIME = 100; // 다음 프레임으로 전환되는 지연 시간(ms)
        GifSequenceWriter gifSequenceWriter = new GifSequenceWriter(imageOutputStream, gifDecoder.getFrame(0).getType(), DELAY_TIME, true);

        for(int i=0;i<gifDecoder.getFrameCount();i++){
            BufferedImage image = gifDecoder.getFrame(i); // 인덱스에 해당하는 프레임 추출
            gifSequenceWriter.writeToSequence(image);
        }
    }


    public void validation(List<MultipartFile> imgList, ResponseDto responseDto) {
        if(imgList.size() > 10){
            throw new CustomException(ErrorInfo.SIZE_ERROR);
        }


        for(MultipartFile img : imgList){
            String originalName = img.getOriginalFilename(); // 실제 파일명
            String originalNameExtension = originalName.substring(originalName.lastIndexOf(".") + 1).toLowerCase(); // 실제파일 확장자 (소문자변경)
            imgValidation(img,originalNameExtension);
        }

    }
}