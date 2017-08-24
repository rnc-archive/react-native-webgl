package fr.greweb.rnwebgl;

import com.facebook.react.bridge.ReadableMap;
import static fr.greweb.rnwebgl.RNWebGL.*;

class RNWebGLTexture {
    public final int ctxId;
    public final int objId;
    public final int width;
    public final int height;

    public RNWebGLTexture(ReadableMap config, int width, int height) {
        this.ctxId = config.getInt("ctxId");
        this.objId = RNWebGLContextCreateObject(this.ctxId);
        this.width = width;
        this.height = height;
    }

    public void attachTexture (int texture) {
        RNWebGLContextMapObject(ctxId, objId, texture);
    }

    public void destroy() {
        if (objId != 0) {
            RNWebGLContextDestroyObject(ctxId, objId);
        }
    }

    public void runOnGLThread (Runnable runnable) {
        RNWebGLView.runOnGLThread(ctxId, runnable);
    }
}
