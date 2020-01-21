import React from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image, Alert, StyleSheet, ActivityIndicator} from 'react-native';
import { Icon } from 'native-base';


class BuscaFarmacia extends React.Component{

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
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View style={{flex:1}}>
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
                                <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'powderblue', alignItems: 'center', justifyContent: 'center'}} 
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
                                <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon name="person"/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'steelblue', alignItems: 'center', justifyContent: 'center'}} >
                                    <Icon name="star-half"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        )
                    )
                    }
                </ScrollView>
            </View>
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