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

export default class BillView extends React.Component {
  state = {
    users: [],
    user_amt: 0,
    updated: 100
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

  handleTotal = (text, user) => {
    fetch("http://localhost:3000/user_groups", {
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      method: "PATCH",
      body: JSON.stringify({
        id: user.id,
        user_payment_amt: text,
        user_id: user.user_id,
        group_id: user.group_id
      })
    })
      .then(response => response.json())
      .then(this.componentDidMount());
  };

  //   onReceived = (data) => {
  //     console.log('Received data:', data)
  // }

  // calculateTip = (userpayment) => {
  //   let groupobj= this.props.group[0]
  //   let tip=groupobj.tip_percentage
  //   let tipPayment = userpayment * tip / 100
  //   return tipPayment

  // }




  convertAmtToString = (userAmt) => {
    if (userAmt === null){
      return "0"}
      else 
      return userAmt.toString()
    }
  

  render() {




    let billTotal = this.props.group.map(group => group.bill_total);
    let evenSplit = (billTotal / this.state.users.length).toFixed(2);
    let groupobj = this.props.group[0];
    let tip = groupobj.tip_percentage;

    // // const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

    // cable.subscriptions.create(
    //   { channel: "WaitingroomChannel", group_id: this.props.group_id },
    //   {
    //     received(data) {
    //       console.log("Received data:", data);
    //     }
    //   }
    // );
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

        {/* <ActionCable
            channel={{ channel: "WaitingroomChannel" }}
            onReceived={this.onReceived}
          /> */}

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
        <View
          style={{
            flex: 0,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this.state.users.map(user => (
            <View
              key={user.user.id}
              style={{
                flex: 0,
                flexDirection: "row",
                justifyContent: "center",

                backgroundColor: "#fff"
              }}
            >
              
              <Text style={{ padding: 10 }}>{user.user.username}</Text>
              <Text style={{ padding: 10 }}>
                {(user.user_payment_amt * tip) / 100}
              </Text>
              <Input
                style={{
                  flex: 0,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 0,
                  backgroundColor: "#fff"
                }}
                // defaultValue={"0"}
                value={(0 + user.user_payment_amt)}
                placeholder={evenSplit}
                onChangeText={text => this.handleTotal(text, user)}
              />
            </View>
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
