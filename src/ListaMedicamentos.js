import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';
import  * as colors from './constants/colors'
import AppLogo from './components/AppLogo/AppLogo';
import { Icon } from 'native-base';
import { medicamentosBuscar } from './api/medicamento';
import Loader from './Loader';
import Medicamento from './components/Medicamento/Medicamento';
import { EmptyResult } from './components/EmptyResult/EmptyResult';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';


export default class ListaMedicamentos extends React.Component{
    
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Medicamentos',
            headerLeft: () => {
                return (<Icon name="arrow-back" onPress={() => navigation.navigate("Home")} style={{margin: 5}}/>)
            }
        }
    };
    constructor(props){
        super(props);
        this.state = { isLoading: true, dataSource: []}
    }

    

    componentDidMount(){
        this.setState({...this.state, isLoading: true});
        this.loadData();
    }

    loadData = () => {
        medicamentosBuscar(this.props.navigation.getParam("ids"))
        .then(
            resp => {
                if(resp.Data==null){
                    this.setState({isLoading: false,dataSource: []});
                }else{
                    this.setState({isLoading: false,dataSource: resp.Data});
                }
            }
        )
        .catch((error) =>{
            console.error(error);
        });
    }

    
    render = () => {
        if(this.state.isLoading){
            return(
                <Loader/>
            );
        }
        return(
            <BackgroundImage>
                {
                (this.state.dataSource.length>0) ? 
                    this.state.dataSource.map(t=>(
                        <Medicamento object={t} key={t.id} navigation={this.props.navigation}/>
                        )
                    )
                :
                (<EmptyResult/>)
                }
            </BackgroundImage>
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