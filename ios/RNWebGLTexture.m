#import "RNWebGLTexture.h"

@implementation RNWebGLTexture {
  bool _attached;
  NSMutableArray *attachedEventQueue;
}

- (instancetype)initWithConfig:(NSDictionary *)config withWidth:(int)width withHeight:(int)height
{
  if ((self = [super init])) {
    _ctxId = [config[@"ctxId"] unsignedIntValue];
    _objId = RNWebGLContextCreateObject(_ctxId);
    _width = width;
    _height = height;
    _attached = false;
    attachedEventQueue = [[NSMutableArray alloc] init];
  }
  return self;
}

- (void)attachTexture: (GLuint)texture {
  RNWebGLContextMapObject(_ctxId, _objId, texture);
  _attached = true;
  for (RNWebGLListenAttachedCallback cb in attachedEventQueue) {
    cb();
  }
  attachedEventQueue = [[NSMutableArray alloc] init];
}

- (bool)isAttached {
  return _attached;
}
- (void)listenAttached: (RNWebGLListenAttachedCallback)callback {
  [attachedEventQueue addObject:callback];
}

- (void)unload {
  // this is meant to be overrided by implementations. they should dispose everything so the dealloc below is reached
}

- (void)dealloc
{
  if (_objId != 0) {
    RNWebGLContextDestroyObject(_ctxId, _objId);
  }
}

@end

