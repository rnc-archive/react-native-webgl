#import <React/RCTBridge.h>

#import "RNWebGLViewManager.h"

@interface RNWebGLView : UIView

- (instancetype)initWithManager:(RNWebGLViewManager *)mgr;

@property (nonatomic, copy) RCTDirectEventBlock onSurfaceCreate;

- (NSDictionary *)maybeStartARSession;
- (void)maybeStopARSession;
- (NSDictionary *)arMatricesForViewportSize:(CGSize)viewportSize zNear:(CGFloat)zNear zFar:(CGFloat)zFar;

// "protected"
@property (nonatomic, strong) EAGLContext *eaglCtx;
@property (nonatomic, assign) RNWebGLContextId exglCtxId;

@end
