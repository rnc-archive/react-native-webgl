#import <UIKit/UIKit.h>
#import "RNWebGLTexture.h"
#import "GPUImage.h"

@interface RNWebGLTextureWithGPUImage: RNWebGLTexture <GPUImageTextureOutputDelegate>
- (instancetype)initWithConfig:(NSDictionary *)config
            withGPUImageOutput:(GPUImageOutput *)source
                     withWidth:(int)width
                    withHeight:(int)height;
@end
