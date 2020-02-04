import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {Header, Icon, Input, Button, Right, Left, Body, Title} from 'native-base';
import Loader from  './Loader';
import Paciente from './Paciente';
import axios from 'axios';



export default class BuscaPaciente extends React.Component{

    state = {
        termo: "",
        isLoading: false,
        dataSource: {}
    }
    search = () => {
        this.setState({isLoading: true});

        var self = this;

        fetch("http://www.snpmed.com.br/api/paciente/" + this.state.termo)
        .then((response) => response.json())
            .then((responseJson) => {

                this.setState(
                    {
                        isLoading: false,
                        dataSource: responseJson.Data,
                    }, 
                    function(){

                        console.log(this.state.dataSource);
                    }
                );

            })
        .catch(function(error){
            console.log(error);
        });
    }

    renderBody = () =>{
        if(this.state.isLoading){
            return(
                <Loader/>
            );
        }else{
            return(
                <Paciente data={this.state.dataSource}/>
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


