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


class Promocoes extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            isLoading: true, 
            promocoes: []
        }
    }

    componentDidMount = () => {
        this.loadData();
    }

    loadData = () => {
        this.setState({isLoading: true});
        retornaPromocoes().then(
            x => {
                this.setState({ promocoes: x.Data, isLoading: false });
            }
        )
    }

    renderLista = (navigation) => {
        return(

            this.state.promocoes.length > 0 ?
                <ScrollView style={{flex:1}}>
                    { this.state.promocoes.map(
                        t=>
                            (<DescontoCard  key={t.id} navigation={navigation} obj={t}/>)
                        )
                    }
                </ScrollView>
            :
                <EmptyResult/>
        );
    }

    render(){
        const navigate = this.props.navigation;
        
        if(this.state.isLoading){
            return(
                <Loader/>
            );
        }
        return (this.renderLista(navigate));
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


export default Promocoes;