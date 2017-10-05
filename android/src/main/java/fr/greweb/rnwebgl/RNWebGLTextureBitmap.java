package fr.greweb.rnwebgl;

import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.opengl.GLUtils;

import com.facebook.react.bridge.ReadableMap;
import static android.opengl.GLES20.*;

public class RNWebGLTextureBitmap extends RNWebGLTexture implements Runnable {

    final Bitmap bitmap;

    private int glTexture = -1;

    public RNWebGLTextureBitmap(ReadableMap config, Bitmap source) {
        super(config, source.getWidth(), source.getHeight());
        boolean yflip = config.hasKey("yflip") && config.getBoolean("yflip");
        Bitmap src;
        if (yflip) {
            Matrix matrix = new Matrix();
            matrix.postScale(1, -1);
            src = Bitmap.createBitmap(source, 0, 0, source.getWidth(), source.getHeight(), matrix, true);
            src.setHasAlpha(source.hasAlpha());
        }
        else {
            src = source;
        }
        bitmap = src.copy(src.getConfig(), src.isMutable());
        this.runOnGLThread(this);
    }

    @Override
    public void destroy() {
        super.destroy();
        if (glTexture >= 0) {
            final int[] textures = new int[]{glTexture};
            this.runOnGLThread(new Runnable() {
                public void run() {
                    glDeleteTextures(1, textures, 0);
                }
            });
        }
    }

    public void run() {
        int[] textures = new int[1];
        glGenTextures(1, textures, 0);
        glTexture = textures[0];
        int[] boundedBefore = new int[1];
        glGetIntegerv(GL_TEXTURE_BINDING_2D, boundedBefore, 0);
        glBindTexture(GL_TEXTURE_2D, glTexture);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
        GLUtils.texImage2D(GL_TEXTURE_2D, 0, bitmap, 0);
        // Restore the previous texture bind to not affect user code
        glBindTexture(GL_TEXTURE_2D, boundedBefore[0]);
        this.attachTexture(glTexture);
    }
}
