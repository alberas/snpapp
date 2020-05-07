import React from 'react';
import {ScrollView, Text, View, Platform, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Icon, Picker, Card, CardItem, Body } from 'native-base';
import  * as COLORS from './constants/colors'
import * as Calendar from 'expo-calendar';
import DatePicker from 'react-native-datepicker';
import * as DataUtil from './util/DataUtil';
import DefaultButton from './components/DefaultButton/DefaultButton';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import NumericInput from './components/NumericInput/NumericInput';

import Pill from '../assets/icons/pills.svg';
import WeatherButton from './components/WeatherButton/WeatherButton';

const retornaDataAtual = () => {
    const dt = new Date();
    const strDt =   dt.getDate() +"/"+ DataUtil.twoDigits(dt.getUTCMonth())  +"/"+ dt.getFullYear();
    return strDt;
}

const incrementDate = (dt, intHours) => {
    const dtNew = new Date(dt + (intHours * 60 * 60 * 1000));
    return dtNew;
}

const convToPt = (dt) => {
    return DataUtil.convToPt(dt);
}

const convToEn = (dtIn) => {
    let aux = dtIn.split(" ");
    let date = aux[0].split("/").reverse().join("-");
    let time = aux[1];

    return date + " " + time;

}

class Agendar extends React.Component{

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
            headerTitle: "Agendar medicação",
            headerLeft: () => (
                <TouchableOpacity style={{borderWidth:1, borderColor: "#FFEEEE", padding: 10, borderRadius: 5, margin: 5}} onPress={()=>navigation.navigate('Home')}>
                    <Image source={require('../assets/icons/ic_keyboard_arrow_left/ic_keyboard_arrow_left_48px.png')}/>
                </TouchableOpacity>
            )
        }
    }
    
    constructor(props){
        super(props);
        this.state = {
            qtdDose: "1",
            tipoDose: "",
            qtdIntervalo: "1",
            tipoIntervalo: "",
            lista: []
        }
    }

    
 
   
    gravar = async () =>{
        if(this.state.dataInicial!="" && this.state.duracao!="" && this.state.intervalo!=""){
            Alert.alert("SINAPSE","Preencha todos os campos");
            return;
        }


        SQLite.openDatabase("", version, description, size)

        var arr = this.createList();

        this.createCalendar(arr).then(
            x => {
                Alert.alert("Sinapse",
                "Calendário atualizado com sucesso.",
                [
                    {text: "OK", onPress: () => this.props.navigation.navigate('Agendamento') }
                ]
                )
            }
        );
    }

    getDefaultCalendar = async () => {
        //const calendars = await Calendar.getCalendarsAsync();
        //const defaultCalendars = calendars.filter(each => each.source.type === 'caldav');
        //return defaultCalendars[0];
        const cal = await Calendar.getDefaultCalendarAsync();
        return cal;
    }

    createCalendar = async (arr) => {
        const { status } = await Calendar.requestPermissionsAsync();
        var newEvent = null;
        if (status === 'granted') {
            var c = 1;
            const defaultCalendar = await Calendar.getDefaultCalendarAsync().then(
                fn = async(t) => {
                    arr = Array.from(arr);
                    arr.map(async(obj) => {
                        newEvent = await Calendar.createEventAsync(t.id, {
                            title: calendarPrefix + ' ' + c++ + '. ' + this.props.navigation.getParam("nomeMedicamento"),
                            startDate : obj,
                            endDate: obj,
                            alarms:  [
                                { relativeOffset: -1 }
                            ]
                        });
                    });
                }
            );
            return newEvent;
        }
    }
    
    
    

    confirmar = () => {
        
        if(this.state.dataInicial!="" && this.state.duracao!="" && this.state.intervalo!=""){
            var list = this.createList();
            return this.renderList(list);
        }else{
            return null;
        }
    }

    createList = () => {
        var arr = [];
        const d = Date.now();
        const df = incrementDate(d, this.state.duracao * 24);
        for(var i=d; i < df.getTime(); i = i + (this.state.intervalo * 60 * 60 * 1000)){
            const aux = new Date(i);
            arr.push(aux);
        }
        return arr;
    }

    createAlarmList = (arr) => {
        var ret = [];
        arr = Array.from(arr);
        arr.map(t => {
            const aux = {
                absoluteDate: t
            }
            ret.push(aux);
        })
        return ret;
    }

    renderList = (arr) => {
        if(arr.length > 0){
            var c = 0;
            return(
                <View>
                    <Card>
                        {
                        arr.map(t => 
                            <CardItem  key={c++} style={{borderBottomColor: COLORS.BUTTON_BACKGROUND_COLOR, borderBottomWidth: 1, borderRadius: 0}}>
                                <Text>{c}. {convToPt(t)}</Text>
                            </CardItem>
                            
                            )
                        }
                    </Card>
                </View>
            );
        }else{
            return null;
        }
    }

    setQtdDose = (qtd) => {
        this.setState({qtdDose: qtd});
    }
    setQtdIntervalo = (qtd) => {
        this.setState({qtdIntervalo: qtd});
    }

    render(){
        var idMedicamento = this.props.navigation.getParam('idMedicamento');
        var nomeMedicamento = this.props.navigation.getParam('nomeMedicamento');
        const dataAtual = retornaDataAtual() +  " 00:00";
        const dataFinal = incrementDate(Date.now(), 60 * 24);
        return (
            <BackgroundImage>
                <ScrollView style={{marginBottom: 85}}>
                    <View>
                        <View style={{padding: 10}}>
                            <Text style={{color:"#616161B3", fontSize:15, marginBottom:10}}>Medicamento</Text>
                            <View style={{flexDirection: "row"}}>
                                <View style={{borderRadius: 5, backgroundColor: "#FFEEEE", justifyContent: "center", alignItems: "center", padding: 5}}>
                                    <Pill width={20} height={20}/>
                                </View>
                                <Text style={{color: "#242424", fontSize:25, fontWeight: "bold", marginLeft: 10}}>{nomeMedicamento}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <View style={{margin: 10, flex: 5}}>
                                <Text style={{color:"#616161B3", fontSize:15, marginBottom:10}}>Dose</Text>
                                <NumericInput setValor={this.setQtdDose} valor={this.state.qtdDose}/>
                            </View>
                            <View style={{margin: 10, flex: 5}}>
                            </View>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <View style={{margin: 10, flex: 5}}>
                                <Text style={{color:"#616161B3", fontSize:15, marginBottom:10}}>Intervalo</Text>
                                <NumericInput setValor={this.setQtdIntervalo} valor={this.state.qtdIntervalo}/> 
                            </View>
                            <View style={{margin: 10, flex: 5}}>
                                <Picker>

                                </Picker>
                            </View>
                        </View>
                        <View style={{padding: 10, flexDirection: "row", justifyContent: "space-between"}}>
                            <WeatherButton label="Manhã"/>
                            <WeatherButton label="Tarde"/>
                            <WeatherButton label="Noite"/>
                            <WeatherButton label="Madrugada"/>
                        </View>

                    </View>
                    { this.confirmar() }
                </ScrollView>
                <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 5}}>
                    <DefaultButton onPress={() => this.gravar()} label="Agendar"/>
                </View>
                </BackgroundImage>
        );
    }

}

const styles = StyleSheet.create({
    box: {
        alignSelf: "stretch",
        borderWidth: 1,
        borderRadius: 4, 
        borderColor: "lightgray",
        fontSize: 20, 
        padding: 5,
        marginBottom: 10
    }
});

export default Agendar;
