import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from "react-native";
import * as COLORS from "../../constants/colors"

const iconLupa = require("../../../assets/icons/ico0.png");


const SearchBox = ({ navigation }) => {
    const [termoPesquisa, setTermoPesquisa] = useState("");

    useEffect(() => {
        setTermoPesquisa(termoPesquisa);
    })

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                        onChangeText = {
                            (text) => setTermoPesquisa(text)
                        }
                        value = { termoPesquisa }
                        placeholder = "Pesquisar medicamento" >
            </TextInput> 
            <TouchableOpacity onPress = {
                        () => navigation.navigate('BuscaMedicamento', {termo: termoPesquisa})
                    }>
                <Image 
                    source={iconLupa}
                    style = {styles.icon}
                    
                    />
            </TouchableOpacity>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.COMPONENT_BACKGROUND_COLOR,
        borderRadius: 5,
        width: 1,
        flex: 1,
        margin: 1,
        flexDirection: "row",
        alignItems:"center",
        borderWidth: 1,
        borderColor: COLORS.BUTTON_BORDER_COLOR
    },
    input: {
        fontSize: 20,
        flex: 5,
        height: 50
    },
    icon: {
        margin:1,
        width: 30,
        height: 30,
        
    }
});

export default SearchBox;