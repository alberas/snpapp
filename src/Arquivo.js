import React from 'react';
import {ScrollView, Text, View, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import  * as colors from './constants/colors'
import AppLogo from './components/AppLogo/AppLogo';

var i_pdf = require('../assets/icons/i_pdf.gif');

class Arquivo extends React.Component{

    static navigationOptions = {
        title: 'Histórico',
        headerTitle: () => <AppLogo/>,
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
        return fetch("http://www.snpmed.com.br/api/historico/" + this.props.usuario.id)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState(
                    {
                        isLoading: false,
                        dataSource: responseJson.Data,
                    }, 
                    function(){}
                );

            })
            .catch((error) =>{
                console.error(error);
            });
    }
        
    renderPdfIcon = (qtd_arquivos) => {
        if(qtd_arquivos > 0){
            return (<Image source={i_pdf} style={{position: "absolute", right: 5, bottom: 5}}/>);
        }
    }
        
        
    render(){

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
            <ScrollView>
                {
                    this.state.dataSource.map(t => 
                        <View
                            key={t.id}
                            style={{backgroundColor: "#DDDDDD", marginBottom: 10, padding: 5}}
                            >
                            <Text>{t.tipo_protocolo}</Text>
                            <Text>Dr(a) {t.nome_medico}</Text>
                            <Text>{t.dt_emissao}</Text>
                            {this.renderPdfIcon(t.qtd_arquivos)}
                            <TouchableOpacity 
                                style={{width: 50, height: 50, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center'}}
                                onPress={() => this.props.navigation.navigate('Receita', { id: t.id })}>
                                <Icon name="search"/>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        usuario: state.usuario
    };
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Arquivo);