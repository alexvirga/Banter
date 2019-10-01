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
import * as Progress from "react-native-progress";
import UserBillSplit from "./UserBillSplit";
import { ScrollView } from "react-native-gesture-handler";

export default class BillView extends React.Component {
  state = {
    users: [],
    user_amt: 0,
    updated: 100
  };

  componentDidMount() {
    this.timer = setInterval(()=> this.autoRefresh(), 1000)
    fetch("https://evening-mountain-63500.herokuapp.com/user_groups")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          users: data.filter(user => user.group_id === this.props.group_id).sort((a,b) => (a.user.username > b.user.username) ? 1 : ((b.user.username > a.user.username) ? -1 : 0))
        });
      });

  }


  
  async autoRefresh(){
    fetch("https://evening-mountain-63500.herokuapp.com/user_groups")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          users: data.filter(user => user.group_id === this.props.group_id).sort((a,b) => (a.user.username > b.user.username) ? 1 : ((b.user.username > a.user.username) ? -1 : 0))
        });
      });
  }

  

  handleTotal = (text, user) => {
    fetch("https://evening-mountain-63500.herokuapp.com/user_groups", {
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
      .then(() => {
        fetch("https://evening-mountain-63500.herokuapp.com/user_groups")
          .then(resp => resp.json())
          .then(data => {
            this.setState({
              users: data.filter(user => user.group_id === this.props.group_id).sort((a,b) => (a.user.username > b.user.username) ? 1 : ((b.user.username > a.user.username) ? -1 : 0))
            });
          });
      });
  };

  // fetcher = () => {
  //   fetch("https://evening-mountain-63500.herokuapp.com/user_groups")
  //     .then(resp => resp.json())
  //     .then(data => {
  //       console.log(data.filter(user => user.group_id === this.props.group_id));
  //       this.setState({
  //         users: data.filter(user => user.group_id === this.props.group_id)
  //       })
  //     });
  // }

  convertAmtToString = userAmt => {
    if (userAmt === null) {
      return "0";
    } else return userAmt.toString();
  };

  render() {
    //Sum of all user payment amounts
    let totalArray = this.state.users.map(user => user.user_payment_amt);
    let reducedTotal = totalArray.reduce((a, b) => a + b, 0);

    //Even split of total bill
    let billTotal = this.props.group.map(group => group.bill_total);
    let evenSplit = (billTotal / this.state.users.length).toFixed(2);

    //Calculating total tip for group
    let splitToString = evenSplit.toString();
    let groupobj = this.props.group[0];
    let tip = groupobj.tip_percentage;
    let totalTipAmt = (tip * billTotal) / 100;

    //Calculating bill + tip, parsing float, splitting total amount into base/float for formatting
    let formatTotal = parseFloat((reducedTotal * tip) / 100 + reducedTotal);
    let formatTotals = formatTotal.toFixed(2);
    let splitTotal = formatTotals.split(".");
    let base = splitTotal[0];
    let float = splitTotal[1];

    //Calculating base bill minus tip, parsing float, splitting total amount into base/float for formatting
    let formatBillAmt = parseFloat(reducedTotal);
    let floatBillAmt = formatBillAmt.toFixed(2);
    let splitBillAmt = floatBillAmt.split(".");
    let baseBill = splitBillAmt[0];
    let floatBill = splitBillAmt[1];

    let progress = floatBillAmt / billTotal;
    // let remaining = billTotal - floatBillAmt
    let calculatedTipLeft =
      totalTipAmt - ((reducedTotal * tip) / 100).toFixed(2);
    

    remaining = () => {
      if (floatBillAmt <= billTotal[0]) {
        return (billTotal - floatBillAmt).toFixed(2);
      } else return Math.abs((billTotal - floatBillAmt).toFixed(2));
    };
    remainingLabel = () => {
      if (floatBillAmt <= billTotal[0]) {
        return "Total Remaining";
      } else return "You overpaid by";
    };

    backgroundchange = () => {
      if (floatBillAmt >= billTotal[0]) {
        return "lightgreen";
      } else return "red";
    };

    return (
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 9
          }}
        >
          <ScrollView>
            <View
              style={{
                justifyContent: "center",
                flex: 2,
                marginTop: 100,
                marginBottom: 30
              }}
            >
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
                  <UserBillSplit
                    evenSplit={splitToString}
                    handleTotal={this.handleTotal}
                    user={user}
                    group={this.props.group}
                    key={user.id}
                  />
                ))}
              </View>
              <Text style={{ alignSelf: "center" }}>
                ______________________________________________
              </Text>
              <View
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
                    alignSelf: "center",
                    fontSize: 28,
                    flexShrink: 2
                  }}
                >
                  ${baseBill}
                  <Text style={{ fontSize: 10 }}>.{floatBill} </Text>
                </Text>

                <Text style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                  + ${((reducedTotal * tip) / 100).toFixed(2)} tip
                </Text>

                <Text
                  style={{
                    backgroundColor: backgroundchange(),
                    padding: 0,
                    margin: 10,
                    flex: 1,
                    alignSelf: "center",
                    fontSize: 28,
                    flexShrink: 2
                  }}
                >
                  ${base}
                  <Text style={{ fontSize: 10 }}>.{float} </Text>
                </Text>
              </View>
              <Progress.Circle
                progress={progress}
                showsText={true}
                thickness={8}
                size={100}
                animated={true}
                style={{ alignSelf: "center", marginTop: 20 }}
              />
              <Text
                style={{
                  // backgroundColor: backgroundchange(),
                  padding: 0,
                  marginTop: 15,
                  margin: 10,
                  flex: 0,
                  alignSelf: "center",
                  fontSize: 28,
                  flexShrink: 2
                }}
              >
                {remainingLabel()}
              </Text>
              <Text
                style={{
                  // backgroundColor: backgroundchange(),
                  padding: 0,
                  marginTop: 15,
                  margin: 10,
                  flex: 0,
                  alignSelf: "center",
                  fontSize: 28,
                  flexShrink: 2
                }}
              >
                ${remaining()}
                <Text style={{ fontSize: 10 }}>.{float} </Text>
              </Text>
              <Text style={{ padding: 10, flex: 0, alignSelf: "center" }}>
                + ${Math.abs(calculatedTipLeft).toFixed(2)} tip
              </Text>
            </View>
          </ScrollView>
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
