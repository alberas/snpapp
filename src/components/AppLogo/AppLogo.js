import React, { Component } from 'react';
import { Image } from 'react-native';

var logo = require('../../../assets/icons/logo_small.png');

class AppLogo extends Component {

  
    render(){
        return(
            <Image source={logo}/>
        );
    };
}

export default AppLogo;