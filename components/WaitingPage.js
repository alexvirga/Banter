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
import BillView from "./BillView";

export default class WaitingPage extends React.Component {
  state = {
    group: [],
    isMember: false,
    refresh: "",
    isLeader: true, // SET BACK TO FALSE ONCE TESTING IS COMPLETE
    ready: false
  };

  componentDidMount() {
    fetch("http://localhost:3000/groups")
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          group: data.filter(group => group.group_code === this.props.code)
        })
      )
      .then(data => this.validateLeader())
      
  }

  handleSubmit = e => {
    fetch("http://localhost:3000/user_groups", {
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        user_id: this.props.user.id,
        group_id: this.state.group.map(group => group.id)[0]
      })
    })
      .then(response => response.json())
      .then(this.componentDidMount());
  };

  validateUser = () => {
    let currentUsers = this.state.group.map(obj => obj.users);
    let myusers = currentUsers.flat(1);
    let currentIds = myusers.map(user => user.id);
    if (currentIds.includes(this.props.user.id)) {
      alert("You already belong to this group");
    } else this.handleSubmit();
  };

  validateLeader = () => {
    let matchedLeader = this.state.group.map(group => group.leader_id === this.props.user.id)
    if (matchedLeader[0] === true)
      this.setState({isLeader: true });
      else 
      this.setState({isLeader: true}) // SET BACK TO FALSE ONCE TESITNG IS COMPLETE
  }

  render() {
    let group_id = this.state.group.map(group => group.id)
    let groupid = group_id[0]
    let billview =  <BillView group={this.state.group} user={this.props.user} index={this.props.index} group_id={groupid} code={this.props.code}/>

    if (this.state.ready === true){
      return billview
    }



    let myusers = this.state.group.map(obj => obj.users);
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
              marginBottom: 10
            }}
          >
            {this.props.code}
          </Text>
        </View>

        <View>
          <Button
            style={{
              marginBottom: 15
            }}
            buttonStyle={styles.button}
            onPress={() => this.validateUser()}
            title="Join Group"
            type="clear"
          />

          <Text style={{ alignSelf: "center", justifyContent: "center" }}>
            {" "}
            Members{" "}
          </Text>

          {users.map(user => (
            <ListItem
              style={styles.listView}
              key={user.id}
              title={user.username}
              bottomDivider
            />
          ))}
        </View>
        <Button
          style={{
            marginBottom: 15
          }}
          buttonStyle={styles.button}
          onPress={() => this.componentDidMount()}
          title="Refresh users"
          type="clear"
        />
        <View>
          {this.state.isLeader ? (
            <TouchableOpacity onPress={() => this.setState({ready: true})}>
              <Image
                style={styles.button}
                source={require("../assets/round_arrow_forward_ios_black_18dp.png")}
              />
            </TouchableOpacity>
          ) : (
            <Text> </Text>
          )}
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
  },
  button: {
    marginTop: 30,
    justifyContent: "center"
  }
});
