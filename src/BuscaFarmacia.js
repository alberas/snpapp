import React from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image, Alert, StyleSheet} from 'react-native';
import {Header, Icon, Input, Button, Right, Left, Body, Title} from 'native-base';
import Loader from  './Loader';
import Paciente from './Paciente';
import axios from 'axios';
import Farmacia from './Farmacia';
import SearchButton from './components/SearchButton/SearchButton';
import Cabecalho from './Cabecalho';


class BuscaFarmacia extends React.Component{

    state = {
        termo: "",
        onCall: 0,
        dados: [],
    }

   
    componentDidMount = () => {

    }

    search = () => {
        this.setState({onCall: 1});

        var self = this;
        
        var lat = "-15.7567308";
        var lng = "-47.8888723";

        navigator.geolocation.getCurrentPosition(
            position => {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius=500&type=drugstore&key=AIzaSyBVYmeDU_ygKnSUse2B0BKpnws_MdlW34w")
                .then(function(response){
                    self.setState({dados: response.data.results});
                    self.setState({onCall: 2});
                })
                .catch(function(error){
                    console.log(error);
                });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );

    }

    renderBody = () =>{
        switch(this.state.onCall){
            case 1:
                return(
                    <Loader/>
                );
            case 2:
                return(
                    <Farmacia dados={this.state.dados}/>
                );
            default:
                return (
                    <View/>
                );
        }
    }



    render(){
        return (
            <View style={{flex:1}}>

                <TouchableOpacity
                    style={style.button}
                    onPress={() => this.search()}
                    >
                    <Icon name="search" style={style.icon}/>
                    <Text style={style.text}>Pesquisar</Text>
                </TouchableOpacity>
                
                {this.renderBody()}
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