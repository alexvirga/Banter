import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    }

  //   clickHandler=()=>{
  //     let email = this.state.email
  //     let password = this.state.password
  //     console.log(this.state)
  //     alert(this.state.email)
  //     fetch("http://localhost:3000/login", {
  //       method: "POST",
  //       headers: {
  //         "Accept": "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //         password: password
  //       })
  //     })
  // }

    handleEmailChange = email => {
      this.setState({email: email})
    }

    handlePasswordChange = password => {
      this.setState({password: password})
    }

    handleSubmit = user => {
      this.props.clickHandler(this.state)
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput  value={this.state.email} onChangeText={this.handleEmailChange} placeholder='Username' />
                <TextInput  value={this.state.password} onChangeText={this.handlePasswordChange}placeholder='Password' />
                <View style={{margin:7}} />
                <Button 
                          onPress={this.handleSubmit}
                          title="Submit"
                      />
                  </ScrollView>
            )
    }
}