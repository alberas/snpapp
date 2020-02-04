import React from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import { Icon } from 'native-base';
import Agendamento from './Agendamento';

class Medicamento extends React.Component{
    state = {
        id: 0
    }
    static navigationOptions = {
        title: 'Medicamento',
      };

    teste = (idMedicamento, nomeMedicamento) => {
        this.props.navigation.navigate('Agendamento',{idMedicamento: idMedicamento, nomeMedicamento: nomeMedicamento});
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
                    onPress={() => this.teste(t.id, t.nome)}
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


export default Medicamento;