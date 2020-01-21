import React from 'react';
import {ScrollView, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';


class Arquivo extends React.Component{

    constructor(props){
        super(props);
        this.state = { isLoading: true}
    }
    
    componentDidMount(){
        return fetch("http://www.snpmed.com.br/api/arquivo/" + this.props.usuario.id)
            .then((response) => response.json())
            .then((responseJson) => {

            this.setState({
                isLoading: false,
                dataSource: responseJson.Data,
            }, function(){
            });

            })
            .catch((error) =>{
                console.error(error);
            });
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
            <View>
                <ScrollView>
                    {
                        this.state.dataSource.map(t => 
                            <TouchableOpacity
                                key={t.id}
                                style={{backgroundColor: "#DDDDDD", marginBottom: 10, padding: 5}}>
                                <Text>{t.tipo_protocolo}</Text>
                                <Text>{t.dt_emissao}</Text>
                                <Icon name="search" style={{position: "absolute", right: 5, bottom: 5}}/>
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
            </View>
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