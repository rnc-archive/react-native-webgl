#include <stdint.h>
#include <jni.h>
#include <JavaScriptCore/JSContextRef.h>
#include "RNWebGL.h"

JNIEXPORT jint JNICALL
Java_fr_greweb_rnwebgl_RNWebGL_RNWebGLContextCreate
(JNIEnv *env, jclass clazz, jlong jsCtxPtr) {
  JSGlobalContextRef jsCtx = (JSGlobalContextRef) (intptr_t) jsCtxPtr;
  if (jsCtx) {
    return RNWebGLContextCreate(jsCtx);
  }
  return 0;
}

JNIEXPORT void JNICALL
Java_fr_greweb_rnwebgl_RNWebGL_RNWebGLContextDestroy
(JNIEnv *env, jclass clazz, jint ctxId) {
  RNWebGLContextDestroy(ctxId);
}

JNIEXPORT void JNICALL
Java_fr_greweb_rnwebgl_RNWebGL_RNWebGLContextFlush
(JNIEnv *env, jclass clazz, jint ctxId) {
  RNWebGLContextFlush(ctxId);
}

JNIEXPORT jint JNICALL
Java_fr_greweb_rnwebgl_RNWebGL_RNWebGLContextCreateObject
(JNIEnv *env, jclass clazz, jint exglCtxId) {
  return RNWebGLContextCreateObject(exglCtxId);
}

JNIEXPORT void JNICALL
Java_fr_greweb_rnwebgl_RNWebGL_RNWebGLContextDestroyObject
(JNIEnv *env, jclass clazz, jint exglCtxId, jint exglObjId) {
  RNWebGLContextDestroyObject(exglCtxId, exglObjId);
}

JNIEXPORT void JNICALL
Java_fr_greweb_rnwebgl_RNWebGL_RNWebGLContextMapObject
(JNIEnv *env, jclass clazz, jint exglCtxId, jint exglObjId, jint glObj) {
  RNWebGLContextMapObject(exglCtxId, exglObjId, glObj);
}
