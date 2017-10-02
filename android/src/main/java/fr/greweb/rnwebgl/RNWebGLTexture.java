package fr.greweb.rnwebgl;

import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;

import static fr.greweb.rnwebgl.RNWebGL.*;

public class RNWebGLTexture {
    public final int ctxId;
    public final int objId;
    public final int width;
    public final int height;
    private boolean attached = false;
    private ArrayList<Runnable> mAttachEventQueue = new ArrayList<>();


    public RNWebGLTexture(ReadableMap config, int width, int height) {
        this.ctxId = config.getInt("ctxId");
        this.objId = RNWebGLContextCreateObject(this.ctxId);
        this.width = width;
        this.height = height;
    }

    public void attachTexture (int texture) {
        RNWebGLContextMapObject(ctxId, objId, texture);
        attached = true;
        if (!mAttachEventQueue.isEmpty()) {
            for (Runnable r : new ArrayList<>(mAttachEventQueue)) {
                r.run();
            }
            mAttachEventQueue.clear();
        }
    }

    public boolean isAttached () {
        return attached;
    }

    public boolean listenAttached (Runnable r) {
        return mAttachEventQueue.add(r);
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
