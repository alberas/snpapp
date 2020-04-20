import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import DefaultButton from '../DefaultButton/DefaultButton';

import {calculaDistancia} from '../../util/MapsUtil';

export const Farmacia = ({obj, initialLat, initialLng, navigation}) => {
    var t = obj;
    return (
    <View
        style={{padding: 10, borderBottomWidth: 1, borderBottomColor: "#F3F3F3"}}
        onPress={() => navigation.navigate("Farmacia", {place_id: t.place_id, lat: t.geometry.location.lat, long: t.geometry.location.lng})}
        >
        <View style={{flexDirection: "row"}}>
            <View style={{flex: 2}}>
                <Image source={{uri: t.icon}} style={{width: 50, height: 50}}/>
            </View>
            <View style={{flex: 8}}>
                <Text style={{fontWeight: "bold", fontSize: 20}}>{t.name}</Text>
                <View style={{flexDirection: "row"}}>
                    <Image source={require('../../../assets/icons/ic_send-2.png')} style={{width: 20, height: 20}}/>
                    <Text>{t.vicinity}</Text>

                </View>
                <View style={{flexDirection: "row"}}>
                    <Image source={require('../../../assets/icons/ic_location_on-2.png')} style={{width: 20, height: 20}}/>
                    <Text>{calculaDistancia(initialLat, initialLng, t.geometry.location.lat, t.geometry.location.lng)} m</Text>
                </View>
            </View>
        </View>
    </View>
    );                        
}
