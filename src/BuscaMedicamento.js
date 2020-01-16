import React from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import {Button, Header, Left, Right, Body, Icon, Title} from 'native-base';
import axios from 'axios';
import Loader from './Loader';
import Medicamento from './Medicamento';

export default class BuscaMedicamento extends React.Component{
    state = {
        termo: "",
        onCall: 0,
        dados: [],
    }
   
    search = () => {
        this.setState({onCall: 1});

        var self = this;
        
        if(this.state.termo===""){
            return (
                <View/>
            );
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                axios.get("http://www.snpmed.com.br/api/medicamento?q=" + this.state.termo)
                .then(function(response){
                    self.setState({dados: response.data.Data});
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
                    <Medicamento dados={this.state.dados}/>
                );
            default:
                return (
                    <View/>
                );
        }
    }

    render(){
        return(
            <View>
                <Header
                    searchBar={true}
                    rounded={true}
                    >
                    <Left>
                        <Button 
                            transparent
                            onPress={()=>this.props.switchScreen('home')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>MEDICAMENTOS</Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={()=>this.props.switchScreen('menu')}>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                    
                </Header>
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(text)=>this.setState({termo: text})}
                        value={this.state.termo}
                        placeholder="Pesquisar medicamento"
                        >
                    </TextInput>
                    <Icon name="search" style={styles.icon}  onPress={() => this.search()}/>                    
                </View>  

                {this.renderBody()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    inputStyle:{
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        flex: 8
    },
    icon: {
        flex: 2
    }
  });