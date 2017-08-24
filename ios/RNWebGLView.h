#import <React/RCTBridge.h>

#import "RNWebGLViewManager.h"

@interface RNWebGLView : UIView

- (instancetype)initWithManager:(RNWebGLViewManager *)mgr;

@property (nonatomic, copy) RCTDirectEventBlock onSurfaceCreate;

@end
