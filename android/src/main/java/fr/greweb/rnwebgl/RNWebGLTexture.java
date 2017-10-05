package fr.greweb.rnwebgl;

import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicBoolean;

import static fr.greweb.rnwebgl.RNWebGL.*;

public class RNWebGLTexture {
    public final int ctxId;
    public final int objId;
    public final int width;
    public final int height;
    private AtomicBoolean attached = new AtomicBoolean(false);
    private ArrayList<Runnable> mAttachEventQueue = new ArrayList<>();


    public RNWebGLTexture(ReadableMap config, int width, int height) {
        this.ctxId = config.getInt("ctxId");
        this.objId = RNWebGLContextCreateObject(this.ctxId);
        this.width = width;
        this.height = height;
    }

    public synchronized void attachTexture (int texture) {
        RNWebGLContextMapObject(ctxId, objId, texture);
        attached.set(true);
        if (!mAttachEventQueue.isEmpty()) {
            for (Runnable r : new ArrayList<>(mAttachEventQueue)) {
                r.run();
            }
            mAttachEventQueue.clear();
        }
    }

    public synchronized boolean listenAttached (Runnable r) {
        if(attached.get()){
            r.run();
            return true;
        } else {
            return mAttachEventQueue.add(r);
        }
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
