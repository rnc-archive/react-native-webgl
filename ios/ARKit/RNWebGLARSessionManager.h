#import "RNWebGLView.h"

@interface RNWebGLARSessionManager : NSObject

- (NSDictionary *)startARSessionWithGLView:(RNWebGLView *)glView;
- (void)stopARSession;
- (void)updateARCamTexture;
- (NSDictionary *)arMatricesForViewportSize:(CGSize)viewportSize zNear:(CGFloat)zNear zFar:(CGFloat)zFar;

@end
