import React, { Component } from "react";
import NewGroup from "./NewGroup";
import {
  Image,
  ScrollView,
  Keyboard,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import WaitingPage from "./WaitingPage";

export default class Homepage extends React.Component {
  state = {
    code: "",
    buttonOpacity: 0,
    user: this.props.user,
    submitted: false,
    groups: [],
    createNew: false,
    modalVisible: false
  };

  componentDidMount() {
    fetch("https://evening-mountain-63500.herokuapp.com/groups")
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          groups: data
        })
      );
  }

  

  setModalVisible(visible) {
    this.setState({ createNew: true, modalVisible: visible });
  }

  closeModal = () => {
    this.setState({ modalVisible: false, createNew: false });
  };

  handleCodeChange = code => {
    this.setState({ code: code });
    {
      if (this.state.code.length >= 4) {
        this.setState({ buttonOpacity: 100 });
      } else if (this.state.code.length <= 5)
        this.setState({ buttonOpacity: 0 });
    }
  };

  // Validates if group exists. If true, renders waiting page
  handleSubmit = () => {
    let codes = this.state.groups.map(group => group.group_code);
    if (codes.includes(this.state.code)) {
      this.setState({ submitted: true });
    } else {
      alert("Invalid code");
      this.setState({ code: "" });
    }
  };

  codeGenerator(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  newGrouphandler = () => {
    this.setState({ createNew: true });
  };

  render() {
    let newRandomCode = this.codeGenerator(5);

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
          <NewGroup
            code={newRandomCode}
            newGrouphandler={this.newGrouphandler}
            user={this.state.user}
            closeModal={this.closeModal}
          />
        </Modal>
      </View>
    );

    if (this.state.createNew === true) return renderNewGroup;

    let waitingpage = (
      <WaitingPage
        code={this.state.code}
        user={this.state.user}
        groups={this.state.groups}
      />
    );

    if (this.state.submitted === true) return waitingpage;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.logincomp}>
          <Text
            style={{
              fontSize: 40,
              marginBottom: 50,

              color: "#545656"
            }}
          >
            Enter Your Code{" "}
          </Text>
          <TextInput
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={5}
            value={this.state.email}
            onChangeText={this.handleCodeChange}
            style={{
              textAlign: "center",
              width: 200,
              height: 60,
              fontSize: 60,
              letterSpacing: 25
            }}
            placeholder="C9QNX"
          />

          <Button
            buttonStyle={styles.button}
            onPress={() => this.setModalVisible(true)}
            title="Generate New Code"
            type="clear"
          />
          {/* <Button
          buttonStyle={styles.button}
          onPress={() => this.logoutHandler}
          title="Log Out"
          type="clear"
        /> */}

          <View style={{ margin: 7 }} />
          <TouchableOpacity onPress={this.handleSubmit}>
            <Image
              style={{
                opacity: this.state.buttonOpacity,
                marginTop: 50,
                justifyContent: "center"
              }}
              source={require("../assets/round_arrow_forward_ios_black_18dp.png")}
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 30
  },

  logincomp: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20
  }
});
