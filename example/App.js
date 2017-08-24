//@flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebGLView } from "react-native-webgl";

export default class App extends React.Component {
  onContextCreate1 = (gl: WebGLRenderingContext) => {
    const rngl = gl.getExtension("RN");
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 4, 4, -1]),
      gl.STATIC_DRAW
    );
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(
      vertexShader,
      `\
attribute vec2 p;
varying vec2 uv;
void main() {
  gl_Position = vec4(p,0.0,1.0);
  uv = 0.5 * (p+1.0);
}`
    );
    gl.compileShader(vertexShader);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(
      fragmentShader,
      `\
precision highp float;
varying vec2 uv;
uniform sampler2D t;
void main() {
  gl_FragColor = mix(texture2D(t, uv),  vec4(1.0), min(pow(2.*uv.x-1.,6.)+pow(2.*uv.y-1.,6.)+ 0.1 * step(fract(20.*uv.y+cos(16.*uv.x)), 0.2), 1.0));
}`
    );
    gl.compileShader(fragmentShader);
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    var p = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(p);
    gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);

    const tLocation = gl.getUniformLocation(program, "t");

    rngl
      .loadTexture({ image: "https://i.imgur.com/wxqlQkh.jpg", yflip: true })
      .then(({ texture }) => {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(tLocation, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        gl.flush();
        rngl.endFrame();
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <WebGLView
          style={styles.webglView}
          onContextCreate={this.onContextCreate1}
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
    height: 200
  }
});
