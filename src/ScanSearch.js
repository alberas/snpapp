import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Alert } from "react-native";
import { Camera } from "expo-camera";
import { useSelector } from 'react-redux';
import * as Permissions from "expo-permissions";
import { imageSearch } from "./api/arquivo";

import Close from '../assets/icons/ic_close.svg';

export default function ScanSearch({ navigation }) {
  
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [idUsuario, setIdUsuario] = useState(useSelector(state => state.usuario.id));
  const [isLoading, setIsLoading] = useState(true);

  takePicture = async () => {
    if (this.camera) {
      setIsLoading(true);

      const options = { quality: 0.3, base64: true, exif: false, skipProcessing: true };
      const data = await this.camera.takePictureAsync(options);
      
      imageSearch(data.base64)
      .then(
        resp => {
          if(resp==undefined || resp.Data==undefined){
            throw "Erro";
          }
          let param = "";
          resp.Data.map(t=>{
              if(param!=""){ 
                param = param + ",";
              }
              param = param + t.ids
            }      

          );
          
          navigation.navigate('ListaMedicamentos',{ids: param});
        }
      ).catch(
        error => {
          Alert.alert("SINAPSE", "Falha ao carregegar resultado.",
            [
              {text: "OK"}
            ]
          );
          console.log(error);
        }
      );
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
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => (this.camera = ref)}>
          <View style={{flex:1,justifyContent: "flex-end", flexDirection: "row", margin: 10, marginTop: 30}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Close width={20} height={20}/>
              </TouchableOpacity>
          </View>
          <View style={{flex:1, borderRadius: 5, borderColor:"#FFFFFF", borderWidth: 1, backgroundColor: "#0000001A", margin:10, padding: 10}}>
            <Text style={{fontSize: 15, color: "#FFFFFF"}}>Aponte a camera para o nome do medicamento e pressione pesquisar</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
              borderWidth: 1, 
              borderColor: '#fff',
              borderStyle: "dashed",
              margin: 20,
              flex: 5
            }}
          >
         
        </View>
        <View style={{ flex: 3 }}>
          { !isLoading ? 
            <View style={{padding: 10 }}>
              <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <TouchableOpacity style={{...styles.capture, backgroundColor: "#F25C5C"}} onPress={this.takePicture.bind(this)} >
                  <Text>PESQUISAR</Text>
                </TouchableOpacity>
                {/*
                <TouchableOpacity  style={{...styles.capture, backgroundColor: "#0AA9FB"}}>
                  <Text>SALVAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.capture, backgroundColor: "#616161"}}>
                  <Text>COMPARTILHAR</Text>
                </TouchableOpacity>
                */}
              </View>
              <View style={{borderRadius: 5, borderColor:"#FFFFFF", borderWidth: 1, backgroundColor: "#0000001A", marginTop:20, padding: 10}}>
                <Text style={{fontSize: 15, color: "#FFFFFF"}}>Aponte a camera para o nome do medicamento e pressione pesquisar</Text>
              </View>
            </View>
          :
          <ActivityIndicator/>
          }
        </View>
      </Camera>
    </View>
  );
}

ScanSearch.navigationOptions = ({navigation}) => ({
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

