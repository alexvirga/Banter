import React, { Component } from "react";
import {
  Image,
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Input, Button, Card, ListItem } from "react-native-elements";

export default class WaitingPage extends React.Component {
  state = {
    groups: [],
    currentGroup: ""
  };

  componentDidMount() {
    fetch("http://localhost:3000/groups")
      .then(resp => resp.json())
      .then(data => this.setState({ groups: data }));
  }

  

    
    
  

  render() {




    let thisgroup = this.state.groups.filter(group => group.group_code === this.props.code)
    let myusers = thisgroup.map(obj => obj.users)
    const users = myusers.flat(1)

  
   
    
  
    
    

 

    return (
      <View>
        <View>
  {
    users.map((user) => (
      <ListItem
        key={user.id}
        title={user.username}
        bottomDivider
      />
    ))
  }
</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    textAlign: "center",

    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20
  }
});
