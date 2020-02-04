import React from 'react';
import {View, ScrollView, Text, Image} from 'react-native';

var img = require('../assets/icons/default-avatar.jpg');

class Paciente extends React.Component{

    render(){


        var paciente = this.props.data.Data;

        if(!paciente){
            return (
                <View/>
            );
        }
        return(
            <ScrollView style={{flex:1}}>
                <View style={{alignItems: 'center'}}>

                    <Image source={img}/>
                
                    <Text>{paciente.email}</Text>
                    <Text>{paciente.nome}</Text>
                </View>
                
            </ScrollView>
        );
    }
}

const style = {
    header: {
        fontSize: 30,
        color: '#000'
        
    }
}


export default Paciente;