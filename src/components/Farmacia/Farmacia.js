import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import {calculaDistancia} from '../../util/MapsUtil';

import Seta from '../../../assets/icons/send-2.svg';
import Pin from '../../../assets/icons/ic_location_on.svg';
import { connect } from 'react-redux';
import * as Google from '../../api/google';

export const Farmacia = ({obj, initialLat, initialLng, navigation}) => {
    var t = obj;
    return (
    <TouchableOpacity
        style={{padding: 10, borderBottomWidth: 1, borderBottomColor: "#F3F3F3"}}
        onPress={() => navigation.navigate("Farmacia", {place_id: t.place_id, lat: t.geometry.location.lat, long: t.geometry.location.lng})}
        >
        <View style={{flexDirection: "row"}}>
            
            <View style={{flex: 1}}>
                <Text style={{fontWeight: "bold", fontSize: 20, color: "#242424", marginBottom: 5}}>{t.name}</Text>
                <View style={{flexDirection: "row", marginBottom: 5}}>
                    <View style={style.iconBox}>
                        <Pin width={10}  height={10} style={style.icon}/>
                    </View>
                    <Text style={{color: "#616161"}}>{t.vicinity}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={style.iconBox}>
                        <Seta width={10}  height={10} style={style.icon}/>
                    </View>
                    <Text style={{color: "#616161"}}>{calculaDistancia(initialLat, initialLng, t.geometry.location.lat, t.geometry.location.lng)} m</Text>

                </View>
            </View>
        </View>
    </TouchableOpacity>
    );                        
}


const style = {
    icon:{
        marginTop: 5, 
        marginRight: 5, 
        marginBottom: 5
    },
    iconBox: {
        padding: 3,
        margin: 2, 
        borderRadius: 2, 
        justifyContent: "center", 
        alignContent: "center",
        backgroundColor: "#F3F3F3",
        width: 15,
        height: 15
    }
}

const mapStateToProps = state => {
    return {
        usuario: state.usuario
    };
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Farmacia);