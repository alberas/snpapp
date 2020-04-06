import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { Card, CardItem, Body, Icon } from "native-base";

var zapIcon = require('../../../assets/icons/i_whatsapp.png');

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
                <Text>Dist.: {calculaDistancia(initialLat, initialLng,t.geometry.location.lat, t.geometry.location.lng)} m</Text>
            </View>
        </CardItem>
        <CardItem>
            <Body style={{flexDirection: "row"}}>
                <TouchableOpacity style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} 
                        onPress={() => {
                            navigation.navigate('Local',{
                                lat1: initialLat,
                                lng1: initialLng,
                                lat2: t.geometry.location.lat,
                                lng2: t.geometry.location.lng,
                            });
                        }}>
                    <Icon name="navigate"/>
                </TouchableOpacity>
                <TouchableOpacity style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} 
                    onPress={() => {
                        navigation.navigate('Farmacia', {
                            place_id: t.place_id
                            });
                        }}>
                    <Image source={zapIcon} style={{width: 20, height:  20}}/>
                </TouchableOpacity>
            </Body>
        </CardItem>
    </Card>
    );                        
}

const calculaDistancia = (lat1, lng1, lat2, lng2) => {
    "use strict";
    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
        R = 6371,
        dLat = deg2rad(lat2 - lat1),
        dLng = deg2rad(lng1 - lng2),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(lat1))
            * Math.cos(deg2rad(lat1))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return ((R * c *1000).toFixed());

}