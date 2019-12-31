import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  Image,
  Modal,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { ButtonGroup, Button } from "react-native-elements";
import WaitingPage from "./WaitingPage";
import Camera from "./Camera";

export default class NewGroup extends React.Component {
  state = {
    billTotal: 0,
    index: 2,
    tipPercentage: 20,
    submit: false,
    group: [],
    viewCamera: false,
    modalVisible: false,
    uri: ""
  };

  handleSubmit = e => {
    fetch("https://evening-mountain-63500.herokuapp.com/groups", {
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        leader_id: this.props.user.id,
        bill_total: this.state.billTotal,
        group_code: this.props.code,
        tip_percentage: [10, 15, 20, 0][this.state.index]
      })
    })
      .then(response => response.json())
      .then(data => this.handleUserGroupSubmit(data));
  };

  handleUserGroupSubmit = group => {
    fetch("https://evening-mountain-63500.herokuapp.com/user_groups", {
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        user_id: this.props.user.id,
        group_id: group.id
      })
    })
      .then(response => response.json())
      .then(data => this.setState({ submit: true }));
  };

  handleTotal = num => {
    let fixednum = parseFloat(num);
    this.setState({ billTotal: fixednum });
  };

  updateIndex = selectedIndex => {
    this.setState({ index: selectedIndex });
  };

  setModalVisible(visible) {
    this.setState({ viewCamera: true, modalVisible: visible });
  }

  closeModal = () => {
    this.setState({ modalVisible: false, viewCamera: false });
  };

  handleImgURI = uri => {
    this.closeModal();
    this.setState({ uri: uri });
    this.processURI(uri);
  };

  processURI = uri => {

    console.log(uri);
    return (
      <View
        style={{
          justifyContent: "flex-start",
          alignSelf: "center",
          flex: 0.3,
          marginBottom: 15
        }}
      >
        <Image
          source={{ uri: `${this.state.uri}` }}
          style={{ height: 105, width: 60 }}
        />
      </View>
    );
  };

  render() {
    let waitingpage = (
      <WaitingPage
        code={this.props.code}
        user={this.props.user}
        index={this.state.index}
        uri={this.state.uri}
      />
    );
    if (this.state.submit === true) {
      return waitingpage;
    }

    const buttons = ["10%", "15%", "20%", "0%"];

    let tipAmt = buttons[this.state.index];
    let tipNum = tipAmt.replace("%", "");

    let tipTotal = (this.state.billTotal * tipNum) / 100;
    let billPlusTip = parseFloat(this.state.billTotal) + parseFloat(tipTotal);
    let formattedBillPlusTip = billPlusTip.toFixed(2);

    let renderNewGroup = (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <Camera
            handleImgURI={this.handleImgURI}
            closeModal={this.closeModal}
          />
        </Modal>
      </View>
    );

    if (this.state.viewCamera === true) return renderNewGroup;

    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <View
          style={{
            position: "absolute",
            left: 5,
            top: 30
          }}
        >
          <Button
            onPress={this.props.closeModal}
            type="clear"
            icon={{
              name: "clear",
              size: 30
            }}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{ justifyContent: "flex-start", flex: 1, marginTop: 100 }}
          >
            {this.processURI()}
            <View style={{ marginBottom: 30, marginTop: 20 }}>
              <Button
                onPress={() => this.setModalVisible(true)}
                title="Upload Receipt"
                type="clear"
              />

            </View>
            <View>
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
                  // value={this.state.billTotal}
                  onChangeText={this.handleTotal}
                  placeholder="Total Bill Amount"
                />
              </View>

              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={this.state.index}
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

            <View>
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
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
