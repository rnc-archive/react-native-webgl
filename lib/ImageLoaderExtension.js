"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");

var _resolveAssetSource2 = _interopRequireDefault(_resolveAssetSource);

var _RNExtension = require("./RNExtension");

var _RNExtension2 = _interopRequireDefault(_RNExtension);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_RNExtension2.default.addMiddleware(function (ext) {
  return _extends({}, ext, {
    loadTexture: function loadTexture(arg) {
      if (typeof arg.image === "number") {
        // Resolve RN local asset require()
        arg = _extends({}, arg, { image: (0, _resolveAssetSource2.default)(arg.image) });
      }
      return ext.loadTexture(arg);
    }
  });
});
//# sourceMappingURL=ImageLoaderExtension.js.map