import React from 'react';
import {Plataform, View, StyleSheet, Text} from 'react-native';
import {ListItem, Button, List} from 'native-base';

import {Busca} from './BuscaMedicamento';

export default class Menu extends React.Component{
    

    render(){
        return(
            <View style={{felx:1, paddingTop: 20}}>
                <Header
                    searchBar={true}
                    rounded={true}
                    >
                    <Left>
                        <Button 
                            transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>SINAPSE</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <ListItem>
                    <Text>Home</Text>
                </ListItem>
                <ListItem>
                    <Text>Pesquisar Paciente</Text>
                </ListItem>
                <ListItem>
                    <Text>Pesquisar Medicamento</Text>
                </ListItem>
                <ListItem>
                    <Text>Minhas receitas</Text>
                </ListItem>
                <ListItem>
                    <Text>Scanear Documento</Text>
                </ListItem>
                
            </View>
        );
    }
}

