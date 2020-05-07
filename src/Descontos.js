import React from 'react';
import {ScrollView, Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { retornaPromocoes } from './api/evento';
import { Icon} from 'native-base';
import * as COLORS from './constants/colors';
import Loader from './Loader';
import { EmptyResult } from './components/EmptyResult/EmptyResult';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';

import Vouchers from './Vouchers';

import { connect } from 'react-redux';
import Promocoes from './Promocoes';



class Descontos extends React.Component{

    static navigationOptions =({navigation}) => {
        return {
            headerStyle: {
                backgroundColor: "#FFF",
                height: 80,
                shadowColor: 'transparent',
                borderBottomWidth: 0
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: "#F25C5C",
                fontSize: 25
            },
            headerTitle: "Descontos & Promoções",
            headerLeft: ({navigation}) => (
                <TouchableOpacity style={{borderWidth:1, borderColor: "#FFEEEE", padding: 10, borderRadius: 5, margin: 5}} onPress={()=>navigation.navigate('Home')}>
                    <Image source={require('../assets/icons/ic_keyboard_arrow_left/ic_keyboard_arrow_left_48px.png')}/>
                </TouchableOpacity>
            )
        }
    }
    constructor(props){
        super(props);
        this.state = { 
            activeScreen: 1
        }
    }

    componentDidMount = () => {
        if(this.props.navigation.getParam("activeScreen")!=undefined){
            this.setState({activeScreen: this.props.navigation.getParam("activeScreen")})
        }
    }
    
    renderActiveScreen = (navigate) => {
        
        if(this.state.activeScreen==1){
            return (<Promocoes navigation={navigate}/>);
        }else{
            if(this.props.usuario!=undefined){
                return (<Vouchers navigation={navigate} usuario={this.props.usuario}/>)
            }else{
                navigate("Login", {previousScreen: "Descontos"});
            }
        }
    }


    retornaSelecaoAba = (valor) => {
        var topButton = {
            borderRadius:5,
            margin: 1,
            padding: 10,  
            flex: 1,
            justifyContent:"center", 
            alignItems: "center"
            
        }
        if(valor==this.state.activeScreen){
            return {
                ...topButton,
                backgroundColor: "#FFF",
                borderWidth: 1,
                borderColor: "#F25C5C",
            }
        }else{
            return {
                ...topButton,
                borderWidth: 0,
                backgroundColor: "#F25C5C",
            }
            
        }
    }
    
    retornaCorTextoAbaSelecionada = (valor) => {
        if(valor==this.state.activeScreen){
            return { color: "#F25C5C", fontSize: 20 }
        }else{
            return { color:  "#fff", fontSize: 20 }
        }
    }

    render(){
        const {navigate} = this.props.navigation;
        
        if(this.state.isLoading){
            return(<Loader/>);
        }
        return (
            <BackgroundImage>
                <View style={{flexDirection:"row", margin: 10, justifyContent: "space-around"}}>
                    <TouchableOpacity 
                        style={this.retornaSelecaoAba(1)}
                        onPress={() => this.setState({activeScreen: 1})}>
                        <Text style={this.retornaCorTextoAbaSelecionada(1)}>Promoções disponíveis</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={this.retornaSelecaoAba(2)} 
                        onPress={() => this.setState({activeScreen: 2})}>
                        <Text style={this.retornaCorTextoAbaSelecionada(2)}>Meus Vouchers</Text>
                    </TouchableOpacity>
                </View>
                { this.renderActiveScreen(navigate) }
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

export default connect(mapStateToProps, mapDispatchToProps)(Descontos);