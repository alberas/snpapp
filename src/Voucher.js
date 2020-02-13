import React from 'react';
import {ScrollView, ActivityIndicator, View, TouchableOpacity, Image, Text} from 'react-native';
import { retornaDadosPromocao  } from './api/evento';
import { gerarVoucher  } from './api/evento';
import { connect } from 'react-redux';
import * as COLORS from './constants/colors';
import Login from './Login';
import { Card, CardItem, Left, Thumbnail, Body } from 'native-base';

var thumb = require('../assets/icons/default-avatar.jpg');
var logo = require('../assets/icons/logo_small.png');

class Voucher extends React.Component{

    state = {
        isLoading: true,
        dataSource: {}
    }
    componentDidMount = () => {
        this.loadData();
    }

    loadData = () => {
        this.setState({isLoading: true});
        retornaDadosPromocao(this.props.navigation.getParam("idEvento"))
        .then(
            x => {
                this.setState({ dataSource: x.Data, isLoading: false });
            }
        )
    }

    gerarVoucher = () => {
        idEvento = this.props.navigation.getParam("idEvento");
        idUsuario = this.props.usuario.id;

        
        gerarVoucher(idEvento, idUsuario)
        .then(
            x => {
                if(x.ErrorCode > 0){
                    alert(x.ErrorMsg);
                }else{
                    alert("Voucher gerado com sucesso:" + x.Data.Voucher);
                    this.props.navigation.navigate('Vouchers');
                }
            }
        );
        
           
    }

    teste = () => {
        
    }

    render(){
        if(this.props.usuario.id<=0){
            return (<Login navigation={this.props.navigation} previousScreen="Voucher"/>);
        }
        return (
            <View style={{flex:1}}>
                <Card style={{flex:0}}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={thumb}/>
                                <Body>
                                    <Text>{this.state.dataSource.titulo}</Text>
                                    <Text note>Valido até {this.state.dataSource.dt_validade}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={logo} style={{height: 200, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    {this.state.dataSource.descricao}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left style={{justifyContent: "center"}}>
                                <TouchableOpacity 
                                    style={{borderRadius: 15, backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR, padding: 10}}
                                    onPress={() => this.gerarVoucher()}
                                    >
                                    <Text style={{color: COLORS.BUTTON_FONT_COLOR}}>Confirmar</Text>
                                </TouchableOpacity>
                            </Left>
                        </CardItem>
                    </Card>
            </View>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Voucher);