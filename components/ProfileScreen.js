import React from "react";
import { View, Text, ListView, ScrollView } from "react-native";
import { List, Input, Button, Card, ListItem } from "react-native-elements";
import Homepage from "./Homepage";
import WaitingPage from "./WaitingPage";

export default class ProfileScreen extends React.Component {
  state = {
    groups: [],
    viewGroup: false
  };

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
    let mygroupIDs = this.state.groups.map(group => group);
  

    handlePress = code => {
      this.setState({viewGroup: true, code: code})
      return 
    };

    let homepage = <Homepage user={this.props.user} profileCode={this.state.code}/>;

    if (this.state.viewGroup === true){
      return homepage
    }


    return (
      <View style={{ flex: 0, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View>
            <Text style={{ fontSize: 35 }}> Previous Transactions</Text>
          </View>
        </View>

        <View style={{ margin: 20, height: 600 }}>
          <View style={{ margin: 10, flex: 4 }}>
            <View style={{flexDirection:"row", alignItems: "center", justifyContent: "space-between", marginBottom: 10}}> 
            <Text style={{alignSelf:"center", fontSize: 18}}> Group Code</Text> 
            <Text style={{fontSize: 18}}> Amount Paid</Text>
            </View>
            <ScrollView>
              {mygroupIDs.map(code => (
                <ListItem
                  key={code.group.group_code}
                  title={code.group.group_code}
                  titleStyle={{ textAlign: "left", justifyContent: "center" }}
                  style={{ width: 300 }}
                  rightTitle={code.user_payment_amt.toString()}
                  onPress={() => handlePress(code.group.group_code)}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
