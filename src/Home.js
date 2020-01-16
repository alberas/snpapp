import React from 'react';
import {View, Text, Image } from 'react-native';
import {Icon, Header, Body, Title} from 'native-base';
import HomeButton from './components/HomeButton/HomeButton';
import * as actions from './store/actions'
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity } from 'react-native';


var logo = require('../assets/icons/logo_small.png');

class Home extends React.Component{

    render(){
        return(
            <View style={{flex:1, paddingHorizontal: 20, justifyContent: "center" }}>
                    
                <TouchableOpacity
                    style={style.homeButton}
                    onPress={() => this.props.switchScreen(actions.HOME)}
                    >
                    <Image source={logo}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.homeButton}
                    onPress={() => this.props.switchScreen(actions.MEDICAMENTOS)}
                    >
                    <Icon name="list" style={style.icon}/>
                    <Text>Medicamentos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.homeButton}
                    onPress={() => this.props.switchScreen(actions.LOCAIS)}
                    >
                    <Icon name="list" style={style.icon}/>
                    <Text>Farmácias</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.homeButton}
                    onPress={() => this.props.switchScreen(actions.RECEITA_ENVIAR)}
                    >
                    <Icon name="list" style={style.icon}/>
                    <Text>Scanear receita</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.homeButton}
                    onPress={() => this.props.switchScreen(actions.PACIENTES)}
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
        currScreen: state.currentScreen
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onSwitchScreen: (actionType) => dispatch({type: actionType}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);