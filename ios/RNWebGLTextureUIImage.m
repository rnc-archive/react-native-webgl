#import <React/RCTConvert.h>
#import "RNWebGLTextureUIImage.h"
#import "GPUImage.h"

@implementation RNWebGLTextureUIImage

- (instancetype)initWithConfig:(NSDictionary *)config withImage:(UIImage *)image {
  
  bool yflip = [RCTConvert BOOL:config[@"yflip"]];
  
  if (yflip)
  {
    image = [RNWebGLTextureUIImage flipImageVertically: image];
  }
  
  GPUImagePicture *picture = [[GPUImagePicture alloc] initWithImage:image];
  [picture processImage];
  if ((self = [super initWithConfig:config withGPUImageOutput:picture withWidth:image.size.width withHeight:image.size.height])) {
  }
  return self;
}

+ (UIImage *) flipImageVertically:(UIImage *)image {
  
  CGSize size = image.size;
  UIGraphicsBeginImageContextWithOptions(size, NO, [UIScreen mainScreen].scale);
  CGContextRef context = UIGraphicsGetCurrentContext();
  CGAffineTransform flipVertical = CGAffineTransformMake(1, 0, 0, -1, 0, size.height);
  CGContextConcatCTM(context, flipVertical);
  [image drawInRect: CGRectMake(0, 0, size.width, size.height)];
  UIImage *flipedImage = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  
  return flipedImage;
}

@end


