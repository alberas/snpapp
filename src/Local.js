import React from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image, Alert, StyleSheet} from 'react-native';
import {Header, Icon, Input, Button, Right, Left, Body, Title} from 'native-base';
import Loader from  './Loader';
import Paciente from './Paciente';
import axios from 'axios';
import Farmacia from './Farmacia';
import SearchButton from './components/SearchButton/SearchButton';
import Cabecalho from './Cabecalho';
import MapView from 'react-native-maps';

class Local extends React.Component{

    render(){
        console.log(this.props.navigation.getParam('lat2'));
        return (
            <MapView        
                style={{flex: 1}}        
                region={{          
                    latitude: this.props.navigation.getParam('lat2'),          
                    longitude: this.props.navigation.getParam('lng2'),          
                    latitudeDelta: 0.0922,          
                    longitudeDelta: 0.0421        
                    }}        
                    showsUserLocation={true}      
                    />
        );
    }
}



export default Local;