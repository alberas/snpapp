import React from 'react';
import {ScrollView, View, Text, ActivityIndicator} from 'react-native';
import { retornaPromocoes } from './api/evento';

export default class Descontos extends React.Component{

    state = {
        isLoading: true,
        promocoes: []
    }
    componentDidMount = () => {
        this.setState({isLoading: true});
        retornaPromocoes().then(
            x => {
                this.setState({ promocoes: x.Data, isLoading: false });
            }
        )
       
    }

    
    renderData = () => {
        if(this.state.isLoading){
            return (<ActivityIndicator/>);
        }

        if(this.state.promocoes!==null){
            console.log( this.state.promocoes);
            return (
                this.state.promocoes.map(t=>{
                    <Text>ssssssssssssssss</Text>
                })
            );
        }else{
            <View><Text>Nenhuma promoção encontrada</Text></View>
        }
    }
    

    render(){
        return (
            <ScrollView style={{flex:1}}>
               {this.renderData()}
            </ScrollView>
        );
    }
}


