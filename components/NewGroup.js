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

export default class NewGroup extends React.Component {
  state = {
    billTotal: 0,
    index: 2
  };

  handleTotal = num => {
    this.setState({ billTotal: num });
  };

  updateIndex = selectedIndex => {
    this.setState({ index: selectedIndex });
  };

  render() {
    const buttons = ["10%", "15%", "20%", "0%"];
    const { selectedIndex } = this.state.index;

    let tipAmt = buttons[this.state.index];
    let tipNum = tipAmt.replace("%", "");
    let tipTotal = (this.state.billTotal * tipNum) / 100;
    let billPlusTip = parseFloat(this.state.billTotal) + parseFloat(tipTotal);
    let formattedBillPlusTip = billPlusTip.toFixed(2);

    console.log(tipNum);

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
        </View>
        <View>
          <View style={{ justifyContent: "center", flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 45,
                color: "darkgrey"
              }}
            >
              {" "}
              ${" "}
            </Text>
            <TextInput
              style={{
                textAlign: "center",
                width: 300,
                height: 60,
                fontSize: 40,
                letterSpacing: 5
              }}
              keyboardType={"numeric"}
              value={this.state.billTotal}
              onChangeText={this.handleTotal}
              placeholder="Total Bill Amount"
            />
          </View>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{
              height: 30,
              width: 200,
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 15
            }}
          />
        </View>

        <Text
          style={{
            justifyContent: "center",
            alignSelf: "center",
            marginBottom: 20
          }}
        >
          {" "}
          {buttons[this.state.index]} = ${tipTotal.toFixed(2)}
        </Text>

        <View>
          <Text
            style={{
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 10,
              marginTop: 30
            }}
          >
            You Owe:
          </Text>
          <Text
            style={{
              textAlign: "center",
              width: 400,
              height: 60,
              fontSize: 60,
              letterSpacing: 5,
              marginTop: 10
            }}
          >
            ${formattedBillPlusTip}
          </Text>
        </View>

        <TouchableOpacity onPress={this.handleSubmit}>
          <Image
            style={{
              marginTop: 70,
              justifyContent: "center",
              alignSelf: "center"
            }}
            source={require("../assets/round_arrow_forward_ios_black_18dp.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
