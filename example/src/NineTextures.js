//@flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebGLView } from "react-native-webgl";

const sources = "bCH5IqY,myrmObg,vAysZ8m,fnNgaNK,aPOdTmT,sOHQVTW,kEuRMQp,MDL7KbV,R5gL6bu"
  .split(",")
  .map(id => `https://i.imgur.com/${id}.jpg`);

export default class App extends React.Component {
  onContextCreate = (gl: WebGLRenderingContext) => {
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
uniform sampler2D t1,t2,t3,t4,t5,t6,t7,t8,t9;
vec4 colorLookup (in sampler2D s, vec2 p) {
  return step(0., p.x) *
         step(p.x, 1.) *
         step(0., p.y) *
         step(p.y, 1.) *
         texture2D(s, p);
}
void main() {
  gl_FragColor =
    colorLookup(t1, uv * 3.0 - vec2(0., 0.)) +
    colorLookup(t2, uv * 3.0 - vec2(1., 0.)) +
    colorLookup(t3, uv * 3.0 - vec2(2., 0.)) +
    colorLookup(t4, uv * 3.0 - vec2(0., 1.)) +
    colorLookup(t5, uv * 3.0 - vec2(1., 1.)) +
    colorLookup(t6, uv * 3.0 - vec2(2., 1.)) +
    colorLookup(t7, uv * 3.0 - vec2(0., 2.)) +
    colorLookup(t8, uv * 3.0 - vec2(1., 2.)) +
    colorLookup(t9, uv * 3.0 - vec2(2., 2.));
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
    Promise.all(
      sources.map((image, i) => {
        const loc = gl.getUniformLocation(program, "t" + (i + 1));
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.uniform1i(loc, i);
        return rngl.loadTexture({ image, yflip: true }).then(({ texture }) => {
          gl.activeTexture(gl.TEXTURE0 + i);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.uniform1i(loc, i);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
          gl.flush();
          rngl.endFrame();
          return texture;
        });
      })
    );
    // if needed this is the code to render only once when all images loaded
    /*
    .then(textures => {

      textures.forEach((texture, i) => {
        const loc = gl.getUniformLocation(program, "t" + (i + 1));
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(loc, i);
      });
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.flush();
      rngl.endFrame();
    });
    */
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
    height: 200
  }
});
