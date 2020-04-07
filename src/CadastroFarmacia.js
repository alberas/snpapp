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
import * as pj from "./api/pj";

class CadastroFarmacia extends React.Component{

    static navigationOptions = {
        title: 'Farmácia'
        
    };

    state = {
        msg: "",
        loading: true,
        placeId: "",
        txtNome: "",
        txtEndereco: "",
        txtFone: "",
        placeExists: false,
    }

    
    
    componentDidMount(){
        const navigation = this.props.navigation;
        const placeId = navigation.getParam("place_id");
        const txtNome = navigation.getParam("txt_nome");
        const txtEndereco = navigation.getParam("txt_endereco");
        pj.buscaDados(placeId).then(
            resp => {
                if(resp.Data != null){
                    var obj = resp.Data;
                    this.setState({placeId: placeId, txtNome: obj.nome, txtEndereco: obj.endereco, txtFone: obj.fone, placeExists: true, loading: false});
                }else{
                    this.setState({placeId: placeId, txtNome: txtNome, txtEndereco: txtEndereco, loading: false});
                }
            }
        )
        return {};
    }

    cadastrar = () => {

        const placeId = this.state.placeId;
        const txtNome = this.state.txtNome;
        const txtEndereco = this.state.txtEndereco;
        const txtFone = this.state.txtFone;
        
        var method = "inserir";
        if(this.state.placeExists){
            method = "atualizar";
        }
        pj.inserirAtualizar(placeId, method, txtNome, txtEndereco, txtFone).then(
            resp => {
                if(resp.ErrorCode != 0){
                    Alert.alert("SINAPSE", resp.ErrorMsg);
                }else{
                    Alert.alert("SINAPSE", "Dados gravados com sucesso");
                }
            }
        );

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
                            <Text>Cadastrar/Atualizar Farmácia</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <TextInput 
                                    onChangeText={(text) => this.setState({txtNome: text})} 
                                    style={style.input} 
                                    placeholder="Nome"
                                    value={this.state.txtNome}
                                    />
                                <TextInput 
                                    onChangeText={(text) => this.setState({txtEndereco: text})} 
                                    style={style.input} 
                                    placeholder="Endereço"
                                    value={this.state.txtEndereco}
                                    />
                                <TextInput 
                                    onChangeText={(text) => this.setState({txtFone: text})} 
                                    style={style.input} 
                                    placeholder="Whatsapp"
                                    value={this.state.txtFone}
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

export default connect(mapStateToProps, mapDispatchToProps)(CadastroFarmacia);