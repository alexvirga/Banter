import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Animated,
  View,
  TextInput
} from "react-native";
import Login from "./components/LoginScreen"
import Homepage from "./components/Homepage"
import AppApp from "./components/AppApp"


import { RectButton } from "react-native-gesture-handler";

import DrawerLayout from "react-native-gesture-handler/DrawerLayout";

const TYPES = ["back", "back", "back", "back"];
const PARALLAX = [false, false, true, false];

const Page = ({}) => (
  <View style={styles.page}>
      <AppApp/>
  </View>
);

export default class App extends Component {
  state = { fromLeft: true, type: 1 };

  renderParallaxDrawer = progressValue => {
    const parallax = progressValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.state.fromLeft ? -50 : 50, 0]
    });
    const animatedStyles = {
      transform: [{ translateX: parallax }]
    };
    return (
      <Animated.View style={[styles.drawerContainer, animatedStyles]}>
        <Text style={styles.drawerText}>I am in the drawer!</Text>
        <Text style={styles.drawerText}>
          Watch parallax animation while you pull the drawer!
        </Text>
      </Animated.View>
    );
  };

  renderDrawer = () => {
    return (
      <View style={styles.drawerContainer}>
        <Text style={styles.drawerText}>I am in the drawer!</Text>
      </View>
    );
  };

  render() {
    const drawerType = TYPES[this.state.type];
    const parallax = PARALLAX[this.state.type];
    return (
      <View style={styles.container}>
        <DrawerLayout
          ref={drawer => {
            this.drawer = drawer;
          }}
          drawerWidth={170}
          keyboardDismissMode="on-drag"
          drawerPosition={DrawerLayout.positions.Left}
          drawerType={"back"}
          drawerBackgroundColor="#ddd"
          renderNavigationView={
            parallax ? this.renderParallaxDrawer : this.renderDrawer
          }
          contentContainerStyle={
            // careful; don't elevate the child container
            // over top of the drawer when the drawer is supposed
            // to be in front - you won't be able to see/open it.
            drawerType === "back"
              ? {}
              : Platform.select({
                  ios: {
                    shadowColor: "#000",
                    shadowOpacity: 0.5,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 60
                  },
                  android: {
                    elevation: 100,
                    backgroundColor: "#000"
                  }
                })
          }
        >
          <Page
            type={"back"}
            fromLeft={this.state.fromLeft}
            parallaxOn={parallax}
            openDrawer={() => this.drawer.openDrawer()}
          />
        </DrawerLayout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "white",
    flex: 1
  },
  pageText: {
    fontSize: 21,
    color: "white"
  },
  rectButton: {
    height: 60,
    padding: 10,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "white"
  },
  rectButtonText: {
    backgroundColor: "transparent"
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 10
  },
  pageInput: {
    height: 60,
    padding: 10,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#eee"
  },
  drawerText: {
    margin: 10,
    marginTop:35,
    fontSize: 15,
    textAlign: "left"
  }
});
