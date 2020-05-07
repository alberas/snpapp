import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Close from '../../../assets/icons/ic_close.svg';
import Camera from '../../../assets/icons/camera.svg';




export const SearchInput = ({navigation}) => {
    const [termoPesquisa, setTermoPesquisa] = useState(navigation.getParam("termo"));

    useEffect(() => {
        setTermoPesquisa(termoPesquisa);
    });

    pesquisar = () => {
        if(termoPesquisa!="" && termoPesquisa.length >= 2){
            console.log(termoPesquisa);
            navigation.navigate('BuscaMedicamento', {termo: termoPesquisa});
        }else{
            alert("Digite um termo para pesquisar o medicamento");
        }
        
    }

    return(
        <View style={{flex: 1, flexDirection: "row", justifyContent: "center", margin: 10, justifyContent: "space-between", height: 50 }}>
            <TouchableOpacity style={{borderWidth:1, borderColor: "#FFEEEE", padding: 10, borderRadius: 5}} onPress={()=>navigation.navigate('Home')}>
                <Image source={require('../../../assets/icons/ic_keyboard_arrow_left/ic_keyboard_arrow_left_48px.png')}/>
            </TouchableOpacity>
            <View style={{...styles.borderStyle, flexDirection: "row", justifyContent: "center"}}>
                <TextInput style={{width: 270, paddingLeft: 15, fontSize: 20, color: "#FFF"}}
                            placeholderTextColor="#F2A0A0"
                            onChangeText = {
                                (text) => setTermoPesquisa(text)
                            }
                            onBlur={() => pesquisar()}
                            value = { termoPesquisa }
                            placeholder = "Pesquise aqui" >
                </TextInput> 
                <TouchableOpacity onPress={() => setTermoPesquisa("")} style={{justifyContent: "center", paddingRight: 5}}>
                    <Close width={20} height={20} style={{alignSelf: "center" }}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{alignItems: "center", justifyContent: "center", width: 50, height: 50, ...styles.borderStyle}}
                            onPress = { () => navigation.navigate('ScanSearch') }>
                <Camera width={20} height={20} /> 
            </TouchableOpacity>                                
        </View>
    );
}

const styles = StyleSheet.create({
    borderStyle: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#F2A0A0",
        backgroundColor: "#F2A0A061"
    },
});