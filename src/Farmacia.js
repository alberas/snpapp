import React from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity, TextInput, Button} from 'react-native';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import {detalhaFarmacia} from './api/google';
import Loader from './Loader';
import { Card, CardItem, Body } from 'native-base';

class Farmacia extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            dataSource: [],
            isLoading: true,
            mensagem: "",
        }
    }
    componentDidMount(){
        var place_id = this.props.navigation.getParam("place_id");
        var self = this;
        detalhaFarmacia(place_id).then(
                responseJson => {
                    self.setState({dataSource: responseJson.result});
                    self.setState({isLoading: false});
                }
            )
            .catch(function(error){
                console.log(error);
            });
        
        return {};
    }

    render(){


        if(this.state.isLoading){
            return (
                <Loader/>
            );
        }

        var place_id = this.props.navigation.getParam("place_id");
        var item = this.state.dataSource;
        return (
            <BackgroundImage>
                <ScrollView>
                    <Card>
                        <CardItem header style={{flexDirection: "column"}}>
                            <Text style={{fontSize: 25, textAlign: "center"}}>{item.name}</Text>
                            <Text style={{fontSize: 15, textAlign: "center"}}>{item.formatted_address}</Text>
                            <Text style={{fontSize: 15, textAlign: "center"}}>{item.formatted_phone_number}</Text>
                        </CardItem>
                        <CardItem>
                            <Body style={{alignItems: "center", justifyContent: "center"}}>
                                <TextInput multiline={true} style={{height: 50}} value={this.state.mensagem}/>
                            </Body>
                        </CardItem>
                    </Card>
                    <TouchableOpacity style={{marginTop: 400}} onPress={() => this.props.navigation.navigate("CadastroFarmacia", {txt_nome: item.name, txt_endereco: item.formatted_address})}>
                        <Text style={{textAlign: "center"}}>ATUALIZAR CADASTRO DA FARMÁCIA</Text>
                    </TouchableOpacity>
                </ScrollView>
            </BackgroundImage>
        );
    }
}



export default Farmacia;