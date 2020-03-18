import React from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Card, CardItem } from "native-base";

var zapIcon = require('../../../assets/icons/i_whatsapp.png');

export const Farmacia = ({obj}) => {
    var t = obj;
    return (
    <Card key={t.id}
        style={{backgroundColor: "#DDDDDD", marginBottom: 10, padding: 5}}
        >
        <CardItem header bordered>
            <Text>{t.name}</Text>
            <Text>{t.vicinity}</Text>
            <Text>Dist.: {this.calculaDistancia(this.state.lat, this.state.lng,t.geometry.location.lat, t.geometry.location.lng)} m</Text>
        </CardItem>
        <CardItem>
            <Body>
                <TouchableOpacity style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} 
                        onPress={() => {
                            this.props.navigation.navigate('Local',{
                                lat1: this.state.lat,
                                lng1: this.state.lng,
                                lat2: t.geometry.location.lat,
                                lng2: t.geometry.location.lng,
                            });
                        }}>
                    <Icon name="navigate"/>
                </TouchableOpacity>
                <TouchableOpacity style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={() => Linking.openURL('http://api.whatsapp.com/send?phone=5561')}>
                    <Image source={zapIcon} style={{width: 20, height:  20}}/>
                </TouchableOpacity>
            </Body>
        </CardItem>
    </Card>
    );                        
}