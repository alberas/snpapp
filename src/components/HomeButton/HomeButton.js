import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import {Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

class HomeButton extends Component {

    
    render(){
        const {navigate} = this.props.navigation;

        return(
            <TouchableOpacity
                style={homeButton(this.props.color)}
                onPress={() => navigate(this.props.telaDestino)}
                >
                <Icon name="list" style={{position: "absolute", left:5, color: this.props.color}}/>
                <Text style={{color: this.props.color, fontSize: 20}}>{this.props.rotulo}</Text>
            </TouchableOpacity>
        );
    };
}





const homeButton = (p_color) => {

    return{
        padding: 10,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#FFF',
        marginBottom: 10,
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: p_color,
        borderWidth: 1,
        
    }
}


export default HomeButton;