import React, { Component } from "react";
import { Image, TouchableOpacity, ScrollView, Text, StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Signup from "./Signup"

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    user: "",
    signup: false

  };


  handleEmailChange = email => {
    this.setState({ email: email });
  };

  handlePasswordChange = password => {
    this.setState({ password: password });
  };

  handleSubmit = user => {
    this.props.clickHandler(this.state);
  };

  signupHandler = () => {
    this.setState({signup: true})
  }


  render() {
    let signup = (
      <Signup  clickHandler={this.props.clickHandler}/>);

      if (this.state.signup === true) return signup
  
    return (
      
      <View style={styles.logincomp}>
        
        <Text style={{ fontSize: 27 }}>Login</Text>
        <Input
                 style={{
                  textAlign: "center",
                 }}          
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          placeholder="Username"
        />
        <Input
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          placeholder="Password"
          secureTextEntry={true}
        />
        <View style={{ margin: 7 }} />
        <Button
        style={{
          marginBottom: 15
        }}
          buttonStyle={styles.button}
          onPress={() => this.signupHandler()}
          title=" Sign Up"
          type="clear"
        />

        <TouchableOpacity onPress={this.handleSubmit}>
      <Image
        style={styles.button}
        source={require('../assets/round_arrow_forward_ios_black_18dp.png')}
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
    justifyContent: "center",
  },

  logincomp: {

      textAlign: "center",

    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20
  }
});
