import React from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import { Icon } from 'native-base';
import  * as COLORS from './constants/colors'

var logo = require('../assets/logos/logo_small.png');

class Arquivos extends React.Component{

    
    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#FFF",
            height: 100,
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: "#F25C5C"
        },
        headerTitle: "Arquivos",
        headerLeft: () => (
            <HeaderLeftButton onPress={()=>this.props.navigation.navigate('Home')}/>
        )
    }
    
    render(){


        var dados = this.props.dados;

        if(!dados){
            return (
                <View/>
            );
        }

        return (
            <ScrollView>
            {
            this.props.dados.map(t=>(
                <TouchableOpacity key={t.id}
                    style={{backgroundColor: "#DDDDDD", marginBottom: 10, padding: 5}}
                    onPress={() => this.agendar(t.id)}
                    >
                    <Text>{t.nome}</Text> 
                    <Text>{t.principio_ativo}</Text>
                    <Text>{t.apresentacao}</Text>
                    <Text>Faixa de preço R${Math.ceil(t.preco_pmvg * (1.2))} - R${Math.ceil(t.preco_pf * (1.2))}</Text>
                    <Icon name="keypad" style={{position: "absolute", right: 5, bottom: 5}}/>
                </TouchableOpacity>
                )
            )
            }
            </ScrollView>
        );
    }
}

const style = {
    header: {
        fontSize: 30,
        color: 'red',
        textAlign: 'center'
    }
}

export default Arquivos;