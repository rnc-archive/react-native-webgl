#import "RNWebGLViewManager.h"
#import "RNWebGLView.h"
#import "RNWebGL.h"

@implementation RNWebGLViewManager

RCT_EXPORT_MODULE(RNWebGLViewManager);

- (UIView *)view
{
  return [[RNWebGLView alloc] initWithManager:self];
}

RCT_EXPORT_VIEW_PROPERTY(onSurfaceCreate, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(msaaSamples, NSNumber);

RCT_EXPORT_METHOD(readPixelsToTemporaryFile:(nonnull NSNumber *)ctxId
                  withX:(nonnull NSNumber *)xNumber
                  withY:(nonnull NSNumber *)yNumber
                  withW:(nonnull NSNumber *)wNumber
                  withH:(nonnull NSNumber *)hNumber
                  withOptions:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  int x = [xNumber intValue];
  int y = [yNumber intValue];
  int w = [wNumber intValue];
  int h = [hNumber intValue];
  NSString *format = [RCTConvert NSString:options[@"format"]];
  void *pixels = malloc(4 * w * h);
  RNWebGLContextReadPixelsRGBA([ctxId intValue], x, y, w, h, pixels, ^{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
      int bitsPerComponent = 8;
      int bytesPerRow = w * 4;
      CGContextRef gtx = CGBitmapContextCreate(pixels, w, h, bitsPerComponent, bytesPerRow, CGColorSpaceCreateDeviceRGB(), kCGImageAlphaPremultipliedLast);
      CGImageRef toCGImage = CGBitmapContextCreateImage(gtx);
      UIImage *image = [[UIImage alloc] initWithCGImage:toCGImage];
      NSData *data;
      if ([format isEqualToString:@"jpg"]) {
        CGFloat quality = [RCTConvert CGFloat:options[@"quality"]];
        data = UIImageJPEGRepresentation(image, quality);
      }
      else {
        data = UIImagePNGRepresentation(image);
      }
      NSError *error;
      NSString *path = RCTTempFilePath(format, &error);
      if (!error) {
        if ([data writeToFile:path options:(NSDataWritingOptions)0 error:&error]) {
          resolve(path);
        }
      }
      else {
        reject(error.domain, error.description, error);
      }
      free(pixels);
    });
  });
}


@end
