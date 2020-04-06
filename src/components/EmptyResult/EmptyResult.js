import React from 'react';
import { View, Text, Image } from "react-native"

const exclamationIcon = require("../../../assets/icons/exclamation.png");

export const EmptyResult = () => {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Image source={exclamationIcon}/>
            <Text style={{fontSize: 20}}>Nenhum resultado encontrado.</Text>
        </View>
    );
}