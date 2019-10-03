import React from "react";
import { View, Text } from 'react-native';


export default class ProfileScreen extends React.Component {
  state = {
    groups: []
  }

  componentDidMount() {
    fetch("https://evening-mountain-63500.herokuapp.com/user_groups")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          groups: data.filter(user => user.user_id === this.props.user.id)
        });
      });

  }
    render() {
      let mygroupIDs = this.state.groups.map(group => group.group_id)
      console.log(mygroupIDs)
      return(
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{this.props.user.email}</Text>
      </View>
      )
    }
  }

 

