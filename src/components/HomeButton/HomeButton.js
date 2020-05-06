import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';




class HomeButton extends Component {

    renderImage = (image) => {
        return(<Image source={image} width="70" height="70"/>);
    }
    

    render(){
        const {navigate} = this.props.navigation;


        return(
            <TouchableOpacity
                onPress={() => navigate(this.props.telaDestino)}
                style={{margin: 10, flexDirection: "row", borderColor:"#F3F3F3", borderWidth:1, borderRadius: 10}}
                >
                <View style={{height: 90, width: 90, borderColor:"#F3F3F3", borderRightWidth:1, borderBottomRightRadius: 10, justifyContent: "center", alignItems: "center"}}>
                    {this.renderImage(this.props.image)}
                </View>
                <View style={{flex: 8, borderColor:"#F3F3F3", padding: 10 }}>
                    <Text style={{fontSize: 15, fontWeight: "bold"}}>{this.props.rotulo}</Text>
                    <Text style={{fontSize: 12, lineHeight: 20, marginTop: 8}}>{this.props.descricao}</Text>
                </View>
            </TouchableOpacity>
        );
    };
}


export default HomeButton;