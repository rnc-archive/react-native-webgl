#ifndef __RNWebGL_H__
#define __RNWebGL_H__


#ifdef __ANDROID__
#include <GLES2/gl2.h>
#endif
#ifdef __APPLE__
#include <OpenGLES/ES2/gl.h>
#endif

#include <JavaScriptCore/JSBase.h>


// NOTE: The symbols exposed by this header are named with a `UEX` prefix rather than an `EX`
//       prefix so that they are unaffected by the automated iOS versioning script when
//       referenced in versioned Objective-C code. The RNWebGL C/C++ library is not versioned
//       and there is only one copy of its code in the binary form of the Expo application.


#ifdef __cplusplus
extern "C" {
#endif

// Identifies an RNWebGL context. No RNWebGL context has the id 0, so that can be
// used as a 'null' value.
typedef unsigned int RNWebGLContextId;

// [JS thread] Create an RNWebGL context and return its id number. Saves the
// JavaScript interface object (has a WebGLRenderingContext-style API) at
// `global.__RNWebGLContexts[id]` in JavaScript.
RNWebGLContextId RNWebGLContextCreate(JSGlobalContextRef jsCtx);

// [Any thread] Release the resources for an RNWebGL context. The same id is never
// reused.
void RNWebGLContextDestroy(RNWebGLContextId ctxId);

// [GL thread] Perform one frame's worth of queued up GL work
void RNWebGLContextFlush(RNWebGLContextId ctxId);

// [GL thread] Set the default framebuffer (used when binding 0). Allows using
// platform-specific extensions on the default framebuffer, such as MSAA.
void RNWebGLContextSetDefaultFramebuffer(RNWebGLContextId ctxId, GLint framebuffer);


// Identifies an RNWebGL object. RNWebGL objects represent virtual mappings to underlying OpenGL objects.
// No RNWebGL object has the id 0, so that can be used as a 'null' value.
typedef unsigned int RNWebGLTextureId;

// [Any thread] Create an RNWebGL object. Initially maps to the OpenGL object zero.
RNWebGLTextureId RNWebGLContextCreateObject(RNWebGLContextId ctxId);

// [GL thread] Destroy an RNWebGL object.
void RNWebGLContextDestroyObject(RNWebGLContextId ctxId, RNWebGLTextureId id);

// [GL thread] Set the underlying OpenGL object an RNWebGL object maps to.
void RNWebGLContextMapObject(RNWebGLContextId ctxId, RNWebGLTextureId id, GLuint glObj);
    
#ifdef __cplusplus
}
#endif


#endif
