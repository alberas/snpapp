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

    static navigationOptions = {
        title: 'Buscar farmácias',
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
                
                buscaFarmaciasProximas(this.state.lat, this.state.lng).then(
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
                                <Farmacia key={t.place_id} obj={t} initialLat={this.state.lat} initialLng={this.state.lng} navigation={this.props.navigation}/>
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