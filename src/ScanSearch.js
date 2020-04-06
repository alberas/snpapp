import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Alert } from "react-native";
import { Camera } from "expo-camera";
import { useSelector } from 'react-redux';
import * as Permissions from "expo-permissions";
import { Icon, Title } from "native-base";
import { imageSearch } from "./api/arquivo";

import Loader from "./Loader";

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
      <Camera style={{ flex: 8 }} type={type} ref={ref => (this.camera = ref)}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
            borderWidth: 1, 
            borderColor: '#fff' 
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center"
            }}
            onPress={() => {
              (async () => {
                const { base64, ...image } = await this.camera.takePictureAsync(
                  {
                    quality: 1,
                    base64: true,
                    exif: true
                  }
                );
              })();
            }}
          >
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center'}}>
        { !isLoading ? 
        <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Icon name='paper' />
        </TouchableOpacity>
        :
        <ActivityIndicator/>
        }
      </View>
    </View>
  );
}

ScanSearch.navigationOptions = () => ({
    title: "Reconhecimento de texto"
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
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});

