import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import { retornaVouchers  } from './api/evento';
import DescontoCard from './components/DescontoCard/DescontoCard';
import {EmptyResult} from './components/EmptyResult/EmptyResult';
import Loader from './Loader';

class Vouchers extends React.Component{

    state = {
        isLoading: true,
        dataSource: []
    }
    componentDidMount = () => {
        const navigate = this.props.navigate;
        this.loadData(navigate);
    }

    loadData = (navigate) => {
        if(this.props.usuario!=undefined && this.props.usuario.id>0){
            this.setState({isLoading: true});
            retornaVouchers(this.props.usuario.id)
            .then(
                x => {
                    this.setState({ dataSource: x.Data, isLoading: false });
                }
            )
        }else{
            navigate("Login", {previousScreen: "Descontos", activeScreen: 2});
        }
    }

    renderList = (navigate) => {
        return ( 
            this.state.dataSource.map(t=>
                (
                    <DescontoCard key={t.id} navigate={navigate} obj={t} showButton={false}/>
                )
            )
        )
    }

    render(){
        const navigate = this.props.navigate;

        if(this.state.isLoading){
            return (<Loader/>);
        }

        return (
            (this.state.dataSource.length > 0 ? 
            <ScrollView style={{flex:1}}>
                {this.renderList(navigate)}
            </ScrollView>
            :
            <EmptyResult/>
            )
        );
    }
}

export default Vouchers;