**LIBRARY STATUS: UNSTABLE. expect frequent breaking changes.**

---

<img width="32" alt="icon" src="https://cloud.githubusercontent.com/assets/211411/9813786/eacfcc24-5888-11e5-8f9b-5a907a2cbb21.png"> react-native-webgl
========

`react-native-webgl` implements WebGL 1 in [React Native](https://facebook.github.io/react-native/).

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

see also [example](example).

## Difference with web's WebGL

### `"RN"` Extension
The first noticeable difference is the addition of an extension, called `"RN"` that you can get with `gl.getExtension("RN")`. It returns an object with a few functions:

- `endFrame()`: the mandatory call to get anything drawn on screen. It's the way to tell the current implementation everything is finished for the current frame. (we might later introduce better way)
- `loadTexture(config)`: It is a way to load a `Texture` with a configuration object. There are many format supported (See Texture Config Formats). For instance you can load an image with `{ image: "url_of_the_image" }`. This function returns a **Promise of `{ texture, width, height }`** where texture is the actual `WebGLTexture` instance you can use in a `gl.bindTexture` and width and height is the texture dimension.
- `unloadTexture(texture)`: allows to unload a texture with the texture object that was returned in a previous `loadTexture`.

#### Texture Config Formats

TO BE WRITTEN

### Missing WebGL features

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

## Install

```bash
npm i --save react-native-webgl
# OR
yarn add react-native-webgl
```

gl-react-webgl is implemented with some C++ bricks, therefore `react-native link react-native-webgl` is not enough to install and configure your project, please read following notes.

### Configure your React Native Application

*(TODO: REWRITE THIS. I think maybe we can recommend doing the usual react-native link command and we just need to document what needs to be done on top of it.)*

**on iOS:**

(TO BE WRITTEN – basically just the usual XCode linking)

**on Android:**

1. `android/local.properties`: Make sure you have Android NDK (needed to compile the Native C++ code) and that it's properly configured in ANDROID_NDK env or in `local.properties` file (e.g. `ndk.dir=/usr/local/opt/android-ndk-r10e`).
2. `android/settings.gradle`:: Add the following snippet
```gradle
include ':RNWebGL'
project(':RNWebGL').projectDir = file('../node_modules/react-native-webgl/android')
```
3. `android/app/build.gradle`: If it's not already there, add `gradle-download-task` **buildscript** dependency: `classpath 'de.undercouch:gradle-download-task:3.1.2'` . If you don't do this, you will likely have `:downloadJSCHeaders` not working.
4. `android/app/build.gradle`: Add in dependencies block.
```gradle
compile project(':RNWebGL')
```
5. in your `MainApplication` (or equivalent) the RNGLPackage needs to be added. Add the import at the top:
```java
import fr.greweb.rngl.RNGLPackage;
```
6. In order for React Native to use the package, add it the packages inside of the class extending ReactActivity.
```java
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
	new MainReactPackage(),
	...
	new RNGLPackage()
  );
}
```

### Thanks

This implementation is a standalone fork of Expo GLView (MIT License) available on
https://github.com/expo/expo and https://github.com/expo/expo-sdk.
Huge kudos to Expo team and especially [@nikki93](https://github.com/nikki93) for implementing it.
