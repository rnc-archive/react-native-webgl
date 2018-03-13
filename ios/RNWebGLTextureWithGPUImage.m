#import <React/RCTConvert.h>
#import "RNWebGLTextureWithGPUImage.h"
#import "GPUImage.h"

@implementation RNWebGLTextureWithGPUImage {
  GPUImageFilter *filter;
  GPUImageTextureOutput *output;
}

- (instancetype)initWithConfig:(NSDictionary *)config
            withGPUImageOutput:(GPUImageOutput *)source
                     withWidth:(int)width
                    withHeight:(int)height {
  if ((self = [super initWithConfig:config withWidth:width withHeight:height])) {
    output = [[GPUImageTextureOutput alloc] init];
    output.delegate = self;
    [source useNextFrameForImageCapture];
    [source addTarget:output];
  }
  return self;
}

- (void)newFrameReadyFromTextureOutput:(GPUImageTextureOutput *)callbackTextureOutput
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [self attachTexture:callbackTextureOutput.texture];
    @try {
      [callbackTextureOutput doneWithTexture];
    } @catch (NSException *exception) {
    }
  });
}

@end
