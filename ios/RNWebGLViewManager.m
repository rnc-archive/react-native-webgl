#import "RNWebGLViewManager.h"
#import "RNWebGLView.h"

@implementation RNWebGLViewManager

RCT_EXPORT_MODULE(RNWebGLViewManager);

- (UIView *)view
{
  return [[RNWebGLView alloc] initWithManager:self];
}

RCT_EXPORT_VIEW_PROPERTY(onSurfaceCreate, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(msaaSamples, NSNumber);

@end
