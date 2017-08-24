#import "RNWebGLTexture.h"

@implementation RNWebGLTexture

- (instancetype)initWithConfig:(NSDictionary *)config withWidth:(int)width withHeight:(int)height
{
  if ((self = [super init])) {
    _ctxId = [config[@"ctxId"] unsignedIntValue];
    _objId = RNWebGLContextCreateObject(_ctxId);
    _width = width;
    _height = height;
  }
  return self;
}

- (void)attachTexture: (GLuint)texture {
  RNWebGLContextMapObject(_ctxId, _objId, texture);
}

- (void)dealloc
{
  if (_objId != 0) {
    RNWebGLContextDestroyObject(_ctxId, _objId);
  }
}

@end

