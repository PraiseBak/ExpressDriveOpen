import javax.imageio.*;
import javax.imageio.metadata.IIOMetadata;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.*;

public class GifWriter {

    private static final int WIDTH = 1024;
    private static final int HEIGHT = 1024;

    private static final int MAX_FRAMES = 64;

    public static void main(String[] args) throws Exception {
        final List<BufferedImage> frames = new ArrayList<>();
        for (int i = 0; i < MAX_FRAMES; ++i) {
            frames.add(createDummyBufferedImage(i, MAX_FRAMES, WIDTH, HEIGHT));
        }

        try (FileOutputStream fos = new FileOutputStream("out.gif")) {
            saveAnimatedGIF(fos, frames);
        }
    }

    // Generate a dummy image for testing.
    private static BufferedImage createDummyBufferedImage(int i, int maxI, int w, int h) {
        final BufferedImage image = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
        for (int y = 0; y < h; ++y) {
            for (int x = 0; x < w; ++x) {
                final double dx = (2.0 * x - w) / w;
                final double dy = (2.0 * y - h) / h;

                final int r = scale((dx + 1.0) / 2.0);
                final int g = scale((dy + 1.0) / 2.0);
                final int b = scale(Math.sqrt(dx*dx + dy*dy + (double)i / maxI));

                final int rgb = (r << 16) | (g << 8) | b;
                image.setRGB(x, y, rgb);
            }
        }

        return image;
    }

    private static int scale(double d) {
        final double d256 = d * 256.0;
        if (d < 0) {
            return 0;
        } else if (d >= 256.0) {
            return 255;
        } else {
            return (int)d256;
        }
    }

    public static void saveAnimatedGIF(OutputStream out, List<BufferedImage> frames) throws Exception {
        final ImageWriter iw = ImageIO.getImageWritersByFormatName("gif").next();

        try (final ImageOutputStream ios = ImageIO.createImageOutputStream(out)) {

            iw.setOutput(ios);
            iw.prepareWriteSequence(null);

            for (BufferedImage frame : frames) {
                final ImageWriteParam iwp = iw.getDefaultWriteParam();
                final IIOMetadata metadata = iw.getDefaultImageMetadata(new ImageTypeSpecifier(frame), iwp);

                final IIOImage ii = new IIOImage(frame, null, metadata);
                iw.writeToSequence(ii, null);
            }

            iw.endWriteSequence();}
    }
}