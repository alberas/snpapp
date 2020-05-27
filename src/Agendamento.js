import React from 'react';
import {ScrollView, Text, View, Alert, TouchableOpacity, Image, Linking } from 'react-native';
import { Icon, Button } from 'native-base';
import AppLogo from './components/AppLogo/AppLogo';
import  * as COLORS from './constants/colors'
import * as Calendar from 'expo-calendar';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import {EmptyResult} from './components/EmptyResult/EmptyResult';
import * as DataUtil from './util/DataUtil'
import Loader from './Loader';
import * as SQLite from 'expo-sqlite';
import DefaultButton from './components/DefaultButton/DefaultButton';

import DeleteIcon from '../assets/icons/ic_delete.svg';
import { FileSystem } from 'react-native-unimodules';
import AgendamentoDAO from './dao/AgendamentoDAO';

class Agendamento extends React.Component{

    static navigationOptions = ({navigation}) => {
        return{
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
            headerTitle: "Calendário",
            headerLeft: () => <TouchableOpacity style={{borderWidth:1, borderColor: "#FFEEEE", padding: 10, borderRadius: 5, margin: 5}} onPress={()=>navigation.navigate('Home')}>
                                <Image source={require('../assets/icons/ic_keyboard_arrow_left/ic_keyboard_arrow_left_48px.png')}/>
                            </TouchableOpacity>
        }
    }
    
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            lista: [],
            files: []
        };
    }

    componentDidMount = () => {
        /*
        FileSystem.readDirectoryAsync(FileSystem.documentDirectory + "SQLite").then(
            t => {
                this.setState({files: t});
            }
        )
        */
        this.renderList();
    }

    renderList = () => {
        this.setState({isLoading: true});
        const agendamentoDAO = new AgendamentoDAO();
        agendamentoDAO.retornaAgendamentos(result => this.setState({lista: result, isLoading: false}), (erro) => {
            Alert.alert("SINAPSE", erro);
        });
            
    }

    deleteEvent = async (eventId) => {
        const agendamentoDAO = new AgendamentoDAO();
        agendamentoDAO.excluir(eventId, () => this.renderList(), (erro) => {
            Alert.alert("SINAPSE", erro);
        });
    }
    
    formatDate = (str) => {
        const dt = new Date(str);
        return DataUtil.convToPt(dt);
    }
    
    render(){
        
        const {navigate} = this.props.navigation;

        if(this.state.isLoading){
            return(
                <Loader/>
            );
        }

        return (
            <BackgroundImage>
                {
                this.state.lista.length > 0 
                ? 
                <View style={{flex: 1}}>
                    <ScrollView style={{marginBottom: 85}}>
                        {
                            this.state.lista.map(obj => (
                                <View key={obj.id} style={{margin: 10}}>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={{fontWeight: "bold", flex: 9}}>{obj.nome_medicamento}</Text>
                                        <TouchableOpacity 
                                            onPress={() => this.deleteEvent(obj.id)}
                                            style={{flex: 1, borderRadius: 5, backgroundColor: "#FFEEEE", justifyContent: "center", alignItems: "center", padding: 5, alignSelf: "flex-end"}}>
                                            <DeleteIcon width={15} height={15}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                    <Text style={{color: "#616161"}}>Dose: </Text>
                                        <Text style={{color: "#616161CC"}}>{obj.qtd_dose +` `+ obj.tipo_dose}</Text>
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={{color: "#616161"}}>Intervalo: </Text>
                                        <Text style={{color: "#616161CC"}}>{obj.qtd_intervalo +` / `+ obj.tipo_intervalo}</Text>
                                    </View>
                                </View>
                            ))   
                        }
                    </ScrollView>
                    <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 5}}>
                        <TouchableOpacity style={{ backgroundColor: "#616161",  padding: 10, marginBottom: 10, borderRadius: 5}} onPress={() => navigate('Home')}>
                            <Text style={{textAlign:"center",color: "#fff",}}>Para iniciar um tratamento vá para o início e pesquisa um medicamento</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                :
                <EmptyResult/>
                }
            </BackgroundImage>
        );
    }
}

export default Agendamento;