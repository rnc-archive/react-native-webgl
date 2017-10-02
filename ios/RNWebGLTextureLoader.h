#import <React/RCTBridge.h>
#import "RNWebGLTexture.h"

typedef void (^RNWebGLTextureCompletionBlock)(NSError *error, RNWebGLTexture *obj);

@protocol RNWebGLTextureConfigLoader <RCTBridgeModule>
-(BOOL)canLoadConfig:(NSDictionary *)config;
-(void)loadWithConfig:(NSDictionary *)config
  withCompletionBlock:(RNWebGLTextureCompletionBlock)callback;
@end

@interface RNWebGLTextureLoader: NSObject <RCTBridgeModule>

@property (nonatomic, strong) NSMutableDictionary<NSNumber *, RNWebGLTexture *> *objects;

-(id<RNWebGLTextureConfigLoader>) objectLoaderForConfig:(NSDictionary *)config;

-(void)loadWithConfig:(NSDictionary *)config
              withCompletionBlock:(RNWebGLTextureCompletionBlock)callback;

-(void)loadWithConfigAndWaitAttached:(NSDictionary *)config
                 withCompletionBlock:(RNWebGLTextureCompletionBlock)callback;

-(void)unloadWithObjId:(RNWebGLTextureId)id;

-(void)unloadWithCtxId:(RNWebGLContextId)id;

@end


@interface RCTBridge (RNWebGLTextureLoader)
@property (nonatomic, readonly) RNWebGLTextureLoader *webglObjectLoader;
@end
