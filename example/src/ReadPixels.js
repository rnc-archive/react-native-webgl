//@flow
import React from "react";
import { StyleSheet, View, Button, Image } from "react-native";
import { WebGLView } from "react-native-webgl";

export default class App extends React.Component {
  state = {
    imageSource: null
  };

  rngl: *;
  _raf: *;

  capture = () => {
    const { rngl } = this;
    if (rngl) {
      rngl.readPixelsToTemporaryFile(0, 0, 200, 200).then(uri => {
        this.setState({ imageSource: { uri } });
      });
    }
  };

  componentWillUnmount() {
    cancelAnimationFrame(this._raf);
  }

  onContextCreate = (gl: WebGLRenderingContext) => {
    const rngl = gl.getExtension("RN");
    this.rngl = rngl;
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
  uv = .5*(1.+p);
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
uniform float time;
#define M_PI ${Math.PI}

void main() {
  vec2 c = uv - .5;
  float shape = step(length(c), .5) * step(atan(c.y, c.x), M_PI*cos(time));
  gl_FragColor = vec4(uv, 0.5 * (1.0 + cos(2. * time)), shape);
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
    const timeLocation = gl.getUniformLocation(program, "time");
    let startTime;
    const loop = (time: number) => {
      if (!startTime) startTime = time;
      this._raf = requestAnimationFrame(loop);
      gl.uniform1f(timeLocation, (time - startTime) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.flush();
      rngl.endFrame();
    };
    this._raf = requestAnimationFrame(loop);
  };

  render() {
    const { imageSource } = this.state;
    return (
      <View style={styles.container}>
        <WebGLView
          style={styles.webglView}
          onContextCreate={this.onContextCreate}
        />
        <Button title="CAPTURE" color="#0099FF" onPress={this.capture} />
        <Image source={imageSource} style={styles.image} />
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
    width: 200,
    height: 200
  },
  image: {
    width: 200,
    height: 200
  }
});
