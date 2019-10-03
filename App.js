import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Animated,
  View,
  TextInput,
  Image,
  Button
} from "react-native";
import Login from "./components/LoginScreen";
import Homepage from "./components/Homepage";
import AppApp from "./components/AppApp";
import WaitingPage from "./components/WaitingPage";
import ProfileScreen from "./components/ProfileScreen"

import { RectButton } from "react-native-gesture-handler";

import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import Page from "./components/Page"



export default class App extends Component {
  state = {
    path: ""
  };

  renderDrawer = () => {
    return (
      <View style={styles.drawerContainer}>
        <Image
          style={{
            marginTop: 19,
            height: 100,
            width: 100,
            justifyContent: "center",
            alignSelf: "center"
          }}
          source={require("./assets/banter.png")}
        />
        <Image
          style={{
            marginTop: 32,
            marginBottom: 50,
            height: 50,
            width: 50,
            justifyContent: "center",
            alignSelf: "center"
          }}
          source={require("./assets/user2.png")}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            title="Home"
            onPress={() => this.setState({ path: "home" })}
          />
          <Button
            title="Your Groups"
            onPress={() => this.setState({ path: "your groups" })}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <DrawerLayout
          drawerWidth={170}
          keyboardDismissMode="on-drag"
          drawerPosition={DrawerLayout.positions.Left}
          drawerType={"back"}
          drawerBackgroundColor="#FCFCFD"
          renderNavigationView={this.renderDrawer}
        >
          <Page style={styles.page} selected={this.state.path} type={"back"} fromLeft={true} />
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
    backgroundColor: "#F1F1F6",
    flex: 1
  },



  drawerContainer: {
    flex: 1,
    paddingTop: 10
  },

});
