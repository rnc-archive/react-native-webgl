package fr.greweb.rnwebgl;

import com.facebook.soloader.SoLoader;

// Java bindings for URNWebGL.h interface
public class RNWebGL {
  static {
    SoLoader.loadLibrary("rnwebgl");
  }
  public static native int RNWebGLContextCreate(long jsCtxPtr);
  public static native void RNWebGLContextDestroy(int ctxId);
  public static native void RNWebGLContextFlush(int ctxId);

  public static native int RNWebGLContextCreateObject(int ctxId);
  public static native void RNWebGLContextDestroyObject(int ctxId, int objId);
  public static native void RNWebGLContextMapObject(int ctxId, int objId, int glObj);
}
