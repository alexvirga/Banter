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
import Signup from "./components/Signup";
// import { ActionCableProvider } from 'react-native-actioncable';
import ActionCableProvider from 'react-actioncable-provider'

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
  };
  componentDidMount() {
    this.autoLogin();
  }

  autoLogin = () => {
   
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        alert(value)
        if (value !== null) {
          fetch(`http://localhost:3000/autologin`, {
            headers: {
              'accept': "application/json",
              Authorization: value
            }
          })
            .then(resp => resp.json())
            .then(data => {
              console.log(data.token)
              if (data.error) {
                alert(data.error);
              } else {
                // AsyncStorage.setItem('user', data.user_name)
                this.setState({isLoggedIn: true})

              }
            });
        }
      } catch (error) {
        alert("user not found");
      }
    };
    _retrieveData();
  };

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
        console.log("token", response.token)
        if (response.token === undefined) {
          alert(response.errors);
        } else {
          this.setState({ isLoggedIn: true, user: response.email });
          _storeData = async () => {
            try {
              await AsyncStorage.setItem("token", response.token);
            } catch (error) {
              alert(error)
            }
          }
          _storeData();
          return homepage;
        };
      });
  };

  page() {
    let homepage = <Homepage user={this.state.user} />;
    let loginscreen = (
      <LoginScreen
        clickHandler={this.clickHandler}
        onLoginPress={() => this.setState({ isLoggedIn: true })}
      />
    );

    if (this.state.isLoggedIn) return homepage;
    else return loginscreen;
  }


  render(){
    return (
      <ActionCableProvider url="ws://localhost:3000/cable">
        {this.page()}
      </ActionCableProvider>
    )
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

export default App;
//  createAppContainer(AppNavigator);
