import React from 'react';
import {View, Text, Image, TextInput } from 'react-native';
import * as actions from './store/actions';
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

var logo = require('../assets/icons/logo_small.png');

class Login extends React.Component{
    static navigationOptions = {
        title: 'Login',
        headerTitle: (
            <Image source={logo}/>
        ),
    };

    state = {
        msg: "",
        txtLogin: "",
        txtSenha: ""
    }

    efetuarLogin = () => {
        const {navigate} = this.props.navigation;

        this.setState({...this.state,msg:""});

        const txtLogin = this.state.txtLogin;
        const txtSenha = this.state.txtSenha;


        fetch('http://snpmed.com.br/api/login?txtLogin='+ txtLogin +'&txtSenha=' + txtSenha)
        .then((response) => response.json())
        .then((responseJson) => {

            if(parseInt(responseJson.Data.id) > 0){
                this.props.loginUser(responseJson.Data);     
                navigate('Home');
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
                <Text style={{fontSize: 20, fontWeight:"bold"}}>Digite seus dados para acessar</Text>
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
                <TouchableOpacity
                    onPress={this.efetuarLogin}
                    >
                    <Text>ACESSAR</Text>
                </TouchableOpacity>
                
            </View>
        );
    };
}

const mapStateToProps = state => {
    return {
        usuario: state.usuario
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginUser:  (usuario) => dispatch({type: actions.LOGIN, usuario: usuario})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);