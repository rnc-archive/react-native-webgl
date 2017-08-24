//@flow
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import RNExtension from "./RNExtension";

RNExtension.addMiddleware(ext => ({
  ...ext,
  loadTexture: arg => {
    if (typeof arg.image === "number") {
      // Resolve RN local asset require()
      arg = { ...arg, image: resolveAssetSource(arg.image) };
    }
    return ext.loadTexture(arg);
  }
}));
