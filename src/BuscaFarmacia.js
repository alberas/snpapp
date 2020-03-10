import React from 'react';
import {ScrollView, View, Text, TouchableOpacity, Alert, StyleSheet, Image, Linking} from 'react-native';
import { Icon } from 'native-base';
import Loader from './Loader';
import AppLogo from './components/AppLogo/AppLogo';
import  * as colors from './constants/colors'
import BackgroundImage from './components/BackgroundImage/BackgroundImage';

var zapIcon = require('../assets/icons/i_whatsapp.png');

class BuscaFarmacia extends React.Component{

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Buscar farmácias',
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
                fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius=500&type=drugstore&key=AIzaSyBVYmeDU_ygKnSUse2B0BKpnws_MdlW34w")
                .then((response) => response.json())
                .then((responseJson) => {
                    self.setState({dataSource: responseJson.results});
                    self.setState({isLoading: false});
                })
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
                <ScrollView>
                    {
                    this.state.dataSource.map(t=>(
                        <View key={t.id}
                            style={{backgroundColor: "#DDDDDD", marginBottom: 10, padding: 5}}
                            >
                            <View style={{flex: 2}}>
                                <Text>{t.name}</Text>
                                <Text>{t.vicinity}</Text>
                                <Text>Dist.: {this.calculaDistancia(this.state.lat, this.state.lng,t.geometry.location.lat, t.geometry.location.lng)} m</Text>
                            </View>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <TouchableOpacity style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} 
                                        onPress={() => {
                                            this.props.navigation.navigate('Local',{
                                                lat1: this.state.lat,
                                                lng1: this.state.lng,
                                                lat2: t.geometry.location.lat,
                                                lng2: t.geometry.location.lng,
                                            });
                                        }}>
                                    <Icon name="navigate"/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={() => Linking.openURL('http://api.whatsapp.com/send?phone=5561')}>
                                    <Image source={zapIcon} style={{width: 20, height:  20}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        )
                    )
                    }
                </ScrollView>
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