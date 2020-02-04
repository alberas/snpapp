import React, { Component } from 'react';
import { Text } from 'react-native';
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as COLORS from '../../constants/colors';
import { Icon } from 'native-base';

class DefaultButton extends Component {

    showIcon = () => {
        if(this.props.icon){
            return <Icon name={this.props.icon}/>
        }
    }
    render(){
        return(
            <TouchableOpacity
                style={{borderWidth: 1, borderRadius: 5, backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR,  alignItems: "center", justifyContent: "center", padding: 10}}
                >
                {this.showIcon}
                <Text style={{color: COLORS.COMPONENT_FONT_COLOR}}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    };
}

export default connect()(DefaultButton);