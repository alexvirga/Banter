import React, { Component } from "react";
import { Image, ScrollView, Text, StyleSheet, View, TextInput, AsyncStorage, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import WaitingPage from "./WaitingPage";



export default class Homepage extends React.Component {
    state = {
        code: "",
        buttonOpacity: 0,
        user: this.props.user,
        submitted: false,
        groups: []
    }

    componentDidMount() {
      fetch("http://localhost:3000/groups")
        .then(resp => resp.json())
        .then(data => this.setState({ groups: data }));
    }





    handleCodeChange = code => {
        this.setState({ code: code })
        {if (this.state.code.length >= 4) {
          this.setState({buttonOpacity: 100})   
      }
      else if (this.state.code.length <= 5) 
        this.setState({buttonOpacity: 0})
    }
      }

      handleSubmit = () => {
        this.setState({submitted: true})
        
        
        
        
        }

    render() {
      let waitingpage = <WaitingPage code={this.state.code} user={this.state.user}  groups={this.state.groups}/> 

      
      if (this.state.submitted === true)
      return waitingpage
        

      return(
          
        <View style={styles.logincomp}>
        <Text style={{ fontSize: 27, marginBottom: 50 }}>Enter Your Code</Text>
        <TextInput
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={5}
            value={this.state.email}
            onChangeText={this.handleCodeChange}
            style={{
                textAlign: "center",
                width: 200,
                height: 60,
                fontSize: 60,
                letterSpacing: 25}}
           placeholder="C9QNX"/>
        <View style={{ margin: 7 }} />
        <TouchableOpacity onPress={this.handleSubmit} >
      <Image

        style={{
          opacity: this.state.buttonOpacity,
          marginTop: 50 ,
          justifyContent: "center",}}
          
        source={require('../assets/round_arrow_forward_ios_black_18dp.png')}
      />
    </TouchableOpacity>
      </View>
    );
    }
  }

  const styles = StyleSheet.create({
    button: {
    },
  
    logincomp: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
      padding: 20
    }
  });



 

