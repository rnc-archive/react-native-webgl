#import "RNWebGL.h"

@interface RNWebGLTexture: NSObject

- (instancetype)initWithConfig:(NSDictionary *)config withWidth:(int)width withHeight:(int)height;

// called by the implementation to bind the GL texture to the object, needs to run on GL Thread
- (void)attachTexture: (GLuint)texture;

@property (nonatomic, assign) RNWebGLContextId ctxId;
@property (nonatomic, assign) RNWebGLTextureId objId;
@property (nonatomic, assign) int width;
@property (nonatomic, assign) int height;

@end
