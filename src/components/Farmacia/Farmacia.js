import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { Card, CardItem, Body, Icon } from "native-base";
import DefaultButton from '../DefaultButton/DefaultButton';

import {calculaDistancia} from '../../util/MapsUtil';

export const Farmacia = ({obj, initialLat, initialLng, navigation}) => {
    var t = obj;
    return (
    <Card
        style={{marginBottom: 10, padding: 5}}
        >
        <CardItem header bordered style={{flexDirection: "row"}}>
            <View style={{flex: 2}}>
                <Image source={{uri: t.icon}} style={{width: 50, height: 50}}/>
            </View>
            <View style={{flex: 8}}>
                <Text>{t.name}</Text>
                <Text>{t.vicinity}</Text>
                <Text>Dist.: {calculaDistancia(initialLat, initialLng, t.geometry.location.lat, t.geometry.location.lng)} m</Text>
            </View>
        </CardItem>
        <CardItem>
            <Body>
                <DefaultButton label="Mais informações" onPress={() => navigation.navigate("Farmacia", {place_id: t.place_id, lat: t.geometry.location.lat, long: t.geometry.location.lng})}/>
            </Body>
        </CardItem>
    </Card>
    );                        
}
