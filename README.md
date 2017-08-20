**LIBRARY STATUS: UNSTABLE. expect frequent breaking changes.**

---

<img width="32" alt="icon" src="https://cloud.githubusercontent.com/assets/211411/9813786/eacfcc24-5888-11e5-8f9b-5a907a2cbb21.png"> react-native-webgl
========

`react-native-webgl` implements WebGL 1 in [React Native](https://facebook.github.io/react-native/).

> This implementation is a standalone fork of Expo GLView (MIT License) available on
https://github.com/expo/expo and https://github.com/expo/expo-sdk.
Huge kudos to Expo team and especially [@nikki93](https://github.com/nikki93) for implementing it.

## Usage

You can also use this library as way to do vanilla WebGL in React Native. For that, the library will expose `WebGLView` and `Image` (polyfill of browser's `Image`).

See [example](example).

## Install

It is important to understand that, because gl-react-native is implemented with some C++ bricks, `react-native install react-native-webgl` might not be enough to install and configure your project, please read following notes.

### Configure your React Native Application

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
