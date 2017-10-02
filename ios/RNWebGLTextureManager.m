#import "RNWebGLTextureManager.h"
#import "RNWebGLTextureLoader.h"

@implementation RNWebGLTextureManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(create:(NSDictionary *)config
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [_bridge.webglObjectLoader loadWithConfigAndWaitAttached:config withCompletionBlock:^(NSError *error, RNWebGLTexture *obj) {
    if (error) {
      reject(error.domain, error.description, error);
    }
    else {
      resolve(@{ @"objId": @(obj.objId),
                 @"width": @(obj.width),
                 @"height": @(obj.height) });
    }
  }];
}

RCT_EXPORT_METHOD(destroy:(nonnull NSNumber *)id)
{
  [_bridge.webglObjectLoader unloadWithObjId:[id intValue]];
}

@end
