import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { useSelector } from 'react-redux';
import * as Permissions from "expo-permissions";
import { imageSearch } from "./api/arquivo";

import Close from '../assets/icons/ic_close.svg';

const w = Math.round(Dimensions.get('window').width);
const h = Math.round(Dimensions.get('window').height);

export default function Orcamento({ navigation }) {
  
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [idUsuario, setIdUsuario] = useState(useSelector(state => state.usuario.id));
  const [isLoading, setIsLoading] = useState(true);

  takePicture = async () => {
    const {navigate, getParam} = navigation;

    if (this.camera) {
      setIsLoading(true);

      const options = { quality: 0.3, base64: true, exif: false, skipProcessing: false };
      const data = await this.camera.takePictureAsync(options);
      
      navigation.navigate('Documento', {bytArquivo: data.base64, place_id:  getParam("place_id")});
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === "granted");
      setIsLoading(false);
    })();
  }, []);
  
  

  if (hasPermission === null) {
    return (<View><Text>Sem acesso à camera</Text></View>);
  }
  if (hasPermission === false) {
    return (<View><Text>Sem acesso à camera</Text></View>);
  }
  return (
    <View style={{ flex: 1 }}>
    
      <Camera style={{ flex: 1 }} type={type} ref={ref => (this.camera = ref)}>
          <View style={{flex:1,justifyContent: "flex-end", flexDirection: "row", margin: 10, marginTop: 30}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Close width={20} height={20}/>
              </TouchableOpacity>
          </View>
          <View style={{flex:1, borderRadius: 5, borderColor:"#FFFFFF", borderWidth: 1, backgroundColor: "#0000001A", marginLeft:10, marginRight: 10, marginBottom: 10, padding: 10}}>
            <Text style={{fontSize: 15, color: "#FFFFFF"}}>Aponte a camêra para a receita e tente enquadra-la no quadro abaixo.</Text>
          </View>
            
            <View
              style={{
                backgroundColor: "transparent",
                flexDirection: "row",
                borderWidth: 1, 
                borderColor: '#fff',
                borderStyle: "dashed",
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10,
                flex: 7, 
                justifyContent: "center",
                alignItems: "center"
              }}
              >
              {!isLoading ? 
                <View/>
                :
                <ActivityIndicator/>
              }
          </View>
        <View style={{ flex: 1 }}>
          { !isLoading ? 
              <View style={{flexDirection: "row", justifyContent: "center"}}>
                <TouchableOpacity style={{...styles.capture, backgroundColor: "#616161"}} onPress={this.takePicture.bind(this)} >
                  <Text>ENVIAR</Text>
                </TouchableOpacity>
              </View>
          :
          <ActivityIndicator/>
          }
        </View>
      </Camera>
    </View>
  );
}

Orcamento.navigationOptions = ({navigation}) => ({
    headerShown: false
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    borderRadius: 5,
    padding: 15
  }
});