//@flow

// JavaScript WebGL types to wrap around native objects

export const RNWebGLRenderingContext = class WebGLRenderingContext {};

const idToObject = {};

export const RNWebGLObject = class WebGLObject {
  id: *;
  constructor(id: *) {
    if (idToObject[id]) {
      throw new Error(
        `WebGL object with underlying RNWebGLTextureId '${id}' already exists!`
      );
    }
    this.id = id; // Native GL object id
  }
  toString() {
    return `[WebGLObject ${this.id}]`;
  }

  static wrap = (type: Class<RNWebGLObject>, id: *): WebGLObject => {
    const found = idToObject[id];
    if (found) {
      return found;
    }
    return (idToObject[id] = new type(id));
  };
};

export const RNWebGLBuffer = class WebGLBuffer extends RNWebGLObject {};

export const RNWebGLFramebuffer = class WebGLFramebuffer extends RNWebGLObject {};

export const RNWebGLProgram = class WebGLProgram extends RNWebGLObject {};

export const RNWebGLRenderbuffer = class WebGLRenderbuffer extends RNWebGLObject {};

export const RNWebGLShader = class WebGLShader extends RNWebGLObject {};

export const RNWebGLTexture = class WebGLTexture extends RNWebGLObject {};

export const RNWebGLUniformLocation = class WebGLUniformLocation {
  id: *;
  constructor(id: *) {
    this.id = id; // Native GL object id
  }
};

export const RNWebGLActiveInfo = class WebGLActiveInfo {
  constructor(obj: *) {
    Object.assign(this, obj);
  }
};

export const RNWebGLShaderPrecisionFormat = class WebGLShaderPrecisionFormat {
  constructor(obj: *) {
    Object.assign(this, obj);
  }
};

// also leak them in global, like in a browser
global.WebGLRenderingContext = RNWebGLRenderingContext;
global.WebGLObject = RNWebGLObject;
global.WebGLBuffer = RNWebGLBuffer;
global.WebGLFramebuffer = RNWebGLFramebuffer;
global.WebGLProgram = RNWebGLProgram;
global.WebGLRenderbuffer = RNWebGLRenderbuffer;
global.WebGLShader = RNWebGLShader;
global.WebGLTexture = RNWebGLTexture;
global.WebGLUniformLocation = RNWebGLUniformLocation;
global.WebGLActiveInfo = RNWebGLActiveInfo;
global.WebGLShaderPrecisionFormat = RNWebGLShaderPrecisionFormat;
