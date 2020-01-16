import React, { Component } from 'react';
import { Text } from 'react-native';
import {Button, Icon} from 'native-base';
import {connect} from 'react-redux';

class SearchButton extends Component {

    render(){
        return(
            <Button
                className="SearchButton"
                >
                <Icon name={this.props.icon}/>
                <Text>{this.props.text}</Text>
            </Button>
        );
    };
}

export default connect()(SearchButton);