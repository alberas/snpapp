import React from 'react';
import {ScrollView, Text, View, Platform, TextInput, StyleSheet, Alert } from 'react-native';
import { Icon, Picker, Card, CardItem, Body } from 'native-base';
import  * as COLORS from './constants/colors'
import * as Calendar from 'expo-calendar';
import DatePicker from 'react-native-datepicker';
import * as DataUtil from './util/DataUtil';
import DefaultButton from './components/DefaultButton/DefaultButton';

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


const INITIAL_STATE = {
    dataInicial: "",
    duracao: "",
    intervalo: "",
    lista: []
}

const calendarPrefix = "[sinapse]";

class Agendar extends React.Component{

    static navigationOptions =  {
        title: 'Agendamento'
    };
    
    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE};
    }

    
    /*
    gravar = async () =>{
        let details = {
            title: calendarPrefix + 'Lembrete ' + this.props.navigation.getParam('nomeMedicamento'),
            color: 'blue',
            entityType: Calendar.EntityTypes.ALARM,
            sourceId: calendarPrefix + this.props.navigation.getParam('idMedicamento')
        };

        const { status } = await Calendar.requestRemindersPermissionsAsync();
        if (status === 'granted') {
            const evento = null;
            const calendars = await Calendar.getReminderAsync(details.sourceId)
              .then( event => {
                    evento = event;
                    console.log("[1]" + event);
                })
                .catch( error => {
                    console.log("[2]" + error);
                });
                
            console.log(evento);
            if(evento==null){
                const newReminder = await Calendar.createReminderAsync(null, details)
                    .then( event => {
                        console.log("[3]" + event);
                        this.setState({...this.state, results: event });
                    })
                    .catch( error => {
                        console.log("[4]" + error);
                        this.setState({...this.state, results: error });
                    });
            }
             
        }
    }
    */
   
    gravar = async () =>{
        if(this.state.dataInicial!="" && this.state.duracao!="" && this.state.intervalo!=""){
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
        const d = Date.parse(convToEn(this.state.dataInicial));
        const df = incrementDate(d, this.state.duracao * 24);
        for(i=d; i < df.getTime(); i = i + (this.state.intervalo * 60 * 60 * 1000)){
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

    render(){
        var idMedicamento = this.props.navigation.getParam('idMedicamento');
        var nomeMedicamento = this.props.navigation.getParam('nomeMedicamento');
        const dataAtual = retornaDataAtual() +  " 00:00";
        const dataFinal = incrementDate(Date.now(), 60 * 24);
        return (
            <View style={{flex:1}}>
                <ScrollView style={{marginBottom: 85}}>
                    <Card>
                        <CardItem header bordered>
                            <Text style={{textAlign: "center"}}>{nomeMedicamento}</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <View style={styles.box}>
                                    <DatePicker
                                        style={{width: 200, margin: 5, padding:0, borderWidth: 0}}
                                        date={this.state.dataInicial}
                                        mode="datetime"
                                        placeholder="Dia/Horário inicial"
                                        format="DD/MM/YYYY HH:mm"
                                        minDate={dataAtual}
                                        maxDate={dataFinal}
                                        confirmBtnText="Confirmar"
                                        cancelBtnText="Cancelar"
                                        showIcon={false}
                                        is24Hour={true}
                                        customStyles={{
                                            dateInput: {
                                                borderWidth: 0,
                                                marginLeft:0,
                                                paddingLeft:0,
                                                alignItems: 'flex-start'
                                            }
                                        }}
                                        onDateChange={(d) => {this.setState({dataInicial: d})}}
                                    />
                                    <Icon name="alarm"  style={{position: "absolute", right: 15, top: 10}}/>
                                </View>
                                <View style={styles.box}>
                                    <TextInput
                                        placeholder="Durção (em dias)"
                                        keyboardType="numeric"
                                        style={{width: 200, padding: 10}}
                                        value={this.state.duracao}
                                        onChangeText={(p) => this.setState({duracao: p})}/>
                                    <Icon type="FontAwesome" name="fast-forward"  style={{position: "absolute", right: 10, top: 10}}/>
                                </View>
                                <View style={styles.box}>
                                    <Picker
                                        placeholder="Intervalo"
                                        headerBackButtonText="Intervalo"
                                        iosHeader="Selecione o intervalo"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{margin: 0, padding: 0 }}
                                        selectedValue={this.state.intervalo}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({intervalo: itemValue})
                                        }>
                                        <Picker.Item label="1 hora" value="1" />
                                        <Picker.Item label="2 horas" value="2" />
                                        <Picker.Item label="4 horas" value="4" />
                                        <Picker.Item label="6 horas" value="6" />
                                        <Picker.Item label="8 horas" value="8" />
                                        <Picker.Item label="12 horas" value="12" />
                                        <Picker.Item label="24 horas" value="24" />
                                    </Picker>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                    { this.confirmar() }
                </ScrollView>
                <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 5}}>
                    <DefaultButton onPress={() => this.gravar()} label="Agendar" fontSize="2"/>
                </View>
            </View>
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
