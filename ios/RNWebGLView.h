#import <React/RCTBridge.h>

#import "RNWebGLViewManager.h"

@interface RNWebGLView : UIView

- (instancetype)initWithManager:(RNWebGLViewManager *)mgr;

@property (nonatomic, copy) RCTDirectEventBlock onSurfaceCreate;
@property (nonatomic, copy) RCTBubblingEventBlock onFrame;

@end
