import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Dimensions } from "react-native";
import { upload } from "./api/arquivo";
import * as COLORS from "./constants/colors";
import Loader from "./Loader";

import Close from '../assets/icons/ic_close.svg';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import BackgroundImage from "./components/BackgroundImage/BackgroundImage";
import { Accordion } from "native-base";

const w = Math.round(Dimensions.get('window').width);
const h = Math.round(Dimensions.get('window').height);


export default function Documento({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const bytArquivo = navigation.getParam("bytArquivo");
    const arquivo = "data:image/jpg;base64," + bytArquivo;
    const idUsuario = navigation.getParam("idUsuario");
    const placeId = navigation.getParam("place_id");

    sendPicture = () => {
      setLoading(true);
      
    }

    if(isLoading){
      return (
        <Loader/>
        );
    }

    return (
    <BackgroundImage>
      <ScrollView style={{flex: 1}}>
            <View style={{flex:1,justifyContent: "flex-end", flexDirection: "row", margin: 10, marginTop: 30}}>
                <TouchableOpacity onPress={() => navigation.navigate('Orcamento', {place_id: placeId})}>
                    <Close width={20} height={20}/>
                </TouchableOpacity>
            </View>
            <View style={{borderWidth: 1, borderRadius: 5, padding: 10, margin: 10}}>
              <Text>Como deseja receber orçamento?</Text>
              <View>
                <TouchableOpacity><Text>SMS</Text></TouchableOpacity>
                <TextInput style={{width: w - 40, borderWidth: 1, height: 30}}></TextInput>
                <TouchableOpacity><Text>E-mail</Text></TouchableOpacity>
                <TextInput style={{width: w - 40, borderWidth: 1, height: 30}}></TextInput>
                <TouchableOpacity><Text>Whatsapp</Text></TouchableOpacity>
                <TextInput style={{width: w - 40, borderWidth: 1, height: 30}}></TextInput>
              </View>
            </View>
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <Image source={{uri: arquivo}}  style={{width: diminuirProporcional(w), height: diminuirProporcional(h)}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity onPress={this.sendPicture.bind(this)} style={styles.send}>
                    <Text>ENVIAR</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
      </BackgroundImage>
    );
}

const diminuirProporcional = (input) => {
  const porcentagemAReduzir = 30;
  return input * ((100 - porcentagemAReduzir) / 100);  
}

Documento.navigationOptions = ({navigation}) => {
  return {
      headerShown: false
  }
}

const styles = StyleSheet.create({
  send: {
    backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR,
    borderRadius: 5,
    padding: 15,
    alignSelf: "center",
    margin: 20
  }
});

