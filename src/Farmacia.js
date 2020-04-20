import React from 'react';
import { ScrollView, Text, Image, TouchableOpacity, TextInput, Linking, View} from 'react-native';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import * as google from './api/google';
import * as pj from './api/pj';
import Loader from './Loader';
import { Card, CardItem, Body, Icon } from 'native-base';
import DefaultButton from './components/DefaultButton/DefaultButton';
import Communications from 'react-native-communications';

class Farmacia extends React.Component{

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
        var placeId = this.props.navigation.getParam("place_id");
        var lat = this.props.navigation.getParam("lat");
        var long = this.props.navigation.getParam("long");

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

    loadMap = () => {
        var url = google.retornaUrlMapaEstatico(this.state.lat, this.state.long);
        return (<Image source={{uri:url}} style={{width:300, height: 200, margin: 5, alignSelf: "center"}}/>);
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


        if(this.state.isLoading){
            return (
                <Loader/>
            );
        }

        var item = this.state.dataSource;
        return (
            <BackgroundImage>
                <ScrollView>
                    <Card>
                        <CardItem header bordered style={{flexDirection: "column"}}>
                            <Text style={{fontSize: 25, textAlign: "center"}}>{item.name}</Text>
                            <Text>{`\r\n`}</Text>
                            <Text style={{fontSize: 15, textAlign: "center"}}>{item.formatted_address}</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body style={{alignItems: "center", justifyContent: "center", marginBottom: 6}}>
                                <TextInput multiline={true} style={{height: 200, width: 300, backgroundColor: "lightgrey", fontSize: 20, margin: 5, padding: 5}} onPress={(text) => this.setState({mensagem: text}) } value={this.state.mensagem}/>
                                <DefaultButton label="Enviar mensagem" icon="chatboxes"
                                    onPress={() => this.WhatsApp()}/>
                                <DefaultButton label="Fazer ligação" icon="keypad" onPress={() => Communications.phonecall(item.formatted_phone_number,true) }/>
                            </Body>
                        </CardItem>
                        <CardItem  bordered>
                            <Body>
                                {this.loadMap()}
                                <DefaultButton label="Ver rota" icon="navigate"
                                    onPress={() => {
                                        this.props.navigation.navigate('Local',{
                                            lat1: this.state.lat,
                                            lng1: this.state.long,
                                            lat2: t.geometry.location.lat,
                                            lng2: t.geometry.location.lng,
                                        });
                                    }}/>
                                </Body>
                        </CardItem>
                    </Card>
                    <TouchableOpacity style={{marginTop: 400}} onPress={() => this.props.navigation.navigate("CadastroFarmacia", {place_id: item.place_id, txt_nome: item.name, txt_endereco: item.formatted_address})}>
                        <Text style={{textAlign: "center"}}>ATUALIZAR CADASTRO DA FARMÁCIA</Text>
                    </TouchableOpacity>
                </ScrollView>
            </BackgroundImage>
        );
    }
}



export default Farmacia;