"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require("react-native");

var _RNExtension = require("./RNExtension");

var _RNExtension2 = _interopRequireDefault(_RNExtension);

var _wrapGLMethods = require("./wrapGLMethods");

var _wrapGLMethods2 = _interopRequireDefault(_wrapGLMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Get the GL interface from an RNWebGLContextID and do JS-side setup
var getGl = function getGl(ctxId) {
  if (!global.__RNWebGLContexts) {
    console.warn("RNWebGL: Can only run on JavaScriptCore! Do you have 'Remote Debugging' enabled in your app's Developer Menu (https://facebook.github.io/react-native/docs/debugging.html)? RNWebGL is not supported while using Remote Debugging, you will need to disable it to use RNWebGL.");
    return null;
  }
  var gl = global.__RNWebGLContexts[ctxId];
  gl.__ctxId = ctxId;
  delete global.__RNWebGLContexts[ctxId];
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(gl, global.WebGLRenderingContext.prototype);
  } else {
    gl.__proto__ = global.WebGLRenderingContext.prototype;
  }
  (0, _wrapGLMethods2.default)(gl, _RNExtension2.default.createWithContext(gl, ctxId));

  gl.canvas = null;

  var viewport = gl.getParameter(gl.VIEWPORT);
  gl.drawingBufferWidth = viewport[2];
  gl.drawingBufferHeight = viewport[3];

  return gl;
};

var WebGLView = function (_React$Component) {
  _inherits(WebGLView, _React$Component);

  function WebGLView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WebGLView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WebGLView.__proto__ || Object.getPrototypeOf(WebGLView)).call.apply(_ref, [this].concat(args))), _this), _this.onSurfaceCreate = function (_ref2) {
      var ctxId = _ref2.nativeEvent.ctxId;

      var gl = void 0,
          error = void 0;
      try {
        gl = getGl(ctxId);
        if (!gl) {
          error = new Error("RNWebGL context creation failed");
        }
      } catch (e) {
        error = e;
      }
      if (error) {
        if (_this.props.onContextFailure) {
          _this.props.onContextFailure(error);
        } else {
          throw error;
        }
      } else if (gl && _this.props.onContextCreate) {
        _this.props.onContextCreate(gl);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WebGLView, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          onContextCreate = _props.onContextCreate,
          onContextFailure = _props.onContextFailure,
          msaaSamples = _props.msaaSamples,
          viewProps = _objectWithoutProperties(_props, ["onContextCreate", "onContextFailure", "msaaSamples"]);

      // NOTE: Removing `backgroundColor: "transparent"` causes a performance
      //       regression. Not sure why yet...


      return _react2.default.createElement(
        _reactNative.View,
        viewProps,
        _react2.default.createElement(WebGLView.NativeView, {
          style: { flex: 1, backgroundColor: "transparent" },
          onSurfaceCreate: this.onSurfaceCreate,
          msaaSamples: _reactNative.Platform.OS === "ios" ? msaaSamples : undefined
        })
      );
    }
  }]);

  return WebGLView;
}(_react2.default.Component);

WebGLView.propTypes = _extends({
  onContextCreate: _propTypes2.default.func,
  onContextFailure: _propTypes2.default.func,
  msaaSamples: _propTypes2.default.number
}, _reactNative.ViewPropTypes);
WebGLView.defaultProps = {
  msaaSamples: 4
};
WebGLView.NativeView = (0, _reactNative.requireNativeComponent)("RNWebGLView", WebGLView, {
  nativeOnly: { onSurfaceCreate: true }
});
exports.default = WebGLView;
//# sourceMappingURL=WebGLView.js.map