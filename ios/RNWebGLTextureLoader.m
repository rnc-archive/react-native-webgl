#import "RNWebGLTextureLoader.h"
#import "RNWebGLTexture.h"
#import <React/RCTLog.h>
#import <React/RCTUtils.h>


@implementation RNWebGLTextureLoader {
  NSArray<id<RNWebGLTextureConfigLoader>> *_loaders;
  NSMutableDictionary<NSNumber *, RNWebGLTexture *> *_objects;
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (instancetype)init
{
  if ((self = [super init])) {
    _objects = [NSMutableDictionary dictionary];
  }
  return self;
}

-(id<RNWebGLTextureConfigLoader>) objectLoaderForConfig:(NSDictionary *)config {
  if (!_loaders) {
    _loaders = [_bridge modulesConformingToProtocol:@protocol(RNWebGLTextureConfigLoader)];
  }
  for (id<RNWebGLTextureConfigLoader> loader in _loaders) {
    if ([loader canLoadConfig:config]) {
      return loader;
    }
  }
  return nil;
}

-(void)loadWithConfig:(NSDictionary *)config
  withCompletionBlock:(RNWebGLTextureCompletionBlock)callback {
  id<RNWebGLTextureConfigLoader> loader = [self objectLoaderForConfig:config];
  if (!loader) {
    if (RCT_DEBUG) RCTLogError(@"No suitable RNWebGLTextureLoader found for %@", config);
    callback([NSError errorWithDomain:@"RNWebGL" code:1 userInfo:@{ NSLocalizedDescriptionKey: @"No suitable RNWebGLTextureLoader found" }], nil);
  }
  else {
    __weak RNWebGLTextureLoader *weakSelf = self;
    [loader loadWithConfig:config withCompletionBlock:^(NSError *err, RNWebGLTexture *obj) {
      if (obj && weakSelf) {
        weakSelf.objects[@(obj.objId)] = obj;
      }
      callback(err, obj);
    }];
  }
}

-(void)loadWithConfigAndWaitAttached:(NSDictionary *)config
                 withCompletionBlock:(RNWebGLTextureCompletionBlock)callback {
  [self loadWithConfig:config withCompletionBlock:^(NSError *error, RNWebGLTexture *obj) {
    if ([obj isAttached]) {
      callback(error, obj);
    }
    else {
      [obj listenAttached:^{
        callback(error, obj);
      }];
    }
  }];
}

-(void)unloadWithObjId:(RNWebGLTextureId)objId {
  NSNumber *key = @(objId);
  RNWebGLTexture *t = _objects[key];
  if (t) {
    [t unload];
    [_objects removeObjectForKey:key];
  }
}

-(void)unloadWithCtxId:(RNWebGLContextId)ctxId {
  NSMutableArray *unloadedKeys = [NSMutableArray array];
  for (NSNumber *key in [_objects keyEnumerator]) {
    RNWebGLTexture *t = _objects[key];
    if (t.ctxId == ctxId) {
      [t unload];
      [unloadedKeys addObject:key];
    }
  }
  [_objects removeObjectsForKeys:unloadedKeys];
}

@end

@implementation RCTBridge (RNWebGLTextureLoader)

- (RNWebGLTextureLoader *)webglObjectLoader
{
  return [self moduleForClass:[RNWebGLTextureLoader class]];
}

@end
