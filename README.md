<img width="32" alt="icon" src="https://cloud.githubusercontent.com/assets/211411/9813786/eacfcc24-5888-11e5-8f9b-5a907a2cbb21.png"> react-native-webgl
========

`react-native-webgl` implements WebGL 1 in [React Native](https://facebook.github.io/react-native/).

## Install

```bash
npm i --save react-native-webgl
# OR
yarn add react-native-webgl
```


### Configure your React Native Application

```bash
react-native link react-native-webgl
```

**on Android:**

gl-react-webgl is implemented with some C++ bricks and `react-native link react-native-webgl` is not enough to install and configure your project for Android:

- `android/local.properties`: Make sure you have Android NDK (needed to compile the Native C++ code) and that it's properly configured in ANDROID_NDK env or in `local.properties` file (e.g. `ndk.dir=/usr/local/opt/android-ndk-r10e`).
- `android/app/build.gradle`: If it's not already there, add `gradle-download-task` **buildscript** dependency: `classpath 'de.undercouch:gradle-download-task:3.1.2'` . If you don't do this, you will likely have `:downloadJSCHeaders` not working.

## Usage

Ths library exposes a `WebGLView` that implements WebGL in React Native.

*Basic gist:*
```js
import React, { Component } from "react";
import { WebGLView } from "react-native-webgl";
class RedSquareWebGL extends Component {
  onContextCreate = (gl: WebGLRenderingContext) => {
    const rngl = gl.getExtension("RN");
    gl.clearColor(1, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    rngl.endFrame();
  };
  render() {
    return (
      <WebGLView
        style={{ width: 100, height: 100 }}
        onContextCreate={this.onContextCreate}
      />
    );
  }
}
```

> For a better example, see [Image drawn through a Shader](example/App.js) (vanilla WebGL).
Then, feel free to use your preferred library, like https://github.com/regl-project/regl , https://github.com/mrdoob/three.js or https://github.com/gre/gl-react (`gl-react-native` is backed by this implementation).

## Difference with web's WebGL

### `"RN"` Extension
The first noticeable difference is the addition of an extension, called `"RN"` that you can get with `gl.getExtension("RN")`. It returns an object with a few functions:

- `endFrame()`: the mandatory call to get anything drawn on screen. It's the way to tell the current implementation everything is finished for the current frame. (we might later introduce better way)
- `loadTexture(config)`: It is a way to load a `Texture` with a configuration object. For the config object format see Section **Texture Config Formats**.This function returns a **Promise of `{ texture, width, height }`** where texture is the actual `WebGLTexture` instance you can use in a `gl.bindTexture` and width and height is the texture dimension.
- `unloadTexture(texture)`: allows to unload a texture with the texture object that was returned in a previous `loadTexture`.

#### Texture Config Formats

The texture formats are provided in an extensible and loosely-coupled way via adding more "Loaders" to the project. *(as soon as they are linked, they will get discovered by RNWebGL via the RN bridge)*.

This library comes with one built-in loader: the Image Loader. Other loaders that will come via libraries like `react-native-webgl-camera` and `react-native-webgl-video`. Feel free to implement your own.

##### Image Loader

Format is `{ image }` where image have the same format as React Native [`<Image source` prop](https://facebook.github.io/react-native/docs/image.html#source).

The library comes with only one built-in format: the Image Loader.

##### Shared config options

There are also config options shared (by convention) across the loaders:

- `yflip` (boolean): allows to vertically flip the texture when you load it. You likely always want to set this to true. (default is false because it's an extra cost)

### Remaining WebGL features to implement

The current early implementation miss a bunch of WebGL features, meaning that some gl methods won't work.

Here is the methods that are not supported yet:

- `framebufferRenderbuffer`
- `getFramebufferAttachmentParameter`
- `bindRenderbuffer`
- `createRenderbuffer`
- `deleteRenderbuffer`
- `getRenderbufferParameter`
- `renderbufferStorage`
- `compressedTexImage2D`
- `compressedTexSubImage2D`
- `getTexParameter`
- `texSubImage2D`
- `getUniform`
- `getVertexAttrib`
- `getVertexAttribOffset`

Here is the methods that are partially supported:

- `texImage2D` : works with a few formats only (refer to current implementation). You might want to use `rngl.loadTexture` to load images/camera/videos/whatever textures.

### Thanks

This implementation is a standalone fork of Expo GLView (MIT License) available on
https://github.com/expo/expo and https://github.com/expo/expo-sdk.
Huge kudos to Expo team and especially [@nikki93](https://github.com/nikki93) for implementing it.
