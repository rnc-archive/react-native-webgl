//@flow
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import { StackNavigator } from "react-navigation";
import pkg from "react-native-webgl/package.json";

import HelloGL from "./HelloGL";
import BasicTexture from "./BasicTexture";
import ReadPixels from "./ReadPixels";

const ExampleRoutes = {
  HelloGL: {
    description: "Simplest WebGL shader",
    screen: HelloGL
  },
  BasicTexture: {
    description: "Basic example of an Image Texture drawn with effects",
    screen: BasicTexture
  },
  ReadPixels: {
    description: "readPixelsToTemporaryFile test",
    screen: ReadPixels
  }
};

const MainScreen = ({ navigation }: { navigation: * }) => (
  <ScrollView>
    <View style={styles.header}>
      <Text style={styles.headerText}>react-native-webgl @ {pkg.version}</Text>
    </View>
    {Object.keys(ExampleRoutes).map((name: string) => (
      <TouchableOpacity
        key={name}
        onPress={() => {
          const { path, params, screen } = ExampleRoutes[name];
          const { router } = screen;
          const action = path && router.getActionForPathAndParams(path, params);
          navigation.navigate(name, {}, action);
        }}
      >
        <View style={styles.item}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.description}>
            {ExampleRoutes[name].description}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const AppNavigator = StackNavigator(
  {
    ...ExampleRoutes,
    Index: {
      screen: MainScreen
    }
  },
  {
    initialRouteName: "Index",
    headerMode: "none",

    /*
   * Use modal on iOS because the card mode comes from the right,
   * which conflicts with the drawer example gesture
   */
    mode: Platform.OS === "ios" ? "modal" : "card"
  }
);

export default AppNavigator;

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    padding: 10
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000"
  },
  item: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd"
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444"
  },
  description: {
    fontSize: 13,
    color: "#999"
  }
});
