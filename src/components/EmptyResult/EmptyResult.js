import React from 'react';
import { View, Text } from "react-native"
import { Icon } from "native-base";

export const EmptyResult = () => {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Icon type="FontAwesome" name="exclamation-triangle"/>
            <Text style={{fontSize: 20}}>Nenhum resultado encontrado.</Text>
        </View>
    );
}