import React from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import axios from 'axios';
import Loader from './Loader';
import Medicamento from './Medicamento';
import  * as colors from './constants/colors'
import AppLogo from './components/AppLogo/AppLogo';
import { Icon } from 'native-base';


class BuscaMedicamento extends React.Component{

    static navigationOptions = {
        title: 'Buscar medicamentos',
        headerTitle: () => <AppLogo />,
        headerStyle: {
            backgroundColor: colors.HEADER_BACKGROUND_COLOR,
        },
        headerTintColor: colors.HEADER_FONT_COLOR,
        headerTitleStyle: {
            fontWeight: 'bold',
            color: colors.HEADER_FONT_COLOR
        },
    };

    constructor(props){
        super(props);
        this.state = { isLoading: true}
    }

   
   
    componentDidMount(){
        
        return fetch("http://www.snpmed.com.br/api/medicamento?q=" + this.props.navigation.getParam('termo'))
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(
                    {
                        isLoading: false,
                        dataSource: responseJson.Data,
                    }, 
                    function(){
                        
                    }
                );

            })
            .catch((error) =>{
                console.error(error);
            });
    }

   
    render(){
        if(this.state.isLoading){
            return(
                <Loader/>
            );
        }
        return(
            <ScrollView>
                {
                this.state.dataSource.map(t=>(
                    <TouchableOpacity key={t.id}
                        style={{backgroundColor: "#DDDDDD", marginBottom: 10, padding: 5}}
                        onPress={() => this.props.navigation.navigate('Agendamento',{idMedicamento: t.id, nomeMedicamento: t.nome})}
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

const styles = StyleSheet.create({
    
    inputStyle:{
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        flex: 8
    },
    icon: {
        flex: 2
    }
  });

  export default BuscaMedicamento;