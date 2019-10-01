import React from "react";
import { Text, View, TouchableOpacity, Button, Image } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  async snapPhoto() {       
    console.log('Button Pressed');
    if (this.camera) {
       console.log('Taking photo');
       const options = { quality: 1, base64: true, fixOrientation: true, 
       exif: true};
       await this.camera.takePictureAsync(options).then(photo => {
          photo.exif.Orientation = 1;            
           console.log(photo);            
           });     
     }
    }


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>

          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {
    this.camera = ref}}>
          <View style={{flex: 1, marginTop: 30}}>
          <Button
            onPress={this.props.closeModal}
            type="clear"
            title="x"
          />
          </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              {/* <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              ></TouchableOpacity> */}
              <TouchableOpacity style={{width:60, height:60, borderRadius:30, backgroundColor:"white", alignSelf: "flex-end", marginLeft: 160, marginBottom: 20}} onPress={this.snapPhoto.bind(this)}/>
 
            
            </View>
          </Camera>
        </View>
      );
    }
  }
}
