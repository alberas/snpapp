import React from 'react';
import {ScrollView, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import Cabecalho from './Cabecalho';


class Arquivo extends React.Component{

    constructor(props){
        super(props);
        this.state = { isLoading: true}
    }
    
    componentDidMount(){
        return fetch("http://www.snpmed.com.br/api/arquivo/2")
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
                
            <Cabecalho titulo="ARQUIVO"/>
            <ScrollView>
                {
                    this.state.dataSource.map(t => 
                        <TouchableOpacity
                        key={t.id}
                        style={{backgroundColor: "#DDDDDD", marginBottom: 10, padding: 5}}>
                            <Text>{t.tipo_protocolo}</Text>
                        </TouchableOpacity>
                    )
                }
            </ScrollView>
            </View>
        );
    }
}
export default Arquivo;