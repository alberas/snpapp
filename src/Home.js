import React from 'react';
import {View, Text, Image } from 'react-native';
import {Icon, Header, Body, Title} from 'native-base';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity } from 'react-native';


var logo = require('../assets/icons/logo_small.png');

class Home extends React.Component{

    static navigationOptions = {
        title: 'Home',
    };

    render(){
        const {navigate} = this.props.navigation;
        
        return(
            <View style={{flex:1, paddingHorizontal: 20, justifyContent: "center" }}>
                    <Text>
                        Olá, {this.props.usuario.nome}
                    </Text>
                <TouchableOpacity
                    style={style.homeButton}
                    onPress={() => navigate('Home')}
                    >
                    <Image source={logo}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.homeButton}
                    onPress={() => navigate('BuscaMedicamento')}
                    >
                    <Icon name="list" style={style.icon}/>
                    <Text>Medicamentos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.homeButton}
                    onPress={() => navigate('Locais')}
                    >
                    <Icon name="list" style={style.icon}/>
                    <Text>Farmácias</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.homeButton}
                    onPress={() => navigate('Arquivo')}
                    >
                    <Icon name="list" style={style.icon}/>
                    <Text>Arquivo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.homeButton}
                    onPress={() => navigate('Scan')}
                    >
                    <Icon name="list" style={style.icon}/>
                    <Text>Scanear receita</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.homeButton}
                    onPress={() => navigate('Paciente')}
                    >
                    <Icon name="list" style={style.icon}/>
                    <Text>Pacientes</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const style = StyleSheet.create({
    homeButton:{
        padding: 10,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#DDDDDD',
        marginBottom: 10,
        flexDirection: 'row'
    },
    icon:{
        position: "absolute",
        left:5
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