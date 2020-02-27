import React from "react";
import { View, Text } from "react-native";
import { Component } from "react";

import * as COLORS from '../../constants/colors';

class SectionTitle extends Component{

    render(){
        return (
            <View style={{backgroundColor: COLORS.TITLE_BACKGROUND_COLOR, padding: 5, margin:5 }}>
                <Text style={{color: COLORS.TITLE_FONT_COLOR, fontSize: 25}}>{this.props.texto}</Text>
            </View>
        );
    };
    
}

export default SectionTitle;