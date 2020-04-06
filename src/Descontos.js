import React from 'react';
import {ScrollView, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { retornaPromocoes } from './api/evento';
import { Icon} from 'native-base';
import * as COLORS from './constants/colors';
import Loader from './Loader';
import { EmptyResult } from './components/EmptyResult/EmptyResult';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import DescontoCard from './components/DescontoCard/DescontoCard';
import Vouchers from './Vouchers';
import Login from './Login';
import { connect } from 'react-redux';
import Promocoes from './Promocoes';


class Descontos extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            activeScreen: 1
        }
    }

    componentDidMount = () => {
        if(this.props.navigation.getParam("activeScreen")!=undefined){
            this.setState({activeScreen: this.props.navigation.getParam("activeScreen")})
        }
    }
    
    renderActiveScreen = (navigate) => {
        
        if(this.state.activeScreen==1){
            return (<Promocoes navigation={navigate}/>);
        }else{
            if(this.props.usuario!=undefined){
                return (<Vouchers navigation={navigate} usuario={this.props.usuario}/>)
            }else{
                navigate("Login", {previousScreen: "Descontos"});
            }
        }
    }

    render(){
        const {navigate} = this.props.navigation;
        
        if(this.state.isLoading){
            return(<Loader/>);
        }
        return (
            <BackgroundImage>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity 
                        style={style.topButton}
                        onPress={() => this.setState({activeScreen: 1})}>
                            <Icon name="refresh" style={{color: "#fff", marginRight: 2}}/>
                        <Text style={{fontSize: 20, color: COLORS.BUTTON_FONT_COLOR}}>Descontos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={style.topButton} 
                        onPress={() => this.setState({activeScreen: 2})}>
                        <Icon name="grid" style={{color: "#fff", marginRight: 2 }}/>
                        <Text style={{fontSize: 20, color: COLORS.BUTTON_FONT_COLOR}}>Meus Vouchers</Text>
                    </TouchableOpacity>
                </View>
                { this.renderActiveScreen(navigate) }
            </BackgroundImage>
        );
    }
}

const style = StyleSheet.create({
    topButton: {
        backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR, 
        borderColor: COLORS.BUTTON_BORDER_COLOR,
        borderWidth: 1,
        margin: 1,
        padding: 10,  
        flex: 1,
        flexDirection: "row",
        justifyContent:"center", 
        alignItems: "center"
        
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

export default connect(mapStateToProps, mapDispatchToProps)(Descontos);