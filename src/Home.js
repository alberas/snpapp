import React from 'react';
import { View, Image, ScrollView, Text} from 'react-native';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import * as COLORS from './constants/colors';
import HomeButton from './components/HomeButton/HomeButton';
import AppLogo from './components/AppLogo/AppLogo';
import SearchBox from './components/SearchBox/SearchBox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';

//import {createThumbnail} from 'react-native-create-thumbnail';




const imgDescontos = require("../assets/icons/bt1.png");
const imgDicas = require("../assets/icons/bt2.png");
const imgFarmacias = require("../assets/icons/bt3.png");
const imgAgendamento = require("../assets/icons/bt5.png");

class Home extends React.Component {

    static navigationOptions = {
        headerTitle: () => <AppLogo />,
        headerStyle: {
            backgroundColor: COLORS.HEADER_BACKGROUND_COLOR,
            height: 100,
            shadowColor: 'transparent',
            borderBottomWidth: 0
        },
    };

    state = {
        status: "",
        thumbnail: "",
    }

    render() {
        const { navigate } = this.props.navigation;

        return ( 
            <BackgroundImage>
                <View style={{display: "flex", flex: 2, padding: 2, backgroundColor: COLORS.HEADER_BACKGROUND_COLOR}}>
                    <SearchBox navigation = { this.props.navigation }/>
                    <Text style={{textAlign: "center", padding: 5}}>
                        Digite o nome do medicamento e faça a programação dos horários de administração ou faça um pesquisa por reconhecimento clicando na icone da camêra.
                    </Text>
                </View>   
                <View  style={{display: "flex", flex: 7, paddingTop: 7}}>
                    <ScrollView>
                        <HomeButton rotulo = {`Descontos e Promoções`}
                            descricao="Encontre as melhores ofertas disponíveis na cidade"
                            navigation = { this.props.navigation }
                            telaDestino = "Descontos" 
                            image={imgDescontos}/>

                        <HomeButton rotulo = {`Dicas de saúde`}
                            descricao="Leia dicas de saúde praparadas por profissionais renomados"
                            navigation = { this.props.navigation }
                            telaDestino = "Dicas" 
                            image={imgDicas}/>

                        <HomeButton rotulo = {`Farmácias próximas`}
                            descricao="Encontre as farmácias mais próximas"
                            navigation = { this.props.navigation }
                            telaDestino = "Locais" 
                            image={imgFarmacias}/>

                        <HomeButton rotulo = {`Lembretes de medicamentos`}
                            descricao="Monitore os horários de administração de medicações"
                            navigation = { this.props.navigation }
                            telaDestino = "Agendamento" 
                            image={imgAgendamento}/>
                        
                        <Text style={{textAlign: "center"}}>SINAPSE® 2020</Text>
                    </ScrollView> 
                </View>
            </BackgroundImage>
        );
    };
}


const mapStateToProps = state => {
    return {
        usuario: state.usuario
    };
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);