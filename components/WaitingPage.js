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
import { List, Input, Button, Card, ListItem } from "react-native-elements";

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
    let thisgroup = this.state.groups.filter(
      group => group.group_code === this.props.code
    );
    let myusers = thisgroup.map(obj => obj.users);
    const users = myusers.flat(1);

    return (
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          padding: 20
        }}
      >
        <View>
          <Text
            style={{
              textAlign: "center",
              width: 400,
              height: 60,
              fontSize: 60,
              letterSpacing: 25,
              marginBottom: 30
            }}
          >
            
            {this.props.code}
          </Text>
        </View>

        <View>
          <Text style={{ alignSelf: "center", justifyContent: "center"}}> Members </Text>
          {users.map(user => (
            <ListItem
              style={styles.listView}
              key={user.id}
              title={user.username}
              bottomDivider
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    width: 300,
    alignItems: "center",
    textAlign: "center",
    alignSelf: "center"
  }
});
