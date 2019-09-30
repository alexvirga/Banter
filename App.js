import React from "react";
import { AsyncStorage, StyleSheet } from "react-native";
import LoginScreen from "./components/LoginScreen";
import Homepage from "./components/Homepage";
import ActionCableProvider from "react-actioncable-provider";
import {

  View,
 

} from "react-native";

class App extends React.Component {
  state = {
    email: "",
    password: "",
    isLoggedIn: false,
    message: "",
    user: ""
  };

  // static navigationOptions = {
  //   header: null
  // };
  componentDidMount() {
    this.autoLogin();
  }

  autoLogin = () => {
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem("token");

        if (value !== null) {
          fetch(`http://localhost:3000/autologin`, {
            headers: {
              accept: "application/json",
              Authorization: value
            }
          })
            .then(resp => resp.json())
            .then(data => {
              this.setState({ user: data.email });
              console.log(data.token);
              if (data.error) {
                alert(data.error);
              } else {
                // AsyncStorage.setItem('user', data)
                this.setState({ isLoggedIn: true });
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
        if (response.token === undefined) {
          alert(response.errors);
        } else {
          this.setState({ isLoggedIn: true, user: response.email });
          _storeData = async () => {
            try {
              await AsyncStorage.setItem("token", response.token);
              // await AsyncStorage.setItem("user", response);
            } catch (error) {
              alert(error);
            }
          };
          _storeData();
          return homepage;
        }
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

  render() {


    return (
      
      this.page()
      

    );
  }
}



const styles = StyleSheet.create({
  loggedin: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20
  }
});

export default App;
