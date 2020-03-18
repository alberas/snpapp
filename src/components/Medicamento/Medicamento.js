import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import * as COLORS from '../../constants/colors';
import { Card, CardItem, Body, Right, Icon } from 'native-base';

class Medicamento extends Component {

        
    render(){
        const obj = this.props.object;
        return(
            <Card key={obj.id}>
                <CardItem header button bordered
                    onPress={() => this.props.navigation.navigate('Agendar', {idMedicamento: obj.id, nomeMedicamento: obj.nome})}
                    >
                    <Text>{obj.nome}</Text> 
                    
                </CardItem>
                <CardItem button onPress={() => this.props.navigation.navigate('Agendar', {idMedicamento: obj.id, nomeMedicamento: obj.nome})}>
                    <Body>
                        <Text>{obj.principio_ativo}</Text>
                        <Text>{obj.apresentacao}</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </CardItem>
            </Card>
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