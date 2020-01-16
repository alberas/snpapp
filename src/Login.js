import React from 'react';
import {View, Text, Image, TextInput } from 'react-native';
import {Container, Content, Header, Button, Form, Input, Label, Item} from 'native-base';
import Home from './Home';

var logo = require('../assets/icons/logo_small.png');

class Login extends React.Component{

    state = {
        msg: "",
        txtLogin: "",
        txtSenha: "",
        usuario: []
    }

    efetuarLogin = () => {
        this.setState({...this.state,msg:""});

        const usuario = [];
        const txtLogin = this.state.txtLogin;
        const txtSenha = this.state.txtSenha;


        fetch('http://snpmed.com.br/api/login?txtLogin='+ txtLogin +'&txtSenha=' + txtSenha)
        .then((response) => response.json())
        .then((responseJson) => {

            if(parseInt(responseJson.Data.id) > 0){
                return (<Home/>);
            }else{
                this.setState({...this.state, msg: "Dados incorretos" });
            }

        })
        .catch((error) =>{
            console.error(error);
        });

        
    }

    
    render(){
        return(
            <View style={{flex:1, alignItems: "center", justifyContent: "center" }}>
                <Image source={logo} style={{marginBottom:10}}></Image>
                <Text>{this.state.msg}</Text>
                <TextInput 
                    onChangeText={(text) => this.setState({txtLogin: text})} 
                    style={{height: 50, width: 200, borderColor: 'green', borderWidth:1}} 
                    placeholder="Digite seu CPF"/>
                <TextInput 
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({txtSenha: text})} 
                    style={{height: 50, width: 200, borderColor: 'green', borderWidth:1}} 
                    placeholder="Digite sua senha" />
                <Button
                    onPress={this.efetuarLogin}
                    >
                    <Text>ACESSAR</Text>
                </Button>
                
            </View>
                         
        );
    };
}

export default Login;