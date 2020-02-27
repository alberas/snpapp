import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import * as COLORS from '../../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Medicamento extends Component {

        
    render(){
        const obj = this.props.object;
        return(
        <TouchableOpacity key={obj.id}
                style={style.componente}
                onPress={() => this.props.navigation.navigate('Agendar', {idMedicamento: obj.id, nomeMedicamento: obj.nome})}
                >
                <Text style={style.descricao}>{obj.nome}</Text> 
                <Text style={{...style.descricao, color: COLORS.LIST_ITEM_BACKGROUND_COLOR}}>{obj.principio_ativo}</Text>
                <Text style={{...style.descricao, color: COLORS.LIST_ITEM_BACKGROUND_COLOR}}>{obj.apresentacao}</Text>
            </TouchableOpacity>
        );
    };
}

const style = StyleSheet.create({
    componente: {
        /*
        backgroundColor: COLORS.LIST_ITEM_BACKGROUND_COLOR, 
        marginBottom: 1, 
       */
        padding: 5,
        paddingBottom:15,
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.LIST_ITEM_BACKGROUND_COLOR
    },

    descricao:{
        fontSize: 18,
    }
});

export default Medicamento;