import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import * as colors from './constants/colors'
import HomeButton from './components/HomeButton/HomeButton';
import AppLogo from './components/AppLogo/AppLogo';
import { Icon } from 'native-base';

//import {createThumbnail} from 'react-native-create-thumbnail';

class Home extends React.Component {

    static navigationOptions = {
        title: 'Home',
        headerTitle: () => < AppLogo /> ,
        headerStyle: {
            backgroundColor: colors.HEADER_BACKGROUND_COLOR,
        },
        headerTintColor: colors.HEADER_FONT_COLOR,
        headerTitleStyle: {
            fontWeight: 'bold',
            color: colors.HEADER_FONT_COLOR
        },
    };

    state = {
        termo: "",
        status: "",
        thumbnail: "",
        promocoes: []
    }

    componentDidMount = () => {
        /*
        createThumbnail({
            url: "https://www.youtube.com/watch?v=XBibflTALDs",
            type: "remote",
            timeStamp: 5
        })
        .then(response => {
            console.log({ response });
            this.setState({
                status: "Thumbnail received",
                thumbnail: response.path
            });
        })
        .catch(err => console.log({ err }));
        */

        
    }

    saudacao = () => {
        if (this.props.usuario.id > 0) {
            return ( 
                <Text style = {
                    { color: colors.SCREEN_FONT_COLOR, margin: 30, textAlign: "center", fontSize: 20, fontWeight: "bold" }
                    }>
                Olá, { this.props.usuario.nome } </Text>
            );
        }
    }

    funcionalidadesRestritas = () => {
        if (this.props.usuario.id > 0) {
            return ( 
                <View>
                <HomeButton rotulo="Arquivo"
                    navigation={ this.props.navigation }
                    color = "#FFC125"
                    telaDestino = "Arquivo" />
                <HomeButton rotulo = "Pacientes"
                    navigation = { this.props.navigation }
                    color = "#8A2BE2"
                    telaDestino = "BuscaPaciente" />
                </View>
            );
        }
    }

    renderVideoThumb = () => {
        if (this.state.thumbnail) {
            return ( < Image source = {
                    { uri: this.state.thumbnail }
                }
                />);
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return ( 
            <View style = {{ flex: 1, backgroundColor: colors.SCREEN_BACKGROUND_COLOR }}>
                <View style = { styles.searchBox }>
                    <TextInput  style = { styles.inputStyle }
                                onChangeText = {
                                    (text) => this.setState({ termo: text })
                                }
                                value = { this.state.termo }
                                placeholder = "Pesquisar medicamento" >
                    </TextInput> 
                    <Icon   name = "search"
                            style = { styles.icon }
                            onPress = {
                                () => navigate('BuscaMedicamento', { termo: this.state.termo })
                            }
                            />   
                    <Icon   name = "camera"
                            style = { styles.icon }
                            onPress = {
                                () => navigate('ScanSearch')
                            }
                            />                            
                </View >

                { this.saudacao() } 
                <View style = {{ alignItems: 'stretch' }}>

                    <HomeButton rotulo = "Descontos e Promoções"
                        navigation = { this.props.navigation }
                        color = "#FFA500"
                        telaDestino = "Descontos" />
                    <HomeButton rotulo = "Dicas de saúde"
                        navigation = { this.props.navigation }
                        color = "#B0E0E6"
                        telaDestino = "Dicas" />
                    <HomeButton rotulo = "Farmácias"
                        navigation = { this.props.navigation }
                        color = "#CD5555"
                        telaDestino = "Locais" />
                    <HomeButton rotulo = "Scanear receita"
                        navigation = { this.props.navigation }
                        color = "#9370DB"
                        telaDestino = "Scan" />
                    <HomeButton rotulo = "Scanear Código de barras"
                        navigation = { this.props.navigation }
                        color = "#FFD700"
                        telaDestino = "Scan2" />

                    { this.funcionalidadesRestritas() }

                </View> 
            
            </View >
        );
    };
}

const styles = StyleSheet.create({
    searchBox: {
        flexDirection: 'row',
        margin: 10,
        borderRadius: 20,
        padding: 10,
        marginBottom: 35,
        backgroundColor: 'lightgray',
        marginTop: 25
    },
    inputStyle: {
        flex: 9,
        height: 40,
        borderColor: '#fff',
        fontSize: 25
    },
    icon: {
        flex: 1,
        width: 30,
        height: 30
    }
});

const mapStateToProps = state => {
    return {
        usuario: state.usuario
    };
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);