import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import * as COLORS from "../../constants/colors"

const iconLupa = require("../../../assets/icons/ico0.png");
const iconBarras = require("../../../assets/icons/ico2.png");
const iconScan = require("../../../assets/icons/ico1.png");

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
        <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
            <View style={styles.container}>
                <View style={{flex: 9}}>
                    <TextInput style={styles.input}
                                onChangeText = {
                                    (text) => setTermoPesquisa(text)
                                }
                                onBlur={() => pesquisar()}
                                value = { termoPesquisa }
                                placeholder = "Pesquisar medicamento" >
                    </TextInput> 
                </View>
                <TouchableOpacity onPress={() => pesquisar()} style={{flex: 1}}>
                    <Image source={iconLupa} style = {styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center", height: 40}}>
                <TouchableOpacity onPress = { () => navigation.navigate('ScanSearch') }>
                    <Image  source={iconBarras} style = { styles.icon2 } /> 
                </TouchableOpacity>                                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.BUTTON_BORDER_COLOR,
        backgroundColor: COLORS.COMPONENT_BACKGROUND_COLOR,
        flexDirection: "row",
        flex: 8,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        fontSize: 25,
        textAlign: "center",
    },
    icon: {
        margin:1,
        width: 25,
        height: 25,
    },

    icon2: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.BUTTON_BORDER_COLOR,
        width: 40,
        height: 40,

    }
});

export default SearchBox;