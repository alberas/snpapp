import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as COLORS from '../../constants/colors';
import { Icon } from 'native-base';

class Medicamento extends Component {

        
    render(){
        const obj = this.props.object;
        return(
        <TouchableOpacity key={obj.id}
                style={style.componente}
                onPress={() => this.props.navigation.navigate('Agendamento',{idMedicamento: obj.id, nomeMedicamento: obj.nome})}
                >
                <Text style={style.descricao}>{obj.nome}</Text> 
                <Text style={style.descricao}>{obj.principio_ativo}</Text>
                <Text style={style.descricao}>{obj.apresentacao}</Text>
            </TouchableOpacity>
        );
    };
}

const style = StyleSheet.create({
    componente: {
        backgroundColor: COLORS.LIST_ITEM_BACKGROUND_COLOR, 
        marginBottom: 1, 
        padding: 10,
        justifyContent: "center"
    },

    descricao:{
        fontSize: 20,
    }
});

export default Medicamento;