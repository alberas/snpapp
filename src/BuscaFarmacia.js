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
import Pin from '../assets/icons/ic_location_on_red.svg';
import { connect } from 'react-redux';

class BuscaFarmacia extends React.Component{

    static navigationOptions = ({navigation}) => {
        return{
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
            headerLeft: () => <TouchableOpacity style={{borderWidth:1, borderColor: "#FFEEEE", padding: 10, borderRadius: 5, margin: 5}} onPress={()=>navigation.navigate('Home')}>
                                <Image source={require('../assets/icons/ic_keyboard_arrow_left/ic_keyboard_arrow_left_48px.png')}/>
                            </TouchableOpacity>
        }
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
                this.props.setCoordenadas({lat: lat, lng: lng});
                
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
                            <View style={{backgroundColor: "#FFEEEE", width: 20, height: 20, alignItems: "center", justifyContent: "center"}}>
                                <Pin width={15}  height={15} style={{color: "red"}}/>
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


const mapStateToProps = state => {
    return {
        coordenadas: state.coordenadas
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCoordenadas:  (coordenadas) => dispatch({type: "setCoordenadas", coordenadas: coordenadas})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BuscaFarmacia);