import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import {Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as COLORS from '../../constants/colors';


class HomeButton extends Component {

    renderImage = (image) => {
        return(<Image source={image} style={{width: 70, height: 70, flex: 2 }}/>);
    }

    renderIcon = () => {
        return(<Icon name="list" style={{position: "absolute", left:5, flex: 2 }}/>);
    }

    configure = (image) => {
        if(image != ""){
            return this.renderImage(image);
        }else{
            return this.renderIcon()  
        }
    }

    render(){
        const {navigate} = this.props.navigation;

        return(
            <TouchableOpacity
                onPress={() => navigate(this.props.telaDestino)}
                style={{marginBottom: 10, flexDirection: "row", backgroundColor: "rgba(0,0,0,0.3)", padding: 7}}
                >
                {this.configure(this.props.image)}
                <View style={{flex: 8}}>
                    <Text style={{fontSize: 20, color: COLORS.BUTTON_FONT_COLOR}}>{this.props.rotulo}</Text>
                    <Text style={{fontSize: 15, color: "#000"}}>{this.props.descricao}</Text>
                </View>
            </TouchableOpacity>
        );
    };
}


export default HomeButton;