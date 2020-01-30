import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

class Receita extends React.Component {
  
  render = () => {
    var id = this.props.navigation.getParam('id');
    console.log(id);
    return (
      <View style={{ flex: 1 }}>
      </View>
    );
  }
}

export default Receita;