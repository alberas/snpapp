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




const imgDescontos = require("../assets/icons/coupon/coupon.png");
const imgDicas = require("../assets/icons/care/care.png");
const imgFarmacias = require("../assets/icons/location/location.png");
const imgAgendamento = require("../assets/icons/drug/drug.png");

class Home extends React.Component {

    static navigationOptions = {
        title: '',
        headerStyle: {
            backgroundColor: COLORS.HEADER_BACKGROUND_COLOR,
            height: 40,
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
                <ScrollView>
                    
                    <SearchBox navigation = { this.props.navigation }/>
                          
                    <View  style={{display: "flex", flex: 6, paddingTop: 7, backgroundColor: "#fff"}}>
                        <HomeButton rotulo = {`Descontos & Promoções`}
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

                        <HomeButton rotulo = {`Lembretes`}
                            descricao="Monitore os horários de administração de medicações"
                            navigation = { this.props.navigation }
                            telaDestino = "Agendamento" 
                            image={imgAgendamento}/>
                        
                        <Text style={{textAlign: "center"}}>SINAPSE® 2020</Text>
                    </View>
                </ScrollView> 
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