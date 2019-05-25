import React from 'react';
import { StackNavigator,TabNavigator } from 'react-navigation' 
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { ImagePicker } from 'expo';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.row}>
          <Button onPress={this.pickImage}>Gallery</Button>
          <Button onPress={this.startEditing}>Edit</Button>
          <Button onPress={this.takeImage}>Camera</Button>
        </View>
      </View>
    );
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  //startEditing(){ //doesn't work
    //this.props.navigation.navigate("Editor.js", {
    //item: this.image,
    //});
    //window.on('Editor.js');
  //}

  takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const Button = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: 'white',
  },
  row: { flexDirection: 'row' },
  image: { width: 340, height: 500, backgroundColor: '#D0C6C6' },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: '#372E2E',
  },
  container: {
    flex: 1,
    backgroundColor: '#F3EFEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
