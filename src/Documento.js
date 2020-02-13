import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from "react-native";
import { upload } from "./api/arquivo";
import * as COLORS from "./constants/colors";

export default function Documento({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const bytArquivo = navigation.getParam("bytArquivo");
    const arquivo = "data:image/jpg;base64," + bytArquivo;
    const idUsuario = navigation.getParam("idUsuario");

    sendPicture = () => {
      setLoading(true);
      upload(idUsuario, bytArquivo).then(
        x => {
          console.log(x);
          setLoading(false);
        }
      )
    }

    if(isLoading){
      return (
        <View><ActivityIndicator></ActivityIndicator></View>
        );
    }

    return (

        <View style={{flex:1, padding: 0}}>
            <View style={{flex:1}}>
              <Image source={{uri: arquivo}}  style={{flex: 1, margin:0}} resizeMode="contain"/>
            </View>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity onPress={this.sendPicture.bind(this)} style={styles.send}>
                  <Text style={{fontSize: 25}}>ENVIAR</Text>
              </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
  send: {
    flex: 0,
    backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR,
    borderRadius: 15,
    borderWidth: 1,
    padding: 15,
    alignSelf: "center",
    margin: 20
  }
});

