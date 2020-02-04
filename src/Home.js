import React from 'react';
import {View, Text, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity } from 'react-native';
import  * as colors from './constants/colors'
import HomeButton from './components/HomeButton/HomeButton';
import AppLogo from './components/AppLogo/AppLogo';
import { Icon } from 'native-base';


class Home extends React.Component{

    static navigationOptions = {
        title: 'Home',
        headerTitle: () => <AppLogo/>,
        headerStyle: {
            backgroundColor: colors.HEADER_BACKGROUND_COLOR,
        },
        headerTintColor: colors.HEADER_FONT_COLOR,
        headerTitleStyle: {
            fontWeight: 'bold',
            color: colors.HEADER_FONT_COLOR
        },
    };
    
    state = {
        termo: ""
    }

    saudacao = () => {
        if(this.props.usuario.id>0){
            return(
                <Text style={{color: colors.SCREEN_FONT_COLOR, margin: 30, textAlign: "center", fontSize: 20, fontWeight: "bold"}}>
                    Olá, {this.props.usuario.nome}
                </Text>
            );
        }
    }

    funcionalidadesRestritas = () => {
        if(this.props.usuario.id>0){
            return (
                <View>
                    <HomeButton rotulo="Arquivo" navigation={this.props.navigation} color="#FFC125" telaDestino="Arquivo"/>
                    <HomeButton rotulo="Pacientes" navigation={this.props.navigation} color="#8A2BE2" telaDestino="BuscaPaciente"/>
                </View>
            );
        }
    }

    render(){
        const {navigate} = this.props.navigation;
        
        return(
            <View style={{flex:1, backgroundColor: colors.SCREEN_BACKGROUND_COLOR }}>
                <View style={{flexDirection: 'row', margin: 10, borderWidth: 1, borderRadius: 10, padding: 10}}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(text)=>this.setState({termo: text})}
                        value={this.state.termo}
                        placeholder="Pesquisar medicamento"
                        >
                    </TextInput>
                    <Icon name="search" style={styles.icon}  onPress={() => navigate('BuscaMedicamento',{termo: this.state.termo})}/>                       
                </View>  

                {this.saudacao()}
                <View style={{alignItems: 'stretch'}}>
                    
                    <HomeButton rotulo="Farmácias" navigation={this.props.navigation} color="#CD5555" telaDestino="Locais"/>
                    <HomeButton rotulo="Scanear receita" navigation={this.props.navigation} color="#9370DB" telaDestino="Scan"/>
                    <HomeButton rotulo="Scanear Código de barras" navigation={this.props.navigation} color="#B0E0E6" telaDestino="Scan2"/>

                    {this.funcionalidadesRestritas()}

                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    
    inputStyle:{
        flex: 9,
        height: 40,
        borderColor: '#fff',
        borderWidth: 1
    },
    icon: {
        flex: 1
    }
  });

const mapStateToProps = state => {
    return {
        usuario: state.usuario
    };
};


const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);