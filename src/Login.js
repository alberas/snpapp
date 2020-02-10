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
                if(this.props.previousScreen)   {
                    navigate(this.props.previousScreen);    
                }else{
                    navigate('Home');
                }
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
                <View style={style.box}>
                    <Text style={{fontSize: 20, fontWeight:"bold"}}>Digite seus dados para acessar</Text>
                    <Text>{this.state.msg}</Text>
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
                        <TouchableOpacity
                        style={style.button}
                        onPress={() => this.efetuarLogin()}>
                        <Text>ACESSAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
}

style = StyleSheet.create({
    screen: {
        flex:1, 
        backgroundColor: COLORS.SCREEN_BACKGROUND_COLOR
    },
    box:{
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        margin: 10
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
        marginTop: 5
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