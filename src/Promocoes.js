import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import { retornaPromocoes } from './api/evento';
import * as COLORS from './constants/colors';
import Loader from './Loader';
import { EmptyResult } from './components/EmptyResult/EmptyResult';
import DescontoCard from './components/DescontoCard/DescontoCard';


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

    renderLista = (navigate) => {
        return(

            this.state.promocoes.length > 0 ?
                <ScrollView style={{flex:1, backgroundColor: "#fff"}}>
                    { this.state.promocoes.map(
                        t=>
                            (<DescontoCard  key={t.id} navigate={navigate} obj={t}/>)
                        )
                    }
                </ScrollView>
            :
                <EmptyResult/>
        );
    }
    render(){
        const navigate = this.props.navigate;

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