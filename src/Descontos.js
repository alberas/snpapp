import React from 'react';
import {ScrollView, ActivityIndicator, View, TouchableOpacity, Image} from 'react-native';
import { retornaPromocoes } from './api/evento';
import { Card, CardItem, Left, Thumbnail, Body, Text} from 'native-base';
import * as COLORS from './constants/colors';

var thumb = require('../assets/icons/default-avatar.jpg');
var logo = require('../assets/icons/logo_small.png');

class Descontos extends React.Component{

    state = {
        isLoading: true,
        promocoes: []
    }
    componentDidMount = () => {
        this.loadData();
    }

    loadData = () => {
        this.setState({isLoading: true});
        retornaPromocoes().then(
            x => {
                this.setState({ promocoes: x.Data, isLoading: false });
            }
        )
    }

    renderData = () => {
        if(this.state.isLoading){
            return (<ActivityIndicator/>);
        }

        if(this.state.promocoes!==null){
            
            return (
                this.state.promocoes.map(t=>(
                    <Card style={{flex:0}} key={t.id}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={thumb}/>
                                <Body>
                                    <Text>{t.titulo}</Text>
                                    <Text note>Valido até {t.dt_validade}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={logo} style={{height: 200, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    {t.descricao}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left style={{justifyContent: "center"}}>
                                <TouchableOpacity 
                                    style={{borderRadius: 15, backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR, padding: 10}}
                                    onPress={() => this.props.navigation.navigate('Voucher', {idEvento: t.id})}
                                    >
                                    <Text style={{color: COLORS.BUTTON_FONT_COLOR}}>Gerar Voucher</Text>
                                </TouchableOpacity>
                            </Left>
                        </CardItem>
                    </Card>
                    )
                )
                
            )

        }else{
            return (
                <Text>Nenhuma promoção encontrada</Text>);
        }
    }

    render(){
        return (
            <View style={{flex:1}}>
                <View style={{flexDirection:"row", justifyContent: "space-between"}}>
                    <TouchableOpacity 
                        style={{backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR, padding: 10, width: 190, alignItems: "center"}} 
                        onPress={() => this.loadData()}>
                        <Text style={{fontSize: 20, color: COLORS.BUTTON_FONT_COLOR}}>Atualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR, padding: 10, width: 190, alignItems: "center"}} 
                        onPress={() => this.props.navigation.navigate('Vouchers')}>
                        <Text style={{fontSize: 20, color: COLORS.BUTTON_FONT_COLOR}}>Meus Vouchers</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{flex:1}}>
                {this.renderData()}
                </ScrollView>
            </View>
        );
    }
}


export default Descontos;