"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// JavaScript WebGL types to wrap around native objects

var RNWebGLRenderingContext = exports.RNWebGLRenderingContext = function WebGLRenderingContext() {
  _classCallCheck(this, WebGLRenderingContext);
};

var idToObject = {};

var RNWebGLObject = exports.RNWebGLObject = (_temp = _class = function () {
  function WebGLObject(id) {
    _classCallCheck(this, WebGLObject);

    if (idToObject[id]) {
      throw new Error("WebGL object with underlying RNWebGLTextureId '" + id + "' already exists!");
    }
    this.id = id; // Native GL object id
  }

  _createClass(WebGLObject, [{
    key: "toString",
    value: function toString() {
      return "[WebGLObject " + this.id + "]";
    }
  }]);

  return WebGLObject;
}(), _class.wrap = function (type, id) {
  var found = idToObject[id];
  if (found) {
    return found;
  }
  return idToObject[id] = new type(id);
}, _temp);

var RNWebGLBuffer = exports.RNWebGLBuffer = function (_RNWebGLObject) {
  _inherits(WebGLBuffer, _RNWebGLObject);

  function WebGLBuffer() {
    _classCallCheck(this, WebGLBuffer);

    return _possibleConstructorReturn(this, (WebGLBuffer.__proto__ || Object.getPrototypeOf(WebGLBuffer)).apply(this, arguments));
  }

  return WebGLBuffer;
}(RNWebGLObject);

var RNWebGLFramebuffer = exports.RNWebGLFramebuffer = function (_RNWebGLObject2) {
  _inherits(WebGLFramebuffer, _RNWebGLObject2);

  function WebGLFramebuffer() {
    _classCallCheck(this, WebGLFramebuffer);

    return _possibleConstructorReturn(this, (WebGLFramebuffer.__proto__ || Object.getPrototypeOf(WebGLFramebuffer)).apply(this, arguments));
  }

  return WebGLFramebuffer;
}(RNWebGLObject);

var RNWebGLProgram = exports.RNWebGLProgram = function (_RNWebGLObject3) {
  _inherits(WebGLProgram, _RNWebGLObject3);

  function WebGLProgram() {
    _classCallCheck(this, WebGLProgram);

    return _possibleConstructorReturn(this, (WebGLProgram.__proto__ || Object.getPrototypeOf(WebGLProgram)).apply(this, arguments));
  }

  return WebGLProgram;
}(RNWebGLObject);

var RNWebGLRenderbuffer = exports.RNWebGLRenderbuffer = function (_RNWebGLObject4) {
  _inherits(WebGLRenderbuffer, _RNWebGLObject4);

  function WebGLRenderbuffer() {
    _classCallCheck(this, WebGLRenderbuffer);

    return _possibleConstructorReturn(this, (WebGLRenderbuffer.__proto__ || Object.getPrototypeOf(WebGLRenderbuffer)).apply(this, arguments));
  }

  return WebGLRenderbuffer;
}(RNWebGLObject);

var RNWebGLShader = exports.RNWebGLShader = function (_RNWebGLObject5) {
  _inherits(WebGLShader, _RNWebGLObject5);

  function WebGLShader() {
    _classCallCheck(this, WebGLShader);

    return _possibleConstructorReturn(this, (WebGLShader.__proto__ || Object.getPrototypeOf(WebGLShader)).apply(this, arguments));
  }

  return WebGLShader;
}(RNWebGLObject);

var RNWebGLTexture = exports.RNWebGLTexture = function (_RNWebGLObject6) {
  _inherits(WebGLTexture, _RNWebGLObject6);

  function WebGLTexture() {
    _classCallCheck(this, WebGLTexture);

    return _possibleConstructorReturn(this, (WebGLTexture.__proto__ || Object.getPrototypeOf(WebGLTexture)).apply(this, arguments));
  }

  return WebGLTexture;
}(RNWebGLObject);

var RNWebGLUniformLocation = exports.RNWebGLUniformLocation = function WebGLUniformLocation(id) {
  _classCallCheck(this, WebGLUniformLocation);

  this.id = id; // Native GL object id
};

var RNWebGLActiveInfo = exports.RNWebGLActiveInfo = function WebGLActiveInfo(obj) {
  _classCallCheck(this, WebGLActiveInfo);

  Object.assign(this, obj);
};

var RNWebGLShaderPrecisionFormat = exports.RNWebGLShaderPrecisionFormat = function WebGLShaderPrecisionFormat(obj) {
  _classCallCheck(this, WebGLShaderPrecisionFormat);

  Object.assign(this, obj);
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
//# sourceMappingURL=webglTypes.js.map