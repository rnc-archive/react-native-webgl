"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactNative = require("react-native");

var _webglTypes = require("./webglTypes");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Many functions need wrapping/unwrapping of arguments and return value. We
// handle each case specifically so we can write the tightest code for
// better performance.
exports.default = function (gl, extension) {
  var _getParameterTypes;

  var wrap = function wrap(methodNames, wrapper) {
    return (Array.isArray(methodNames) ? methodNames : [methodNames]).forEach(function (methodName) {
      return gl[methodName] = wrapper(gl[methodName]);
    });
  };

  // We can be slow in `gl.getParameter(...)` since it's a blocking call anyways
  var getParameterTypes = (_getParameterTypes = {}, _defineProperty(_getParameterTypes, gl.ARRAY_BUFFER_BINDING, WebGLBuffer), _defineProperty(_getParameterTypes, gl.ELEMENT_ARRAY_BUFFER_BINDING, WebGLBuffer), _defineProperty(_getParameterTypes, gl.CURRENT_PROGRAM, WebGLProgram), _defineProperty(_getParameterTypes, gl.FRAMEBUFFER_BINDING, WebGLFramebuffer), _defineProperty(_getParameterTypes, gl.RENDERBUFFER_BINDING, WebGLRenderbuffer), _defineProperty(_getParameterTypes, gl.TEXTURE_BINDING_2D, WebGLTexture), _defineProperty(_getParameterTypes, gl.TEXTURE_BINDING_CUBE_MAP, WebGLTexture), _getParameterTypes);
  wrap("getParameter", function (orig) {
    return function (pname) {
      var ret = orig.call(gl, pname);
      if (pname === gl.VERSION) {
        // Wrap native version name
        ret = "WebGL 1.0 (react-native-webgl," + _reactNative.Platform.OS + ") (" + ret + ")";
      }
      var type = getParameterTypes[pname];
      return type ? _webglTypes.RNWebGLObject.wrap(type, ret) : ret;
    };
  });

  // Buffers
  wrap("bindBuffer", function (orig) {
    return function (target, buffer) {
      return orig.call(gl, target, buffer && buffer.id);
    };
  });
  wrap("createBuffer", function (orig) {
    return function () {
      return _webglTypes.RNWebGLObject.wrap(_webglTypes.RNWebGLBuffer, orig.call(gl));
    };
  });
  wrap("deleteBuffer", function (orig) {
    return function (buffer) {
      return orig.call(gl, buffer && buffer.id);
    };
  });
  wrap("isBuffer", function (orig) {
    return function (buffer) {
      return buffer instanceof WebGLBuffer && orig.call(gl, buffer.id);
    };
  });

  // Framebuffers
  wrap("bindFramebuffer", function (orig) {
    return function (target, framebuffer) {
      return orig.call(gl, target, framebuffer && framebuffer.id);
    };
  });
  wrap("createFramebuffer", function (orig) {
    return function () {
      return _webglTypes.RNWebGLObject.wrap(_webglTypes.RNWebGLFramebuffer, orig.call(gl));
    };
  });
  wrap("deleteFramebuffer", function (orig) {
    return function (framebuffer) {
      return orig.call(gl, framebuffer && framebuffer.id);
    };
  });
  wrap("framebufferRenderbuffer", function (orig) {
    return function (target, attachment, rbtarget, rb) {
      return orig.call(gl, target, attachment, rbtarget, rb && rb.id);
    };
  });
  wrap("framebufferTexture2D", function (orig) {
    return function (target, attachment, textarget, tex, level) {
      return orig.call(gl, target, attachment, textarget, tex && tex.id, level);
    };
  });
  wrap("isFramebuffer", function (orig) {
    return function (framebuffer) {
      return framebuffer instanceof WebGLFramebuffer && orig.call(gl, framebuffer.id);
    };
  });

  // Renderbuffers
  wrap("bindRenderbuffer", function (orig) {
    return function (target, renderbuffer) {
      return orig.call(gl, target, renderbuffer && renderbuffer.id);
    };
  });
  wrap("createRenderbuffer", function (orig) {
    return function () {
      return _webglTypes.RNWebGLObject.wrap(_webglTypes.RNWebGLRenderbuffer, orig.call(gl));
    };
  });
  wrap("deleteRenderbuffer", function (orig) {
    return function (renderbuffer) {
      return orig.call(gl, renderbuffer && renderbuffer.id);
    };
  });
  wrap("isRenderbuffer", function (orig) {
    return function (renderbuffer) {
      return renderbuffer instanceof WebGLRenderbuffer && orig.call(gl, renderbuffer.id);
    };
  });

  // Textures
  wrap("bindTexture", function (orig) {
    return function (target, texture) {
      return orig.call(gl, target, texture && texture.id);
    };
  });
  wrap("createTexture", function (orig) {
    return function () {
      return _webglTypes.RNWebGLObject.wrap(_webglTypes.RNWebGLTexture, orig.call(gl));
    };
  });
  wrap("deleteTexture", function (orig) {
    return function (texture) {
      return orig.call(gl, texture && texture.id);
    };
  });
  wrap("isTexture", function (orig) {
    return function (texture) {
      return texture instanceof WebGLTexture && orig.call(gl, texture.id);
    };
  });

  // Programs and shaders
  wrap("attachShader", function (orig) {
    return function (program, shader) {
      return orig.call(gl, program && program.id, shader && shader.id);
    };
  });
  wrap("bindAttribLocation", function (orig) {
    return function (program, index, name) {
      return orig.call(gl, program && program.id, index, name);
    };
  });
  wrap("compileShader", function (orig) {
    return function (shader) {
      return orig.call(gl, shader && shader.id);
    };
  });
  wrap("createProgram", function (orig) {
    return function () {
      return _webglTypes.RNWebGLObject.wrap(_webglTypes.RNWebGLProgram, orig.call(gl));
    };
  });
  wrap("createShader", function (orig) {
    return function (type) {
      return _webglTypes.RNWebGLObject.wrap(_webglTypes.RNWebGLShader, orig.call(gl, type));
    };
  });
  wrap("deleteProgram", function (orig) {
    return function (program) {
      return orig.call(gl, program && program.id);
    };
  });
  wrap("deleteShader", function (orig) {
    return function (shader) {
      return orig.call(gl, shader && shader.id);
    };
  });
  wrap("detachShader", function (orig) {
    return function (program, shader) {
      return orig.call(gl, program && program.id, shader && shader.id);
    };
  });
  wrap("getAttachedShaders", function (orig) {
    return function (program) {
      return orig.call(gl, program && program.id).map(function (id) {
        return _webglTypes.RNWebGLObject.wrap(_webglTypes.RNWebGLShader, id);
      });
    };
  });
  wrap("getProgramParameter", function (orig) {
    return function (program, pname) {
      return orig.call(gl, program && program.id, pname);
    };
  });
  wrap("getProgramInfoLog", function (orig) {
    return function (program) {
      return orig.call(gl, program && program.id);
    };
  });
  wrap("getShaderParameter", function (orig) {
    return function (shader, pname) {
      return orig.call(gl, shader && shader.id, pname);
    };
  });
  wrap("getShaderPrecisionFormat", function (orig) {
    return function (shadertype, precisiontype) {
      return (
        // $FlowFixMe
        new WebGLShaderPrecisionFormat(orig.call(gl, shadertype, precisiontype))
      );
    };
  });
  wrap("getShaderInfoLog", function (orig) {
    return function (shader) {
      return orig.call(gl, shader && shader.id);
    };
  });
  wrap("getShaderSource", function (orig) {
    return function (shader) {
      return orig.call(gl, shader && shader.id);
    };
  });
  wrap("linkProgram", function (orig) {
    return function (program) {
      return orig.call(gl, program && program.id);
    };
  });
  wrap("shaderSource", function (orig) {
    return function (shader, source) {
      return orig.call(gl, shader && shader.id, source);
    };
  });
  wrap("useProgram", function (orig) {
    return function (program) {
      return orig.call(gl, program && program.id);
    };
  });
  wrap("validateProgram", function (orig) {
    return function (program) {
      return orig.call(gl, program && program.id);
    };
  });
  wrap("isShader", function (orig) {
    return function (shader) {
      return shader instanceof WebGLShader && orig.call(gl, shader.id);
    };
  });
  wrap("isProgram", function (orig) {
    return function (program) {
      return program instanceof WebGLProgram && orig.call(gl, program.id);
    };
  });

  wrap("getExtension", function (orig) {
    return function (id) {
      if (id === "RN") return extension;
      return orig.call(gl, id);
    };
  });

  // Uniforms and attributes
  wrap("getActiveAttrib", function (orig) {
    return function (program, index) {
      return (
        // $FlowFixMe
        new WebGLActiveInfo(orig.call(gl, program && program.id, index))
      );
    };
  });
  wrap("getActiveUniform", function (orig) {
    return function (program, index) {
      return (
        // $FlowFixMe
        new WebGLActiveInfo(orig.call(gl, program && program.id, index))
      );
    };
  });
  wrap("getAttribLocation", function (orig) {
    return function (program, name) {
      return orig.call(gl, program && program.id, name);
    };
  });
  wrap("getUniform", function (orig) {
    return function (program, location) {
      return orig.call(gl, program && program.id, location && location.id);
    };
  });
  wrap("getUniformLocation", function (orig) {
    return function (program, name) {
      return (
        // $FlowFixMe
        new WebGLUniformLocation(orig.call(gl, program && program.id, name))
      );
    };
  });
  wrap(["uniform1f", "uniform1i"], function (orig) {
    return function (loc, x) {
      return orig.call(gl, loc && loc.id, x);
    };
  });
  wrap(["uniform2f", "uniform2i"], function (orig) {
    return function (loc, x, y) {
      return orig.call(gl, loc && loc.id, x, y);
    };
  });
  wrap(["uniform3f", "uniform3i"], function (orig) {
    return function (loc, x, y, z) {
      return orig.call(gl, loc && loc.id, x, y, z);
    };
  });
  wrap(["uniform4f", "uniform4i"], function (orig) {
    return function (loc, x, y, z, w) {
      return orig.call(gl, loc && loc.id, x, y, z, w);
    };
  });
  wrap(["uniform1fv", "uniform2fv", "uniform3fv", "uniform4fv"], function (orig) {
    return function (loc, val) {
      return orig.call(gl, loc && loc.id, new Float32Array(val));
    };
  });
  wrap(["uniform1iv", "uniform2iv", "uniform3iv", "uniform4iv"], function (orig) {
    return function (loc, val) {
      return orig.call(gl, loc && loc.id, new Int32Array(val));
    };
  });
  wrap(["uniformMatrix2fv", "uniformMatrix3fv", "uniformMatrix4fv"], function (orig) {
    return function (loc, transpose, val) {
      return orig.call(gl, loc && loc.id, transpose, new Float32Array(val));
    };
  });
  wrap(["vertexAttrib1fv", "vertexAttrib2fv", "vertexAttrib3fv", "vertexAttrib4fv"], function (orig) {
    return function (index, val) {
      return orig.call(gl, index, new Float32Array(val));
    };
  });
};
//# sourceMappingURL=wrapGLMethods.js.map