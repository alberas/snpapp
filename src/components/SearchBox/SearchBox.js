import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Image, TouchableOpacity, Alert, Dimensions, Text } from "react-native";
import * as COLORS from "../../constants/colors"
import SvgUri, { Svg, Circle, Rect } from "react-native-svg";

const iconLupa = require("../../../assets/icons/search/search.png");
const iconCamera = require("../../../assets/icons/camera/camera.png");

const getScreenWidth = () => {
    return Math.round(Dimensions.get('window').width) - 5;
}

const SearchBox = ({ navigation }) => {
    const [termoPesquisa, setTermoPesquisa] = useState("");

    useEffect(() => {
        setTermoPesquisa(termoPesquisa);
    });

    pesquisar = () => {
        if(termoPesquisa!="" && termoPesquisa.length >= 2){
            navigation.navigate('BuscaMedicamento', {termo: termoPesquisa});
        }else{
            Alert.alert("SINAPSE","Digite um termo para pesquisar o medicamento");
        }
        
    }



    return (
        <View style={{display: "flex", flex: 3, paddingLeft:10, paddingRight: 10, paddingBottom: 20, backgroundColor: COLORS.HEADER_BACKGROUND_COLOR, borderBottomRightRadius: 40}}>
            <Text style={{fontSize: 32, color: '#FFABAB'}}>Cuide</Text>
            <View style={{flexDirection: "row"}}>
                <Text style={{fontSize: 32, color: '#FFABAB'}}>da sua </Text>
                <Text style={{fontSize: 32, color: '#FFF', fontWeight: "bold"}}>SAÚDE</Text>
            </View>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 10, marginBottom: 10, justifyContent: "space-between"}}>
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
                    <TouchableOpacity onPress={() => pesquisar()} style={{justifyContent: "center", paddingRight: 5}}>
                        <Image source={iconLupa}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{alignItems: "center", justifyContent: "center", width: 50, height: 50, ...styles.borderStyle}}
                                onPress = { () => navigation.navigate('ScanSearch') }>
                    <Image  source={iconCamera} width="25" height="25" /> 
                </TouchableOpacity>                                
            </View>
            <Text style={{textAlign: "justify", color: "#F2DCD8", fontSize: 12, lineHeight: 18, width: 325}}>
                Digite o nome do medicamento e faça a programação dos horários de administração ou faça um pesquisa por reconhecimento clicando na icone da camêra.
            </Text>
            
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

export default SearchBox;