import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import {Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';


class HomeButton extends Component {

    renderImage = (image) => {
        return(<Image source={image} style={{width: 130, height: 130 }}/>);
    }

    renderIcon = () => {
        return(<Icon name="list" style={{position: "absolute", left:5}}/>);
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
                style={{margin: 0, height: 220, justifyContent:"center", alignItems: "center"}}
                >
                {this.configure(this.props.image)}
                <Text style={{fontSize: 25, width: 150, textAlign: "center"}}>{this.props.rotulo}</Text>
            </TouchableOpacity>
        );
    };
}


export default HomeButton;