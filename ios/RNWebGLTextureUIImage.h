#import <UIKit/UIKit.h>
#import "RNWebGLTextureWithGPUImage.h"
#import "GPUImage.h"

@interface RNWebGLTextureUIImage: RNWebGLTextureWithGPUImage
- (instancetype)initWithConfig:(NSDictionary *)config withImage:(UIImage *)image;
@end
