import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Camera } from "expo-camera";
import { useSelector } from 'react-redux';
import * as Permissions from "expo-permissions";
import { Icon } from "native-base";
import { upload } from "./api/arquivo";
import Login from "./Login";
import Loader from "./Loader";

export default function Scan({ navigation }) {
  
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [idUsuario, setIdUsuario] = useState(useSelector(state => state.usuario.id));
  const [isLoading, setIsLoading] = useState(true);

  takePicture = async () => {
    if (this.camera) {
      
      const options = { quality: 0.3, base64: true, exif: false, skipProcessing: true };
      const data = await this.camera.takePictureAsync(options);
      navigation.navigate('Documento', {idUsuario: idUsuario, bytArquivo: data.base64 });
      
      /*
      upload(idUsuario, data.base64).then(
            x => {
              console.log(x);
              setIsLoading(false);
            }
      );
      */
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === "granted");
      setIsLoading(false);
    })();
  }, []);


  if(idUsuario<=0){
    return (<Login navigation={navigation}/>);
  }
  
  if(isLoading){
    return (<Loader/>);
  }
  

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => (this.camera = ref)}>
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
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Icon name='paper' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

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

