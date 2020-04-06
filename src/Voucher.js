import React from 'react';
import {View, Alert} from 'react-native';
import { retornaDadosPromocao  } from './api/evento';
import { gerarVoucher  } from './api/evento';
import { connect } from 'react-redux';
import Login from './Login';
import DescontoCard from './components/DescontoCard/DescontoCard';
import DefaultButton from './components/DefaultButton/DefaultButton';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';

var thumb = require('../assets/icons/default-avatar.jpg');

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
                    Alert.alert("Sinapse", x.ErrorMsg);
                }else{
                    Alert.alert("Sinapse", "Seu voucher foi gerado com sucesso: " + x.Data.Voucher);
                    this.props.navigation.navigate('Descontos', {activeScreen: 2});
                }
            }
        );
    }

    render(){
        const navigate = this.props.navigation;
        const obj = this.state.dataSource;
        if(this.props.usuario.id<=0){
            return (<Login navigation={navigate} previousScreen="Descontos"/>);
        }
        return (
            <BackgroundImage>
                <View style={{flex:1, marginBottom: 85}}>
                    <DescontoCard obj={obj} navigation={navigate} showButton={false}/>
                </View>
                <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 5}}>
                    <DefaultButton onPress={() => this.gerarVoucher()} label="Confirmar" fontSize="2"/>
                </View>
            </BackgroundImage>
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