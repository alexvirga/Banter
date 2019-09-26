import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  Image
} from "react-native";
import {
  List,
  Input,
  Button,
  Card,
  ListItem,
  ButtonGroup
} from "react-native-elements";
import WaitingPage from "./WaitingPage";
// import { ActionCableConsumer } from "react-actioncable-provider";
import ActionCable from "react-native-actioncable";

export default class BillView extends React.Component {
  state = {
    users: [],
    user_amt: 0

    //   currentUsers: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/user_groups")
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          users: data.filter(user => user.group_id === this.props.group_id)
        })
      );
  }

  handleTotal = num => {
    this.setState({ user_amt: num });
  };

  onReceived = (data) => {
    console.log('Received data:', data)
}

  render() {
    let billTotal = this.props.group.map(group => group.bill_total);

    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

    cable.subscriptions.create(
      { channel: "WaitingroomChannel", group_id: this.props.group_id },
      {
        received(data) {
          console.log("Received data:", data);
        }
      }
    );
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <View style={{ marginBottom: 30 }}>
          <Text
            style={{
              textAlign: "center",
              width: 400,
              height: 60,
              fontSize: 60,
              letterSpacing: 10,
              marginBottom: 30
            }}
          >
            {this.props.code}
          </Text>
          <Text
            style={{
              textAlign: "center",
              width: 400,
              height: 60,
              fontSize: 40,
              letterSpacing: 10
            }}
          >
            ${billTotal[0].toFixed(2)}
          </Text>
        </View>

          <ActionCable
            channel={{ channel: "WaitingroomChannel" }}
            onReceived={this.onReceived}
          />

        <View>
          <ButtonGroup
            buttons={["10%", "15%", "20%", "0%"]}
            selectedIndex={this.props.index}
            containerStyle={{
              height: 30,
              width: 200,
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 15
            }}
          />
        </View>
        <View>
          {this.state.users.map(user => (
            <View>
              <ListItem
                style={styles.listView}
                key={user.id}
                title={user.user.username}
                bottomDivider
              ></ListItem>
            </View>
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
  },
  button: {
    marginTop: 30,
    justifyContent: "center"
  }
});
