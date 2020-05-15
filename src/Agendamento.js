import React from 'react';
import {ScrollView, Text, View, Alert, TouchableOpacity, Image } from 'react-native';
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

const db = SQLite.openDatabase("Agendamento.db", 1);


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
        };

        db.transaction(tx => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS agendamento(id integer primary key not null, qtd_dose, tipo_dose, qtd_intervalo, tipo_intervalo)");
        });
    }

    componentDidMount = () => {
        this.renderList();
    }

    renderList = () => {
        this.setState({isLoading: true});
        var arr = [];
        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM agendamento",
                [], 
                (_, {rows}) => {
                  this.setState({lista: rows._array, isLoading: false})
                }
                ,
                (tx, erro) =>  {
                    console.log(erro) 
            });
        });
    }

    deleteEvent = async (eventId) => {
        db.transaction(
            tx => {
                tx.executeSql("DELETE FROM agendamento WHERE id = ?", [eventId],
                (tx, result) => {
                    this.renderList()
                }
            )
            }
        )
    }
    
    formatDate = (str) => {
        const dt = new Date(str);
        return DataUtil.convToPt(dt);
    }
    
    render(){
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
                        <DefaultButton onPress={() => this.props.navigation.navigate('Home') } label="Agendar"/>
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