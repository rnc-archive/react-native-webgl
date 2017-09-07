"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactNative = require("react-native");

var _webglTypes = require("./webglTypes");

var RNWebGLTextureManager = _reactNative.NativeModules.RNWebGLTextureManager;


var middlewares = [];

exports.default = {
  addMiddleware: function addMiddleware(middleware) {
    middlewares.push(middleware);
  },
  createWithContext: function createWithContext(gl, ctxId) {
    return middlewares.reduce(function (ext, middleware) {
      return middleware(ext);
    }, {
      loadTexture: function loadTexture(config) {
        return RNWebGLTextureManager.create(_extends({}, config, {
          ctxId: ctxId
        })).then(function (_ref) {
          var objId = _ref.objId,
              width = _ref.width,
              height = _ref.height;

          var texture = new _webglTypes.RNWebGLTexture(objId);
          return { texture: texture, width: width, height: height };
        });
      },
      unloadTexture: function unloadTexture(texture) {
        return RNWebGLTextureManager.destroy(texture.id);
      },
      endFrame: gl.__endFrame.bind(gl),
      readPixelsToTemporaryFile: gl.__readPixelsToTemporaryFile ? gl.__readPixelsToTemporaryFile.bind(gl) : function () {
        throw new Error("readPixelsToTemporaryFile is not yet implemented");
      }
    });
  }
};
//# sourceMappingURL=RNExtension.js.map