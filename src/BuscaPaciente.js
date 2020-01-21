import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {Header, Icon, Input, Button, Right, Left, Body, Title} from 'native-base';
import Loader from  './Loader';
import Paciente from './Paciente';
import axios from 'axios';



export default class BuscaPaciente extends React.Component{

    state = {
        termo: "",
        onCall: true,
        data: {}
    }
    search = () => {
        this.setState({onCall: true});

        var self = this;

        axios.get("http://www.snpmed.com.br/api/paciente/" + this.state.termo)
        .then(function(response){
            console.log(response.data);
            self.setState({data: response.data});
            self.setState({onCall: false});
        })
        .catch(function(error){
            console.log(error);
        });
    }

    renderBody = () =>{
        if(this.state.onCall){
            return(
                <Loader/>
            );
        }else{
            return(
                <Paciente data={this.state.data}/>
            );
        }
    }

    render(){
        return (
            <View style={{flex:1}}>
                
                <ScrollView>

                    <Input
                        value={this.state.termo}
                        placeholder="Pesquisar paciente"
                        onChangeText={(termo)=>{this.setState({termo})}} 
                        />
                    <Button
                        onPress={()=>{this.search()}}>
                        <Text>Pesquisar</Text>
                    </Button>
                    {this.renderBody()}
                </ScrollView>
            </View>
        );
    }
}


