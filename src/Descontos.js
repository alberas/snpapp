import React from 'react';
import {ScrollView, View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
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
            
            return (
                    
                this.state.promocoes.map(t=>(
                        <TouchableOpacity key={t.id}><Text>{t.titulo}</Text></TouchableOpacity>
                    )
                )
                
            )

        }else{
            return (
                <Text>Nenhuma promoção encontrada</Text>);
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


