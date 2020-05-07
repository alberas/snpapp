import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import Loader from './Loader';
import Medicamento from './components/Medicamento/Medicamento';
import { EmptyResult } from './components/EmptyResult/EmptyResult';
import { medicamentoPesquisarTermo } from './api/medicamento';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';

import { SearchInput } from './components/SearchInput/SearchInput';

class BuscaMedicamento extends React.Component{

    static navigationOptions =({navigation}) => {
        return {
            headerStyle: {
                backgroundColor: "#FFF",
                height: 80,
                shadowColor: 'transparent',
                borderBottomWidth: 0
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: "#F25C5C",
                fontSize: 25
            },
            headerTitle: "Pesquisa de medicamento",
            headerLeft: () => (
                <TouchableOpacity style={{borderWidth:1, borderColor: "#FFEEEE", padding: 10, borderRadius: 5, margin: 5}} onPress={()=>navigation.navigate('Home')}>
                    <Image source={require('../assets/icons/ic_keyboard_arrow_left/ic_keyboard_arrow_left_48px.png')}/>
                </TouchableOpacity>
            )
        }
    }

    constructor(props){
        super(props);
        this.state = { isLoading: true, dataSource: [], termo: ""}

    }

    componentDidMount(){
        var self = this;
        self.setState({dataSource: [], isLoading: true});
        
        const termo = this.props.navigation.getParam("termo");
        this.setState({termo: termo});

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

    setTermoPesquisa = (termo) => this.setState({termo: termo})

    pesquisar = () => {
        if(this.state.termo!="" && this.state.termo.length >= 2){
            navigation.navigate('BuscaMedicamento', {termo: this.state.termo});
        }else{
            Alert.alert("SINAPSE","Digite um termo para pesquisar o medicamento");
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
                <BackgroundImage>
                    <ScrollView>
                        {
                        this.state.dataSource.map(t=>(
                            <Medicamento key={t.id} object={t} navigation={this.props.navigation}/>
                            )
                        )
                        }
                    </ScrollView>
                </BackgroundImage>
                :
                <EmptyResult/>
        );
    }
}

const styles = StyleSheet.create({
    
    borderStyle: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#F2A0A0",
        backgroundColor: "#F2A0A061"
    },
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