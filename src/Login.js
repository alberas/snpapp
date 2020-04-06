import React from 'react';
import {connect} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView }  from 'react-native-keyboard-aware-scrollview';
import * as actions from './store/actions';
import  * as COLORS from './constants/colors'
import Loader from './Loader';
import { efetuarLogin } from './api/login';
import { cadastrar } from './api/usuario';
import { CardItem, Card, Body } from 'native-base';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import DefaultButton from './components/DefaultButton/DefaultButton';

class Login extends React.Component{

    static navigationOptions = {
        title: 'Login'
        
    };

    state = {
        msg: "",
        txtLogin: "",
        txtSenha: "",
        txtNome: "",
        txtEmail: "",
        txtCpf: "",
        txtSenha1: "",
        txtSenha2: "",
        loading: false
    }

    
    
    efetuarLogin = (navigate) => {

        const txtLogin = this.state.txtLogin;
        const txtSenha = this.state.txtSenha;

        efetuarLogin(txtLogin, txtSenha).then(
            (resp) => {
                if(parseInt(resp.Data.id) > 0){
                    this.props.loginUser(resp.Data); 
                    if(this.props.previousScreen)   {
                        navigate(this.props.previousScreen);    
                    }else{
                        navigate('Home');
                    }
                }else{
                    Alert.alert("SINAPSE", error, [
                        {"text": "Dados incorretos"}
                    ]);
                }
            }
        );

        
        
    }

    cadastrar = () => {
        const {navigation} = this.props.navigation;

        const txtNome = this.state.txtNome;
        const txtEmail = this.state.txtEmail;
        const txtCpf = this.state.txttxtCpfNome;
        const txtSenha1 = this.state.txtSenha1;
        const txtSenha2 = this.state.txtSenha2;

        cadastrar(txtNome, txtEmail, txtCpf, txtSenha1, txtSenha2).then(
            (resp) => {
                console.log(`\r\n\r\n` + resp.Data.id + `\r\n\r\n`);
                if(parseInt(resp.Data.id) > 0){
                    this.props.loginUser(resp.Data); 
                    if(this.props.previousScreen)   {
                        navigation.navigate(this.props.previousScreen);    
                    }else{
                        navigation.navigate('Home');
                    }
                }else{
                    Alert.alert("SINAPSE", error, [
                        {"text": "Dados incorretos"}
                    ]);
                }
            }
        ).catch((error) =>{
            Alert.alert("SINAPSE", "Favor informar CPF e senha.", [
                {"text": "OK"}
            ]);
        });

        
        
    }

    render(){
        const {navigate} = this.props.navigation;

        if(this.state.loading){
            return (<Loader/>);
        }
        return(
            <BackgroundImage>
                <KeyboardAwareScrollView style={style.screen}>
                    <Card>
                        <CardItem header bordered>
                            <Text>Login</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <TextInput 
                                    onChangeText={(text) => this.setState({txtLogin: text})} 
                                    style={style.input} 
                                    placeholder="Digite seu CPF"
                                    />
                                <TextInput 
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({txtSenha: text})} 
                                    style={style.input} 
                                    placeholder="Digite sua senha"
                                    />
                                <DefaultButton label="Acessar" onPress={() => this.efetuarLogin(navigate)}/>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header bordered>
                            <Text>Cadastro</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <TextInput 
                                    onChangeText={(text) => this.setState({txtNome: text})} 
                                    style={style.input} 
                                    placeholder="Digite seu Nome"
                                    />
                                <TextInput 
                                    onChangeText={(text) => this.setState({txtEmail: text})} 
                                    style={style.input} 
                                    placeholder="Digite seu e-mail"
                                    />
                                <TextInput 
                                    onChangeText={(text) => this.setState({txtCpf: text})} 
                                    style={style.input} 
                                    placeholder="Digite seu CPF"
                                    />
                                <TextInput 
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({txtSenha1: text})} 
                                    style={style.input} 
                                    placeholder="Digite sua senha"
                                    />
                                <TextInput 
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({txtSenha2: text})} 
                                    style={style.input} 
                                    placeholder="Confirme sua senha"
                                    />
                                
                                <DefaultButton label="Enviar" onPress={() => this.cadastrar()}/>

                            </Body>
                        </CardItem>
                    </Card>
                </KeyboardAwareScrollView>
            </BackgroundImage>
        );
    };
}

const style = StyleSheet.create({
    screen: {
        flex:1, 
        backgroundColor: COLORS.SCREEN_BACKGROUND_COLOR,
    },
    box:{
        padding: 5,
        margin: 5
    },
    button: {
        backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR,  
        alignItems: "center", 
        justifyContent: "center", 
        padding: 10
    },  
    input: {
        height: 50, 
        width: 250, 
        borderColor: COLORS.COMPONENT_BORDER_COLOR, 
        borderWidth:1, 
        marginBottom: 5, 
        marginTop: 5,
        borderBottomWidth: 1
    }
});

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