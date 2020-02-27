import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';
import  * as colors from './constants/colors'
import AppLogo from './components/AppLogo/AppLogo';
import { Icon } from 'native-base';
import { medicamentosBuscar } from './api/medicamento';
import Loader from './Loader';
import Medicamento from './components/Medicamento/Medicamento';


export default class ListaMedicamentos extends React.Component{
    
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Medicamentos',
            headerTitle: () => <AppLogo />,
            headerLeft: () => {
                return (<Icon name="arrow-back" onPress={() => navigation.goBack()} style={{margin: 5}}/>)
            },
            headerStyle: {
                backgroundColor: colors.HEADER_BACKGROUND_COLOR,
            },
            headerTintColor: colors.HEADER_FONT_COLOR,
            headerTitleStyle: {
                fontWeight: 'bold',
                color: colors.HEADER_FONT_COLOR
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
            <ScrollView>
                {
                (this.state.dataSource.length>0) ? 
                    this.state.dataSource.map(t=>(
                        <Medicamento object={t} key={t.id} navigation={this.props.navigation}/>
                        )
                    )
                :
                (<Text style={{alignSelf: "center", fontSize: 20, padding: 10}}>Não foram encontrados medicamentos para o termo informado.</Text>)
                }
            </ScrollView>
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