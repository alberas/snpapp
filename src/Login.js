import React from 'react';
import {connect} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView }  from 'react-native-keyboard-aware-scrollview';
import * as actions from './store/actions';
import  * as COLORS from './constants/colors'
import Loader from './Loader';
import { efetuarLogin } from './api/login';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import DefaultButton from './components/DefaultButton/DefaultButton';

class Login extends React.Component{

    static navigationOptions = {
        title: '',
        headerStyle: {
            backgroundColor: COLORS.HEADER_BACKGROUND_COLOR,
            height: 50,
            shadowColor: 'transparent',
            borderBottomWidth: 0
        },
        headerLeft: () => null
        
    };

    state = {
        msg: "",
        txtLogin: "",
        txtSenha: "",
        loading: false
    }
    
    efetuarLogin = async (goBack)  => {

        const txtLogin = this.state.txtLogin;
        const txtSenha = this.state.txtSenha;

        if(txtLogin!="" && txtSenha!=""){
            await efetuarLogin(txtLogin, txtSenha).then(
                (resp) => {
                    if(resp.Data!= null && parseInt(resp.Data.id) > 0){
                        this.props.loginUser(resp.Data);
                        goBack();
                    }else{
                        this.setState({msg: "E-mail ou senha incorretos."});
                    }
                }
            );
        }
    }

    render(){
        const {navigate, goBack} = this.props.navigation;

        if(this.state.loading){
            return (<Loader/>);
        }
        return(
            <BackgroundImage>
                <KeyboardAwareScrollView>
                    <View>
                        <TouchableOpacity style={{borderWidth:1, borderColor: "#FFEEEE", padding: 10, borderRadius: 5, position: "absolute", top: 5, left: 10, zIndex: 1}} onPress={()=>goBack()}>
                            <Image source={require('../assets/icons/ic_keyboard_arrow_left/ic_keyboard_arrow_left_48px.png')}/>
                        </TouchableOpacity>
                        <Image source={require('../assets/icons/mask_group/Mask_Group_1.png')}/>
                        <View style={{ position: "absolute", left: 15, bottom: 15}}>
                            <Text style={{fontSize: 35, color:"#FFABAB"}}>Bem-vindo</Text>
                            <View>
                                <Text style={{fontSize: 30, color:"#FFF"}}>Identifique-se para</Text>
                                <Text style={{fontSize: 30, color:"#FFF"}}>CONTINUAR</Text>
                            </View>
                        </View>
                    </View>
                    {
                    this.state.msg!="" 
                    ? 
                    <Text style={{padding: 10, color: "red", textAlign: "center"}}>{this.state.msg}</Text>
                    : 
                    <View/>
                    }
                    <View style={{marginTop: 30, margin: 10}}>
                        <TextInput 
                            onFocus={() => this.setState({msg: ""})}
                            onChangeText={(text) => this.setState({txtLogin: text})} 
                            style={style.input} 
                            placeholder="Digite seu e-mail"
                            placeholderTextColor="#616161B3"
                            />
                        <TextInput 
                            onFocus={() => this.setState({msg: ""})}
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({txtSenha: text})} 
                            style={style.input} 
                            placeholder="Digite sua senha"
                            placeholderTextColor="#616161B3"
                            />
                        <Text style={{textAlign: "right", color: "#616161", marginBottom: 30}}>Lembrar senha</Text>
                        <DefaultButton label="Acessar" onPress={() => this.efetuarLogin(goBack)}/>
                    </View>
                    <View style={{flexDirection: "row", margin: 15, justifyContent: "center"}}>
                        <Text style={{color:"#616161"}}>Ainda Não tem cadastro?</Text>
                        <Text style={{fontWeight: "bold"}} onPress={()=>navigate('Cadastro')}> Registre-se</Text>
                    </View>
                </KeyboardAwareScrollView>
            </BackgroundImage>
        );
    };
}

const style = StyleSheet.create({
   
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
        flex: 1,
        borderColor: "#F3F3F3", 
        borderWidth:1, 
        marginBottom: 15,
        borderBottomWidth: 1,
        padding: 20, 
        borderRadius: 5,
        fontSize: 15
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