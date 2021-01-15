import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Dimensions, Alert } from "react-native";
import { solicitarOrcamento } from "./api/orcamento";
import * as COLORS from "./constants/colors";
import Loader from "./Loader";

import Close from '../assets/icons/ic_close.svg';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import BackgroundImage from "./components/BackgroundImage/BackgroundImage";

const w = Math.round(Dimensions.get('window').width);
const h = Math.round(Dimensions.get('window').height);

export default function Documento({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [activeScreen, setActiveScreen] = useState(1);
    const bytArquivo = navigation.getParam("byt_arquivo");
    const arquivo = "data:image/jpg;base64," + bytArquivo;
    const idUsuario = navigation.getParam("idUsuario");
    const placeId = navigation.getParam("place_id");

    const [sms, setSms] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    

    sendPicture = async () => {
      const {navigate, getParam} = navigation;
      setLoading(true);

      var tipo = "";
      var contato = "";
      if(sms!=""){
        tipo = "sms";
        contato = sms;
      }
      if(email!=""){
        tipo = "email";
        contato = email;
      }
      if(whatsapp!=""){
        tipo = "whatsapp";
        contato = whatsapp;
      }


      solicitarOrcamento(tipo, contato,  bytArquivo, placeId)
      .then((resp) => {
        if(resp.ErrorCode==0){
          Alert.alert("SINAPSE", "Sua solicitação foi enviada. Aguarde o contato da farmácia.");
          navigate("Home");
        }else{
          setLoading(false);
          Alert.alert("SINAPSE", resp.ErrorMsg);
        }
      }).catch(err => {
        setLoading(false);
        Alert.alert("SINAPSE", err);
      })
      
    }


    changeSelection = (p1) => {
      setActiveScreen(p1);
      setSms("");
      setEmail("");
      setWhatsapp("");
    }

    retornaSelecaoCampo = (valor) => {
   
      var inputProps = {
        flex: 1,
        height: 40, 
        padding: 5,
        borderRadius: 5, 
        fontSize: 20
      }

      if(valor==activeScreen){
          return {
              ...inputProps,
              borderColor: "gray",
              borderBottomWidth: 1
            }
      }else{
        return {
            ...inputProps,
            borderWidth:0,
          }
          
      }
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
            <Text style={{margin: 10}}>Como deseja receber orçamento?</Text>
            <View style={{borderWidth: 1, borderRadius: 5, padding: 10, margin: 10}}>
              <View>
              <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 5}}>
                  <TextInput style={retornaSelecaoCampo(1)} placeholder="Digite seu número de telefone" 
                    onFocus={() => changeSelection(1)}
                    value={sms}
                    onChangeText={(val) => setSms(val)}
                    ></TextInput>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 5}}>
                    <TextInput style={retornaSelecaoCampo(2)} placeholder="Digite seu E-mail" 
                    onFocus={() => changeSelection(2)}
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    ></TextInput>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 5}}>
                  <TextInput style={retornaSelecaoCampo(3)} placeholder="Digite seu número do Whatsapp" 
                  onFocus={() => changeSelection(3)}
                  value={whatsapp}
                  onChangeText={(val) => setWhatsapp(val)}></TextInput>
                </View>
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
  const porcentagemAReduzir = 40;
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

