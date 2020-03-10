import React from 'react';
import { View, Text, Image, TextInput, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import * as colors from './constants/colors'
import HomeButton from './components/HomeButton/HomeButton';
import AppLogo from './components/AppLogo/AppLogo';
import SearchBox from './components/SearchBox/SearchBox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';

//import {createThumbnail} from 'react-native-create-thumbnail';


const iconBarras = require("../assets/icons/ico2.png");
const iconScan = require("../assets/icons/ico1.png");

const imgDescontos = require("../assets/icons/bt1.png");
const imgDicas = require("../assets/icons/bt2.png");
const imgFarmacias = require("../assets/icons/bt3.png");
const imgScan = require("../assets/icons/bt4.png");

class Home extends React.Component {

    static navigationOptions = {
        title: 'Home',
        headerTitle: () => < AppLogo /> ,
        headerStyle: {
            backgroundColor: 'transparent',
            shadowColor: 'transparent',
            borderBottomWidth: 0
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

    render() {
        const { navigate } = this.props.navigation;

        return ( 
            <BackgroundImage>
                <View style={{display: "flex", flex: 2, flexWrap: "nowrap",flexDirection: "row", alignItems:"center", margin:5}}>
                    <SearchBox navigation = { this.props.navigation }/>
                    <TouchableOpacity onPress = { () => navigate('ScanSearch') }>
                        <Image  source={iconBarras}
                                style = { styles.icon }
                                /> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress = { () => navigate('ScanSearch') }>
                        <Image   source={iconScan}
                                style = { styles.icon }
                                />    
                    </TouchableOpacity>
                </View>   
                <View style={{display: "flex", flex: 8, flexWrap: "wrap", flexDirection:"row", justifyContent: "center", alignItems: "center"}}>
                    <HomeButton rotulo = {`Descontos e\r\n Promoções`}
                        navigation = { this.props.navigation }
                        telaDestino = "Descontos" 
                        image={imgDescontos}/>
                        <HomeButton rotulo = {`Dicas de saúde`}
                        navigation = { this.props.navigation }
                        telaDestino = "Dicas" 
                        image={imgDicas}/>
                    <HomeButton rotulo = {`Farmácias\n`}
                        navigation = { this.props.navigation }
                        telaDestino = "Locais" 
                        image={imgFarmacias}/>

                    <HomeButton rotulo = {`Scanear receita`}
                        navigation = { this.props.navigation }
                        telaDestino = "Scan" 
                        image={imgScan}/>
                    
                </View> 
            </BackgroundImage>
        );
    };
}

const styles = StyleSheet.create({
    
    icon: {
        margin:1,
        width: 50,
        height: 50,
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