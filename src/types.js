//@flow

/**
 * Object descriptor with extensible format supported
 * Built-in formats:
 * { image: ImageSource }  (ImageSource as in RN Image#source prop)
 *
 * Common fields:
 * - yflip (boolean) : flip vertically if true
 */
export type Config = Object;

export type RNWebGLTexture = WebGLTexture & { id: number };

export type RNWebGLExtension = {
  loadTexture: (
    config: Config
  ) => Promise<{ texture: RNWebGLTexture, width: number, height: number }>,
  unloadTexture: (texture: RNWebGLTexture) => void,
  endFrame: () => void
  // IDEA requestFrame: () to hide the need to call endFrame
  // TODO an extended readPixels to save to tmp file instead
};
