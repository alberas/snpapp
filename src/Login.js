import React from 'react';
import {View, Text, Image } from 'react-native';
import {Container, Content, Header, Button, Form, Input, Label, Item} from 'native-base';

var logo = require('../assets/icons/logo_small.png');

class Login extends React.Component{


    render(){
        return(
            <View style={{flex:1, alignItems: "center", justifyContent: "center" }}>
                <Image source={logo} style={{marginBottom:10}}></Image>
            
                <Item inlineLabel>
                    <Label>Digite seu CPF</Label>
                    <Input value=""/>
                </Item>
                
                <Item inlineLabel>
                    <Label>Digite sua senha</Label>
                    <Input  value=""/>
                </Item>
                <Button
                    style={{justifyContent:"center", marginTop: 10, width: 100}}
                    onPress={()=>this.props.switchScreen('search')}
                    >
                    <Text>Entrar</Text>
                </Button>
            </View>
                         
        );
    };
}

export default Login;