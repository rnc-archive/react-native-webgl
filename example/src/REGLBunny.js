//@flow
import React from "react";
import { StyleSheet, View } from "react-native";
import { WebGLView } from "react-native-webgl";
import createREGL from "regl";
import normals from "angle-normals";
import mat4 from "gl-mat4";
import bunny from "bunny";

export default class App extends React.Component {
  frame: *;
  componentWillUnmount() {
    const { frame } = this;
    if (frame) {
      frame.cancel();
    }
  }
  onContextCreate = (gl: WebGLRenderingContext) => {
    const regl = createREGL(gl);
    const rngl = gl.getExtension("RN");

    // Source: https://github.com/regl-project/regl/blob/gh-pages/example/lighting.js

    const drawBunny = regl({
      vert: `
  precision mediump float;
  attribute vec3 position, normal;
  uniform mat4 view, projection;
  varying vec3 fragNormal, fragPosition;
  void main() {
    fragNormal = normal;
    fragPosition = position;
    gl_Position = projection * view * vec4(position, 1);
  }`,

      frag: `
  precision mediump float;
  struct Light {
    vec3 color;
    vec3 position;
  };
  uniform Light lights[4];
  varying vec3 fragNormal, fragPosition;
  void main() {
    vec3 normal = normalize(fragNormal);
    vec3 light = vec3(0, 0, 0);
    for (int i = 0; i < 4; ++i) {
      vec3 lightDir = normalize(lights[i].position - fragPosition);
      float diffuse = max(0.0, dot(lightDir, normal));
      light += diffuse * lights[i].color;
    }
    gl_FragColor = vec4(light, 1);
  }`,

      attributes: {
        position: bunny.positions,
        normal: normals(bunny.cells, bunny.positions)
      },

      elements: bunny.cells,

      uniforms: {
        view: ({ tick }) => {
          const t = 0.01 * tick;
          return mat4.lookAt(
            [],
            [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
            [0, 2.5, 0],
            [0, 1, 0]
          );
        },
        projection: ({ viewportWidth, viewportHeight }) =>
          mat4.perspective(
            [],
            Math.PI / 4,
            viewportWidth / viewportHeight,
            0.01,
            1000
          ),
        "lights[0].color": [1, 0, 0],
        "lights[1].color": [0, 1, 0],
        "lights[2].color": [0, 0, 1],
        "lights[3].color": [1, 1, 0],
        "lights[0].position": ({ tick }) => {
          const t = 0.1 * tick;
          return [
            10 * Math.cos(0.09 * t),
            10 * Math.sin(0.09 * (2 * t)),
            10 * Math.cos(0.09 * (3 * t))
          ];
        },
        "lights[1].position": ({ tick }) => {
          const t = 0.1 * tick;
          return [
            10 * Math.cos(0.05 * (5 * t + 1)),
            10 * Math.sin(0.05 * (4 * t)),
            10 * Math.cos(0.05 * (0.1 * t))
          ];
        },
        "lights[2].position": ({ tick }) => {
          const t = 0.1 * tick;
          return [
            10 * Math.cos(0.05 * (9 * t)),
            10 * Math.sin(0.05 * (0.25 * t)),
            10 * Math.cos(0.05 * (4 * t))
          ];
        },
        "lights[3].position": ({ tick }) => {
          const t = 0.1 * tick;
          return [
            10 * Math.cos(0.1 * (0.3 * t)),
            10 * Math.sin(0.1 * (2.1 * t)),
            10 * Math.cos(0.1 * (1.3 * t))
          ];
        }
      }
    });

    this.frame = regl.frame(() => {
      regl.clear({
        depth: 1,
        color: [0, 0, 0, 1]
      });
      drawBunny();
      gl.flush();
      rngl.endFrame();
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <WebGLView
          style={styles.webglView}
          onContextCreate={this.onContextCreate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  webglView: {
    width: 300,
    height: 300
  }
});
