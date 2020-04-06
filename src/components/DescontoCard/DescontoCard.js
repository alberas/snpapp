import React from 'react';
import { Card, CardItem, Thumbnail, View, Text, Body } from 'native-base';
import DefaultButton from '../DefaultButton/DefaultButton';

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
            <CardItem>
                <Body><Text>{obj.dt_utilizacao}</Text></Body>
            </CardItem>
            );
    }
}
const showButton = (showButton, obj, navigate) => {
    if(showButton){
        return (
            <CardItem>
                <Body><DefaultButton onPress={() => navigate('Voucher', {idEvento: obj.id})} label="Gerar Voucher"/></Body>
            </CardItem>);
    }
}


export default function DescontoCard(props){
    const t = props.obj;
    const navigate = props.navigation;
    const sb = props.showButton==undefined ? true : props.showButton;
    return (
        <Card style={{flex:0}}>
            <CardItem header bordered>
                <Thumbnail source={thumb} square style={{marginRight: 5}}/>
                <View>
                    <Text style={{marginBottom: 20}}>{t.id} {t.titulo}</Text>
                    <Text note  style={{alignSelf: "flex-end"}}>Valido até {t.dt_validade}</Text>
                </View>
            </CardItem>
            <CardItem>
                <View style={{flex: 1, height: 200, backgroundColor: "lightgrey", justifyContent: "center", alignContent: "center"}}>
                    <Text style={{textAlign: "center", color: "#fff"}}>
                        {t.descricao}
                    </Text>
                </View>
            </CardItem>
            {showVoucher(t)}
            {showDtUtilizacao(t)}
            {showButton(sb, t, navigate)}
        </Card>
    )
    
}
