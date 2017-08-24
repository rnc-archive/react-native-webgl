//@flow
import { NativeModules } from "react-native";
import { RNWebGLTexture } from "./webglTypes";
const { RNWebGLTextureManager } = NativeModules;

type RNWebGLRenderingContext = WebGLRenderingContext & {
  __endFrame: *,
  __readPixelsToTemporaryFile: *
};

type Config = Object;

type Extension = {
  // NB more methods can be extended with middlewares
  loadTexture: (
    config: Config
  ) => Promise<{ texture: RNWebGLTexture, width: number, height: number }>,
  unloadTexture: (texture: RNWebGLTexture) => void,
  endFrame: () => void, // IDEA add a requestFrame() to hide the need to call endFrame
  readPixelsToTemporaryFile: (
    x: number,
    y: number,
    w: number,
    h: number,
    options?: {
      format?: string,
      quality?: number
    }
  ) => Promise<string>
};

type Middleware = (extIn: Extension) => Extension;

const middlewares: Array<Middleware> = [];

export default {
  addMiddleware: (middleware: Middleware) => {
    middlewares.push(middleware);
  },
  createWithContext: (gl: RNWebGLRenderingContext, ctxId: number): Extension =>
    middlewares.reduce((ext, middleware) => middleware(ext), {
      loadTexture: config =>
        RNWebGLTextureManager.create({
          ...config,
          ctxId
        }).then(({ objId, width, height }) => {
          const texture = new RNWebGLTexture(objId);
          return { texture, width, height };
        }),
      unloadTexture: texture => RNWebGLTextureManager.destroy(texture.id),
      endFrame: gl.__endFrame.bind(gl),
      readPixelsToTemporaryFile: gl.__readPixelsToTemporaryFile
        ? gl.__readPixelsToTemporaryFile.bind(gl)
        : () => {
            throw new Error("readPixelsToTemporaryFile is not yet implemented");
          }
    })
};
