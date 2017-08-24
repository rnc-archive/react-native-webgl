#import <React/RCTConvert.h>
#import <React/RCTLog.h>
#import <React/RCTImageSource.h>
#import <React/RCTBridge.h>
#import <React/RCTImageLoader.h>
#import <React/RCTUtils.h>
#import "RNWebGLTextureRCTImageLoader.h"
#import "RNWebGLTextureUIImage.h"

@implementation RNWebGLTextureRCTImageLoader

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (BOOL)canLoadConfig:(NSDictionary *)config {
  return [config objectForKey:@"image"] != nil;
}

- (void)loadWithConfig:(NSDictionary *)config
                           withCompletionBlock:(RNWebGLTextureCompletionBlock)callback {
  RCTImageSource *source = [RCTConvert RCTImageSource:[config objectForKey:@"image"]];
  [_bridge.imageLoader loadImageWithURLRequest:source.request
                                          size:CGSizeZero
                                         scale:0
                                       clipped:YES
                                    resizeMode:RCTResizeModeStretch
                                 progressBlock:nil
                              partialLoadBlock:nil
                               completionBlock:^(NSError *error, UIImage *loadedImage) {
                                 void (^setImageBlock)(UIImage *) = ^(UIImage *image) {
                                   RNWebGLTextureUIImage *obj = [[RNWebGLTextureUIImage alloc] initWithConfig:config withImage:image];
                                   callback(nil, obj);
                                 };
                                 if (error) {
                                   callback(error, nil);
                                 } else {
                                   if ([NSThread isMainThread]) {
                                     setImageBlock(loadedImage);
                                   } else {
                                     RCTExecuteOnMainQueue(^{
                                       setImageBlock(loadedImage);
                                     });
                                   }
                                 }
                               }];
}

@end
