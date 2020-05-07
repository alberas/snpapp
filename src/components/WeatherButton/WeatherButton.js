import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

import Cloud from '../../../assets/icons/cloud.svg';

export default function WeatherButton(props){

    return (

        <View style={{borderRadius: 5, borderWidth: 1, borderColor: "#FFEEEE", justifyContent: "center", alignItems: "center", padding: 5, width:80, height: 110}}>
            <Cloud width={25} height={25}/>
            <Text style={{color: "#616161B3", fontSize:11}}>{props.label}</Text>
        </View>
    )
}