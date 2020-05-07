import React from 'react';
import { View, Text, Image } from "react-native"

import EmptyResultSvg from '../../../assets/icons/empty_result.svg';


export const EmptyResult = () => {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <EmptyResultSvg width={100} height={100}/>
            <Text style={{fontSize: 25, fontWeight: "bold", margin: 10}}>Desculpe!</Text>
            <Text style={{fontSize: 20}}>Nenhum resultado encontrado.</Text>
        </View>
    );
}