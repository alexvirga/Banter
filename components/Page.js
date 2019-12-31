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
import Login from "./LoginScreen";
import Homepage from "./Homepage";
import AppApp from "./AppApp";
import WaitingPage from "./WaitingPage";
import ProfileScreen from "./ProfileScreen"

import { RectButton } from "react-native-gesture-handler";

import DrawerLayout from "react-native-gesture-handler/DrawerLayout";


export default class Page extends Component {
state = {
    user: ""
}
    passUser = user => {
        this.setState({user: user})
      console.log(user)
    }
    render() {
        console.log(this.props.profileCode)
      
      console.log(this.props.selected);
  
      let buttonpages = () => {
        if (this.props.selected === "your groups") {
          return <ProfileScreen user={this.state.user}/>;
        } else return <AppApp passUser={this.passUser}/>;
      };
  
      return <View style={styles.page}>{buttonpages()}</View>;
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
      flex: 1,
      position: "relative"

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
      marginTop: 35,
      fontSize: 15,
      textAlign: "left"
    }
  });
  