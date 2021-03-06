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
// import { ActionCableConsumer } from "react-actioncable-provider";
// import ActionCable from "react-native-actioncable";

export default class UserBillSplit extends React.Component {
  state = {
    amt: this.props.user.user_payment_amt,
    amtInt: {}
  };

  handleSplit = text => {
    if (text === "") {
      this.setState({ amt: "" }, () =>
        this.props.handleTotal(0, this.props.user)
      );
    } else
      this.setState({ amt: text.toString() }, () =>
        this.props.handleTotal(text, this.props.user)
      );
  };

  handleInputforUser = () => {
    if (this.props.user.user_id === this.props.me.id) {
      return (
        <TextInput
          style={{
            padding: 10,
            flex: 1,
            alignSelf: "center",
            backgroundColor: "lightgrey"
          }}
          keyboardType={"numeric"}
          defaultValue={"0"}
          value={this.state.amt.toString()}
          placeholder={this.props.evenSplit}
          onChangeText={text => this.handleSplit(text)}
        />
      );
    } else
      return (
        <Text
          style={{
            padding: 10,
            flex: 1,
            alignSelf: "center",
           
          }}
        >
        ${this.props.user.user_payment_amt.toFixed(2)}
        </Text>
      );
  };

  render() {
    let groupobj = this.props.group[0];
    let tip = groupobj.tip_percentage;

    return (
      <View
        key={this.props.user.user.id}
        style={{
          marginLeft: 30,
          marginRight: 30,
          flex: 0,
          flexDirection: "row"
        }}
      >
        <Text
          style={{
            padding: 10,
            flex: 1,
            fontSize: 14,
            alignSelf: "auto",
            flexWrap: "nowrap"
          }}
        >
          {this.props.user.user.username}
        </Text>

        {this.handleInputforUser()}

        <Text
          style={{ padding: 10, flex: 1, fontSize: 10, alignSelf: "center" }}
        >
          +${((this.props.user.user_payment_amt * tip) / 100).toFixed(2)} tip
        </Text>

        <Text style={{ padding: 10, flex: 1 }}>
          $
          {(
            (this.props.user.user_payment_amt * tip) / 100 +
            this.props.user.user_payment_amt
          ).toFixed(2)}
        </Text>
      </View>
    );
  }
}
