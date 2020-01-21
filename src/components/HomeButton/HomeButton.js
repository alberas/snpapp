import React, { Component } from 'react';
import { Text } from 'react-native';
import {Button, Icon} from 'native-base';
import {connect} from 'react-redux';

class HomeButton extends Component {

    render(){
        return(
            <Button
                className="HomeButton"
                >
                <Icon name={this.props.icon}/>
                <Text>{this.props.text}</Text>
            </Button>
        );
    };
}

export default connect()(HomeButton);