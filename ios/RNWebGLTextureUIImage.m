#import <React/RCTConvert.h>
#import "RNWebGLTextureUIImage.h"
#import "GPUImage.h"

@implementation RNWebGLTextureUIImage

- (instancetype)initWithConfig:(NSDictionary *)config withImage:(UIImage *)image {
  GPUImagePicture *picture = [[GPUImagePicture alloc] initWithImage:image];
  [picture processImage];
  if ((self = [super initWithConfig:config withGPUImageOutput:picture withWidth:image.size.width withHeight:image.size.height])) {
  }
  return self;
}

@end
