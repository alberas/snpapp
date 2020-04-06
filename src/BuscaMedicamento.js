import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';
import Loader from './Loader';
import  * as colors from './constants/colors'
import AppLogo from './components/AppLogo/AppLogo';
import Medicamento from './components/Medicamento/Medicamento';
import { Icon } from 'native-base';
import { EmptyResult } from './components/EmptyResult/EmptyResult';
import { medicamentoPesquisarTermo } from './api/medicamento';

class BuscaMedicamento extends React.Component{

    static navigationOptions = {
        title: "Medicamento"
    };

    constructor(props){
        super(props);
        this.state = { isLoading: true, dataSource: []}
    }

   
   
    componentDidMount(){
        var self = this;
        self.setState({dataSource: [], isLoading: true});
        
        const termo = this.props.navigation.getParam("termo");

        if(termo!=""){
            medicamentoPesquisarTermo(termo).then(
                t => {
                    if(t!==undefined){
                        self.setState({dataSource: t.Data});
                    }
                    self.setState({...this.state, isLoading: false});
                }
            )
        }
    }

   
    render(){
        if(this.state.isLoading){
            return(
                <Loader/>
            );
        }
        return(
            
            (this.state.dataSource.length > 0) ?
            <ScrollView>
                {
                this.state.dataSource.map(t=>(
                    <Medicamento key={t.id} object={t} navigation={this.props.navigation}/>
                    )
                )
                }
            </ScrollView>
            :
            <EmptyResult/>
        );
    }
}

const styles = StyleSheet.create({
    
    inputStyle:{
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        flex: 8
    },
    icon: {
        flex: 2
    }
  });

  export default BuscaMedicamento;