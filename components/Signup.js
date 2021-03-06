import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  View
} from "react-native";
import {  Button } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";


class Signup extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    username: ""
  };

  signupHandler = user => {
    {
      if (this.state.password === this.state.password2) {
        fetch("https://evening-mountain-63500.herokuapp.com/users", {
          headers: {
            "content-type": "application/json",
            accept: "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            user: {
              email: this.state.email,
              username: this.state.username,
              password: this.state.password
            }
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.errors) {
              alert(data.errors);
            } else {
              this.props.clickHandler(this.state);
            }
          });
      } else {
        alert("Passwords must match");
        this.setState({
          password: "",
          password2: ""
        });
      }
    }
  };

  handleEmailChange = email => {
    this.setState({ email: email });
  };

  handlePasswordChange = password => {
    this.setState({ password: password });
  };
  handlePasswordTwoChange = password => {
    this.setState({ password2: password });
  };

  handleUsernameChange = username => {
    this.setState({ username: username });
  };

  //   handleSubmit = user => {
  //     this.props.clickHandler(this.state);
  //   };

  render() {
    console.log(this.state);

    return (
      <View style={styles.logincomp}>
        <Text style={{ fontSize: 27 }}>Sign up</Text>
        <TextInput
          style={{
            textAlign: "center"
          }}
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          placeholder="Email"
        />

        <TextInput
          value={this.state.username}
          onChangeText={this.handleUsernameChange}
          placeholder="Username"
        />

        <TextInput
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          placeholder="Password"
          secureTextEntry={true}
        />

        <TextInput
          value={this.state.password2}
          onChangeText={this.handlePasswordTwoChange}
          placeholder="Password"
          secureTextEntry={true}
        />

        <View style={{ margin: 7 }} />

        <TouchableOpacity onPress={this.signupHandler}>
          <Image
            style={styles.button}
            source={require("../assets/round_arrow_forward_ios_black_18dp.png")}
          />
        </TouchableOpacity>

        {/* <Button

        style={styles.button} type="outline" onPress={this.handleSubmit} title="Submit" /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    justifyContent: "center"
  },

  logincomp: {
    textAlign: "center",

    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20
  }
});

export default Signup
