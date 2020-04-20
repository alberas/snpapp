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
import HeaderLeftButton from './components/HeaderLeftButton/HeaderLeftButton';



class BuscaFarmacia extends React.Component{

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#FFF",
            height: 80,
            shadowColor: 'transparent',
            borderBottomWidth: 0
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: "#F25C5C",
            fontSize: 25
        },
        headerTitle: "Farmácias proximas",
        headerLeft: (navigation) => (
            <HeaderLeftButton  navigation={navigation}/>
        )
    }

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
                    <View>
                        <View style={{padding: 10, borderRadius: 5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#F3F3F3"}}>
                            <View style={{backgroundColor: "#FFEEEE", width: 30, height: 30, alignItems: "center", justifyContent: "center"}}>
                                <Image source={require('../assets/icons/ic_location_on.png')} style={{width: 20, height: 20}}/>
                            </View>
                        </View>
                        <ScrollView>
                            {
                                this.state.dataSource.map(t=>(
                                    <Farmacia key={t.place_id} obj={t} initialLat={this.state.lat} initialLng={this.state.lng} navigation={this.props.navigation}/>
                                    )
                                )
                            }
                        </ScrollView>
                    </View>
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