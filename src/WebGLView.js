//@flow
import React from "react";
import PropTypes from "prop-types";
import {
  Platform,
  View,
  ViewPropTypes,
  requireNativeComponent
} from "react-native";
import RNExtension from "./RNExtension";
import wrapGLMethods from "./wrapGLMethods";

// Get the GL interface from an RNWebGLContextID and do JS-side setup
const getGl = (ctxId: number): ?WebGLRenderingContext => {
  if (!global.__RNWebGLContexts) {
    console.warn(
      "RNWebGL: Can only run on JavaScriptCore! Do you have 'Remote Debugging' enabled in your app's Developer Menu (https://facebook.github.io/react-native/docs/debugging.html)? RNWebGL is not supported while using Remote Debugging, you will need to disable it to use RNWebGL."
    );
    return null;
  }
  const gl = global.__RNWebGLContexts[ctxId];
  gl.__ctxId = ctxId;
  delete global.__RNWebGLContexts[ctxId];
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(gl, global.WebGLRenderingContext.prototype);
  } else {
    gl.__proto__ = global.WebGLRenderingContext.prototype;
  }
  wrapGLMethods(gl, RNExtension.createWithContext(gl, ctxId));

  gl.canvas = null;

  const viewport = gl.getParameter(gl.VIEWPORT);
  gl.drawingBufferWidth = viewport[2];
  gl.drawingBufferHeight = viewport[3];

  return gl;
};

export default class WebGLView extends React.Component {
  props: {
    onContextCreate: (gl: WebGLRenderingContext) => void,
    onContextFailure: (e: Error) => void,
    msaaSamples: number
  };
  static propTypes = {
    onContextCreate: PropTypes.func,
    onContextFailure: PropTypes.func,
    msaaSamples: PropTypes.number,
    ...ViewPropTypes
  };

  static defaultProps = {
    msaaSamples: 4
  };

  render() {
    const {
      onContextCreate, // eslint-disable-line no-unused-vars
      onContextFailure, // eslint-disable-line no-unused-vars
      msaaSamples,
      ...viewProps
    } = this.props;

    // NOTE: Removing `backgroundColor: "transparent"` causes a performance
    //       regression. Not sure why yet...
    return (
      <View {...viewProps}>
        <WebGLView.NativeView
          style={{ flex: 1, backgroundColor: "transparent" }}
          onSurfaceCreate={this.onSurfaceCreate}
          msaaSamples={Platform.OS === "ios" ? msaaSamples : undefined}
        />
      </View>
    );
  }

  onSurfaceCreate = ({
    nativeEvent: { ctxId }
  }: {
    nativeEvent: { ctxId: number }
  }) => {
    let gl, error;
    try {
      gl = getGl(ctxId);
      if (!gl) {
        error = new Error("RNWebGL context creation failed");
      }
    } catch (e) {
      error = e;
    }
    if (error) {
      if (this.props.onContextFailure) {
        this.props.onContextFailure(error);
      } else {
        throw error;
      }
    } else if (gl && this.props.onContextCreate) {
      this.props.onContextCreate(gl);
    }
  };

  static NativeView = requireNativeComponent("RNWebGLView", WebGLView, {
    nativeOnly: { onSurfaceCreate: true }
  });
}
