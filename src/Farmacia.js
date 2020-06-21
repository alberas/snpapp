import React from 'react';
import { ScrollView, Text, Image, TouchableOpacity, TextInput, Linking, View, Dimensions, Alert} from 'react-native';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import * as google from './api/google';
import * as pj from './api/pj';
import Loader from './Loader';
import { Card, CardItem, Body, Icon } from 'native-base';
import DefaultButton from './components/DefaultButton/DefaultButton';
import Communications from 'react-native-communications';
import {calculaDistancia} from './util/MapsUtil';

import Seta from '../assets/icons/send-2.svg';
import Pin from '../assets/icons/ic_location_on.svg';
import Close from '../assets/icons/ic_close.svg';
import { connect } from 'react-redux';


const w = Math.round(Dimensions.get('window').width) - 10;

class Farmacia extends React.Component{

    static navigationOptions = ({navigation}) => {
        return {
            headerShown: false
        }
    }

    constructor(props){
        super(props);
        this.state = { 
            dataSource: [],
            isLoading: true,
            mensagem: `Olá,\r\nEncontrei esse número através do SINAPSE MED. Gostaria de fazer uma cotação.`,
            placeId: 0,
            lat: 0,
            long: 0
        }
    }
    componentDidMount(){
        const {getParam} = this.props.navigation;

        var placeId = getParam("place_id");
        var lat = getParam("lat");
        var long = getParam("long");

        var self = this;

        this.loadPlaceData(placeId).then(
            (placeResult) => {
                    self.setState({
                        placeId: placeId,
                        lat: lat,
                        long: long,
                        dataSource: placeResult.result, 
                        isLoading: false
                    });
                }
            )
            .catch(function(error){
                console.log(error);
            });
        
        return {};
    }

    loadPlaceData = (placeId) => {
        return google.detalhaFarmacia(placeId);
    }

    loadMap = (geometry) => {
        
        var url = google.retornaUrlMapaEstatico(this.state.lat, this.state.long);

        const {navigate} = this.props.navigation;

        return (
            <TouchableOpacity
                onPress={() => {
                    navigate('Local',{
                        lat1: this.state.lat,
                        lng1: this.state.long,
                        lat2: geometry.location.lat,
                        lng2: geometry.location.lng,
                    });
                }}>

                <Image source={{uri:url}} style={{width:w, height: 250, margin: 5, alignSelf: "center", borderRadius: 5}}/>
                <TouchableOpacity style={{position: "absolute", bottom: 10, right: 5, backgroundColor: "#fff", borderRadius: 5, padding: 12}}> 
                    <Text style={{fontSize: 18, color: "#F25C5C"}}>Iniciar</Text> 
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    WhatsApp = () => {
        pj.buscaDados(this.state.placeId).then(
            resp => {
                if(resp.Data!=null && resp.Data.fone != null){
                    Linking.openURL(`whatsapp://send?text=${this.state.mensagem}&phone=${resp.Data.fone}`);
                }else{
                    Alert.alert("SINAPSE", "Esse estabelecimento não possui esse tipo de contato.");
                }
            }
        )
    }

    render(){

        const {goBack,navigate} = this.props.navigation;

        if(this.state.isLoading){
            return (
                <Loader/>
            );
        }

        var item = this.state.dataSource;
        return (
            <BackgroundImage>
                <ScrollView>
                    <View style={{padding: 10}}>
                        <TouchableOpacity onPress={() => goBack()} style={{position: "absolute", top: 10, right: 10}}>
                            <Close width={20} height={20}/>
                        </TouchableOpacity>
                        <View style={{flex: 2, borderColor: "#F3F3F3", borderWidth: 1, justifyContent: "center", alignItems: "center", borderRadius: 7, marginRight: 10, width:75, height: 75, alignSelf: "center", margin: 10}}>
                            <Image source={{uri: item.icon}} style={{width: 60, height: 60}}/>
                        </View>
                        
                        <Text style={{fontSize: 25, textAlign: "center", margin: 25, color:"#242424", fontWeight: "bold"}}>{item.name}</Text>

                        <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 10}}>
                            <View style={style.iconBox}>
                                <Pin width={10}  height={10} style={style.icon}/>
                            </View>
                            <Text style={{fontSize: 15, textAlign: "center"}}>{item.formatted_address}</Text>
                        </View>
                        
                        <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 10}}>
                            <View style={style.iconBox}>
                                <Seta width={10}  height={10} style={style.icon}/>
                            </View>
                            <Text style={{color: "#616161"}}>{calculaDistancia(this.props.coordenadas.lat, this.props.coordenadas.lng, item.geometry.location.lat, item.geometry.location.lng)} m</Text>
                        </View>

                        <TextInput multiline={true} style={{height: 170, width: w, fontSize: 20, padding: 5, borderRadius: 5, borderWidth: 1, borderColor:  "#F3F3F3", alignSelf: "center", color:"#616161"}} onPress={(text) => this.setState({mensagem: text}) } value={this.state.mensagem}/>

                        <View>
                            <View style={{justifyContent: "space-between", flexDirection: "row", marginBottom: 10, marginTop: 10}}>
                                <TouchableOpacity
                                    style={{fontSize:30, borderRadius: 5, padding: 20, borderColor: "#15A53B", justifyContent: "center", alignItems: "center", borderWidth: 1, width: 175}}
                                    onPress={() => this.WhatsApp()}>
                                    <Text style={{color: "#15A53B"}}>Enviar mensagem</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{fontSize: 30, borderRadius: 5, padding: 20, borderColor: "#0AA9FB", justifyContent: "center", alignItems: "center", borderWidth: 1, width: 175}}
                                    onPress={() => Communications.phonecall(item.formatted_phone_number,true) }>
                                    <Text style={{color: "#0AA9FB"}}>Fazer ligação</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{justifyContent: "center", flexDirection: "row"}}>
                                <TouchableOpacity 
                                    style={{fontSize: 30, borderRadius: 5, padding: 20, borderColor: "#616161", justifyContent: "center", alignItems: "center", borderWidth: 1, width: 200}}
                                    onPress={() => navigate("Orcamento",{place_id: item.place_id}) }>
                                    <Text style={{color: "#616161"}}>Solicitar orçamento</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            {this.loadMap(item.geometry)}
                        </View>
                    </View>
                    <TouchableOpacity style={{marginTop: 400}} onPress={() => navigate("CadastroFarmacia", {place_id: item.place_id, txt_nome: item.name, txt_endereco: item.formatted_address})}>
                        <Text style={{textAlign: "center"}}>ATUALIZAR CADASTRO DA FARMÁCIA</Text>
                    </TouchableOpacity>
                </ScrollView>
            </BackgroundImage>
        );
    }
}

const style = {
    icon:{
        marginTop: 5, 
        marginRight: 5, 
        marginBottom: 5
    },
    iconBox: {
        padding: 3,
        margin: 2, 
        borderRadius: 2, 
        justifyContent: "center", 
        alignContent: "center",
        backgroundColor: "#F3F3F3",
        width: 15,
        height: 15
    }
}



const mapStateToProps = state => {
    return {
        coordenadas: state.coordenadas
    };
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Farmacia);