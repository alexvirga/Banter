import React from "react";
import { View, Text, TextInput, AsyncStorage, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/LoginScreen";
import Secured from "./components/Secured";

import ProfileScreen from "./components/ProfileScreen";
import { ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import { AppRegistry } from "react-native";
import Homepage from "./components/Homepage";
import WaitingPage from "./components/WaitingPage";

class App extends React.Component {
  state = {
    email: "",
    password: "",
    isLoggedIn: false,
    message: "",
    user: ""
  };

  static navigationOptions = {
    header: null 
  }

  clickHandler = user => {
    let email = user.email;
    let password = user.password;
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(resp => resp.json())
      .then(response => {

        if (response.token === undefined) alert(response.errors);
        else this.setState({ isLoggedIn: true, user: response.email});
        _storeData = async () => {
          try {
            await AsyncStorage.setItem("token", response.token);
          } catch (error) {}
          _storeData();
        };
      });
  };

  render() {

    let homepage = <Homepage user={this.state.user}/>
    let loginscreen = <LoginScreen
    clickHandler={this.clickHandler}
    onLoginPress={() => this.setState({ isLoggedIn: true })}
  />

  

    if (this.state.isLoggedIn)
    return homepage
    else
      return loginscreen
        
     
  }
}

// const AppNavigator = createStackNavigator(
//   {
//     App: App,
//     Login: LoginScreen,
//     Homepage: Homepage,
//     WaitingPage: WaitingPage
//   },{
//     initialRouteName: "App"
//   });

const styles = StyleSheet.create({
  loggedin: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20
  }
  
});


export default App
//  createAppContainer(AppNavigator);
