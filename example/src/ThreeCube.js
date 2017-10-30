//@flow
import React from "react";
import { StyleSheet, View } from "react-native";
import { WebGLView } from "react-native-webgl";
import THREE from "./three";

export default class App extends React.Component {
  requestId: *;
  rotating = true;
  renderer;
  scene;
  camera;
  cube;

  componentWillUnmount() {
    cancelAnimationFrame(this.requestId);
  }

  onContextCreate = (gl: WebGLRenderingContext) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    this.renderer = new THREE.WebGLRenderer({
      canvas: {
        width,
        height,
        style: {},
        addEventListener: () => {},
        removeEventListener: () => {},
        clientHeight: height
      },
      context: gl
    });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 1);

    this.init(width, height);
    // animate();
  };
  toggleRotation = () => {
    this.rotating = !this.rotating;
  };

  init = (width, height) => {
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    this.camera.position.y = 150;
    this.camera.position.z = 500;
    this.scene = new THREE.Scene();

    let geometry = new THREE.BoxGeometry(200, 200, 200);
    for (let i = 0; i < geometry.faces.length; i += 2) {
      let hex = Math.random() * 0xffffff;
      geometry.faces[i].color.setHex(hex);
      geometry.faces[i + 1].color.setHex(hex);
    }

    let material = new THREE.MeshBasicMaterial({
      vertexColors: THREE.FaceColors,
      overdraw: 0.5
    });

    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.y = 150;
    this.scene.add(this.cube);
  };

  animate = () => {
    if (this.renderer) {
      // this.requestId = requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);

      if (this.rotating) {
        this.cube.rotation.y += 0.05;
      }

      const rngl = this.renderer.context.getExtension("RN");
      rngl.endFrame();
    }
  };

  render() {
    return (
      <View style={styles.container} onTouchStart={this.toggleRotation}>
        <WebGLView
          style={styles.webglView}
          onContextCreate={this.onContextCreate}
          onFrame={() => {
            this.animate();
          }}
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
