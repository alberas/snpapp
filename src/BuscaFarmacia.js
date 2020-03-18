import React from 'react';
import {ScrollView, View, Text, TouchableOpacity, Alert, StyleSheet, Image, Linking} from 'react-native';
import { Icon } from 'native-base';
import Loader from './Loader';
import AppLogo from './components/AppLogo/AppLogo';
import  * as colors from './constants/colors'
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import {buscaFarmaciasProximas} from './api/google';
import { Farmacia } from './components/Farmacia/Farmacia';
import { EmptyResult } from './components/EmptyResult/EmptyResult';



class BuscaFarmacia extends React.Component{

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Buscar farmácias',
            headerTransparent: true,
            headerTitle: () => <AppLogo/>,
            headerLeft: () => {
                return (<Icon name="arrow-back" onPress={() => navigation.goBack()} style={{margin: 5}}/>)
            },
            headerStyle: {
                backgroundColor: colors.HEADER_BACKGROUND_COLOR,
            },
            headerTintColor: colors.HEADER_FONT_COLOR,
            headerTitleStyle: {
                fontWeight: 'bold',
                color: colors.HEADER_FONT_COLOR
            },
        }
    };

    constructor(props){
        super(props);
        this.state = { 
            dataSource: [],
            isLoading: true,
            lat: "-15.7567308",
            lng: "-47.8888723"
        }
    }
    
    componentDidMount(){
        var self = this;
        navigator.geolocation.getCurrentPosition(
            position => {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;

                this.setState({...this.state, lat: lat, lng: lng});

                buscaFarmaciasProximas(lat, lng).then(
                    responseJson => {
                        self.setState({dataSource: responseJson.results});
                        self.setState({isLoading: false});
                    }
                )
                .catch(function(error){
                    console.log(error);
                });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        
        return {};
    }

   
    
    calculaDistancia = (lat1, lng1, lat2, lng2) => {
        "use strict";
        var deg2rad = function (deg) { return deg * (Math.PI / 180); },
            R = 6371,
            dLat = deg2rad(lat2 - lat1),
            dLng = deg2rad(lng1 - lng2),
            a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(deg2rad(lat1))
                * Math.cos(deg2rad(lat1))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return ((R * c *1000).toFixed());

    }
    
    
    render(){
        if(this.state.isLoading){
            return(
                <Loader />
            )
        }

        return (
            <BackgroundImage>
                {this.state.dataSource.length > 0 ? 
                <ScrollView>
                    {
                        this.state.dataSource.map(t=>(
                            <Farmacia obj={t}/>
                            )
                        )
                    }
                </ScrollView>
                    :
                    <EmptyResult/>
                }
            </BackgroundImage>
        );
    }
}

const style = StyleSheet.create({
    button:{
        padding: 10,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#DDDDDD',
        marginBottom: 10,
        flexDirection: 'row',
        
    },
    icon:{
        position: "absolute",
        left:5, 
    },
    text:{
        fontSize: 15
    }
});


export default BuscaFarmacia;