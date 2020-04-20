import React from 'react';
import { Card, CardItem, Thumbnail, View, Text, Body } from 'native-base';
import DefaultButton from '../DefaultButton/DefaultButton';
import {  } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const thumb = require('../../../assets/icons/default-avatar.jpg');


const showVoucher = (obj) => {
    if(obj.voucher!=null){
        return (
            <CardItem>
                <Body><Text style={{fontWeight: "bold"}}>{obj.voucher}</Text></Body>
            </CardItem>
            );
    }
}

const showDtUtilizacao = (obj) => {
    if(obj.dt_utilizacao!=null){
        return (
            <View>
                <Text>{obj.dt_utilizacao}</Text>
            </View>
            );
    }
}
const showButton = (showButton, obj, navigate) => {
    if(showButton){
        return (
            <View>
                <DefaultButton onPress={() => navigate('Voucher', {idEvento: obj.id})} label="Gerar Voucher"/>
            </View>);
    }
}


export default function DescontoCard(props){
    const t = props.obj;
    const navigate = props.navigation;
    const sb = props.showButton==undefined ? true : props.showButton;
    return (
        <View style={{flex:1, margin: 10}}>
                
            <View style={{height: 200, flex: 1,borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,backgroundColor: "purple"}}>
            
                <LinearGradient
                    colors={['rgba(200,200,200,0.5)', 'transparent']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 200,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    >
                    <Text style={{fontSize: 30, textAlign: "justify", color: "orange"}}>{t.descricao}</Text>
                </LinearGradient>
            </View>
            <View style={{flex: 1, flexDirection: "row",  borderBottomRightRadius:15, borderBottomLeftRadius: 15, borderWidth: 1, borderColor: "#F3F3F3", borderTopWidth:0}}>
                <View style={{width:60, height: 60, borderWidth: 1, margin: 10, borderRadius: 10, borderColor: "#F3F3F3"}}>
                </View>
                <View style={{justifyContent: "space-between", height: 60, marginTop: 10}}>
                    <Text style={{color: "#F25C5C", fontSize: 25, fontWeight: "bold"}}>{t.titulo}</Text>
                    <Text style={{color: "#616161", fontSize: 12}}>Valido até {t.dt_validade}</Text>
                </View>
            </View>
          
        </View>
    )
    
}
