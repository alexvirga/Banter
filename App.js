import React from "react";
import { View, Text, TextInput, AsyncStorage } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/LoginScreen";
import Secured from "./components/Secured";

import ProfileScreen from "./components/ProfileScreen";
import { ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import {AppRegistry} from 'react-native';


class App extends React.Component {
  state = {
    email: "",
    password: "",

  }

  clickHandler=(user)=>{
    let email = user.email
    let password = user.password
    
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

      .then(resp => resp.json())
      .then(data => console.log(data)
         
  
      )}
        
        
  //       data => {
  //       if (data.message) {
  //         alert("Invalid email/password")
  //       } else {
  //         AsyncStorage.setItem("token", data.jwt)
  //         dispatch(loginUser(data.user))
  //       }
  //     })
  
  // }
      
    



render() {
  // if (this.state.isLoggedIn) 
  //     return <Secured 
  //         onLogoutPress={() => this.setState({isLoggedIn: false})}
  //       />;
  //   else 
      return <LoginScreen
      clickHandler={this.clickHandler}
          onLoginPress={() => this.setState({isLoggedIn: true})}
        />;

}

}

export default App
