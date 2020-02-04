import React from 'react';
import {View, Text, Image, TextInput, StyleSheet } from 'react-native';
import * as actions from './store/actions';
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  * as COLORS from './constants/colors'
import AppLogo from './components/AppLogo/AppLogo';


class Login extends React.Component{
    static navigationOptions = {
        title: 'Login',
        headerTitle: () => <AppLogo />,
        headerStyle: {
            backgroundColor: COLORS.HEADER_BACKGROUND_COLOR,
        },
        headerTintColor: COLORS.HEADER_FONT_COLOR,
        headerTitleStyle: {
            fontWeight: 'bold',
            color: COLORS.HEADER_FONT_COLOR
        },
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
            <View style={style.screen}>
                <Text style={{fontSize: 20, fontWeight:"bold", color: COLORS.COMPONENT_FONT_COLOR}}>Digite seus dados para acessar</Text>
                <Text style={{color: COLORS.COMPONENT_FONT_COLOR}}>{this.state.msg}</Text>
                <TextInput 
                    onChangeText={(text) => this.setState({txtLogin: text})} 
                    style={style.input} 
                    placeholder="Digite seu CPF"
                    placeholderTextColor={COLORS.COMPONENT_FONT_COLOR} />
                <TextInput 
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({txtSenha: text})} 
                    style={style.input} 
                    placeholder="Digite sua senha"
                    placeholderTextColor={COLORS.COMPONENT_FONT_COLOR} />
                <TouchableOpacity
                style={style.button}
                onPress={() => this.efetuarLogin()}>
                <Text style={{color: COLORS.COMPONENT_FONT_COLOR}}>ACESSAR</Text>
            </TouchableOpacity>
                
            </View>
        );
    };
}

style = StyleSheet.create({
    screen: {
        flex:1, 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: COLORS.SCREEN_BACKGROUND_COLOR
    },
    button: {
        borderWidth: 1, 
        borderRadius: 5, 
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
        color: COLORS.COMPONENT_FONT_COLOR,
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