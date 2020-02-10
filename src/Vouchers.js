import React from 'react';
import {ScrollView, ActivityIndicator, View, TouchableOpacity, Image, Text} from 'react-native';
import { retornaVouchers  } from './api/evento';
import { connect } from 'react-redux';
import * as COLORS from './constants/colors';
import Login from './Login';
import { Card, CardItem, Left, Thumbnail, Body, Right } from 'native-base';

var thumb = require('../assets/icons/default-avatar.jpg');
var logo = require('../assets/icons/logo_small.png');

class Vouchers extends React.Component{

    state = {
        isLoading: true,
        dataSource: []
    }
    componentDidMount = () => {
        this.loadData();
    }

    loadData = () => {
        this.setState({isLoading: true});
        retornaVouchers(this.props.usuario.id)
        .then(
            x => {
                console.log(x.Data);
                this.setState({ dataSource: x.Data, isLoading: false });
            }
        )
    }

    isUtilizado = dt_utilizacao => {
        if(dt_utilizacao!=null){
            return (<Right>
                <Text>{t.dt_utilizacao}</Text>
            </Right>);
        }else{
            return (<Right>
                <Text>-</Text>
            </Right>);
        }
    }
    renderList = () => {
        
        return (this.state.dataSource.length > 0 ? this.state.dataSource.map(t=>(
            <Card style={{flex:0}} key={t.id_evento}>
                <CardItem>
                    <Left>
                        <Thumbnail source={thumb}/>
                        <Body>
                            <Text>{t.titulo}</Text>
                            <Text note>Valido até {t.dt_validade}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={logo} style={{height: 200, flex: 1}}/>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            {t.descricao}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left style={{justifyContent: "center"}}>
                        <Text>{t.dt_emissao}</Text>
                    </Left>
                    {this.isUtilizado(t.dt_utilizacao)}
                </CardItem>
            </Card>
        )) : <View></View>);
    }

    render(){
        if(this.state.isLoading){
            return (<ActivityIndicator/>);
        }
        if(this.props.usuario.id<=0){
            return (<Login navigation={this.props.navigation} previousScreen="Vouchers"/>);
        }
        return (
            <ScrollView style={{flex:1}}>
                {this.renderList()}
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
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Vouchers);