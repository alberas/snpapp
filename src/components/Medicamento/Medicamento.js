import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as COLORS from '../../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Medicamento extends Component {

        
    render(){
        const obj = this.props.object;
        
        return(
            <TouchableOpacity key={obj.id}
                    onPress={() => this.props.navigation.navigate('Agendar', {idMedicamento: obj.id, nomeMedicamento: obj.nome})}
                    style={{margin: 10, padding: 10, paddingLeft:20, borderWidth: 1, borderRadius: 5, borderColor:"#F3F3F3"}}
                    >
                    <Text style={{color: "#242424", fontSize: 20, fontWeight: "bold"}}>{obj.nome}</Text> 
                    <Text style={{color: "#616161"}}>{obj.principio_ativo}</Text>
                    <Text>{obj.apresentacao}</Text>
                    <Text style={{color:"#F2A0A0"}}>{obj.nome_fabricante}</Text>
            </TouchableOpacity>
        );
    };
}


export default Medicamento;