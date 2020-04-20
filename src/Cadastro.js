import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView }  from 'react-native-keyboard-aware-scrollview';
import  * as COLORS from './constants/colors'
import Loader from './Loader';
import { cadastrar } from './api/usuario';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import DefaultButton from './components/DefaultButton/DefaultButton';
import { Picker } from 'native-base';

class Cadastro extends React.Component{

   
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
        txtNome: "",
        txtEmail: "",
        txtSexo: "",
        dtNascimento: "",
        txtSenha1: "",
        txtSenha2: "",
        loading: false
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

                    <View style={{display: "flex", flex: 3, paddingLeft:10, paddingRight: 10, paddingBottom: 20, backgroundColor: COLORS.HEADER_BACKGROUND_COLOR, borderBottomRightRadius: 40}}>
                        <Text style={{fontSize: 30, color: '#FFABAB'}}>Olá</Text>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{fontSize: 30, color: '#FFF', fontWeight: "bold"}}>REGISTRE-SE</Text>
                            <Text style={{fontSize: 30, color: '#FFABAB'}}> para inciar</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 30, margin: 10}}>
                        <TextInput 
                            onChangeText={(text) => this.setState({txtNome: text})} 
                            style={style.input} 
                            placeholder="Nome"
                            />
                        <TextInput 
                            onChangeText={(text) => this.setState({txtEmail: text})} 
                            style={style.input} 
                            placeholder="E-mail"
                            />
                        <View style={{flexDirection: "row", height: 70}}>
                            <TextInput 
                                onChangeText={(text) => this.setState({txtEmail: text})} 
                                style={{...style.input, flex: 5}} 
                                placeholder="Data de nascimento"
                                />
                                <View style={{flex: 5, borderWidth: 1, borderColor: "#F3F3F3", borderRadius: 5}}>
                                    <Picker 
                                        placeholder="Sexo"
                                        style={{height: 30}}
                                        mode="dropdown"
                                        selectedValue={this.state.txtSexo}
                                        onValueChange={(val)=>this.setState({txtSexo: val})}>
                                        <Picker.Item label="Masculino" value="M" />
                                        <Picker.Item label="Feminino" value="F" />
                                    </Picker>
                                </View>
                        </View>
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

                    </View>
                    <View style={{flexDirection: "row", margin: 15, justifyContent: "center"}}>
                        <Text style={{color:"#616161"}}>Já tem cadastro?</Text>
                        <Text style={{fontWeight: "bold"}} onPress={()=>navigate('Login')}> Autentique-se</Text>
                    </View>
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



export default Cadastro;