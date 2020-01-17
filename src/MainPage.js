import React from 'react';

import * as actions from './store/actions';
import Login from './Login';
import Home from './Home';
import { View, Text } from 'react-native';


class MainPage extends React.Component{
    
    static navigationOptions = {
        title: 'MainPage',
    };
    
    render() {

        const {navigate} = this.props.navigation;

        
        return (
            navigate('Login')
        );
    }
}

  

export default MainPage;