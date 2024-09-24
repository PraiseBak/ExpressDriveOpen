package com.pb.expressdrive.Controller;

//첨부파일 url mapping
//img 태그의 src에서 실제 경로를 숨기기 위해 controller로 mapping 함.
//dao에서 새로 정보를 가져온 것은 아님! 커뮤니티 상세 정보를 가져오면서 같이 가져온 file정보를 이용함


import com.pb.expressdrive.Service.ImgService;
import lombok.AllArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URL;

@AllArgsConstructor
@Controller
public class FileController {
    private ImgService imgService;

    //Todo 이내용 다시 공부하자
    @RequestMapping("get.cf")
    public void getFile(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //응답할 타입 설정
        response.setContentType("application/jpeg");

        //숨겨기고 싶은 url(dir)
        String url = "file:///"+ imgService.getImgPath();

        //보여줄 파일 이름
        String fileName = request.getParameter("fileName");

        //보여줘야할 최종 url 만들기
        URL fileUrl = new URL(url + fileName);
        //fileUrl을 읽어와서 응답(써준)해준다.
        IOUtils.copy(fileUrl.openStream(), response.getOutputStream());
    }
}