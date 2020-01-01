## react-native-webgl is deprecated

Since [react-native-unimodules](https://github.com/unimodules/react-native-unimodules) was introduced we can now use Expo modules like `expo-gl` which is where the webgl implementation has been continued and is actively maintained.

We therefore recommend you now move to use [expo-gl](https://github.com/expo/expo/tree/master/packages/expo-gl#expo-gl):

**You will need a react-native-unimodules setup**

```
yarn add react-native-unimodules
```

If it's the first time you install `react-native-unimodules`, you will have to carefully follow the documentation to configure your project:
[configure unimodules](https://github.com/unimodules/react-native-unimodules) (if not yet done)

**You can then install expo-gl dependencies:**

```
yarn add expo-gl expo-gl-cpp
```

### If you use `gl-react-native`

Upgrade to latest version of `gl-react-native` that now depends on `expo-gl` and `expo-gl-cpp` (you don't need to install it, it also won't depend on this package anymore).
