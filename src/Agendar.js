import React from 'react';
import {ScrollView, Text, View, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Picker } from 'native-base';
import SectionTitle from './components/SectionTitle/SectionTitle';
import AppLogo from './components/AppLogo/AppLogo';
import  * as COLORS from './constants/colors'
import * as Calendar from 'expo-calendar';
import DatePicker from 'react-native-datepicker';

const retornaDataAtual = () => {
    const dt = new Date();
    const strDt =   dt.getFullYear()+ "-" +  ("0" + (dt.getUTCMonth() + 1)).substring(-2)  + "-" +  dt.getDate();
    return strDt;
}

const INITIAL_STATE = {
    dias: [
        {id: 0, nome: "Domingo", abreviacao: "D", checked: false},
        {id: 1, nome: "Segunda", abreviacao: "S", checked: false},
        {id: 2, nome: "Terça", abreviacao: "T", checked: false},
        {id: 3, nome: "Quarta", abreviacao: "Q", checked: false},
        {id: 4, nome: "Quinta", abreviacao: "Q", checked: false},
        {id: 5, nome: "Sexta", abreviacao: "S", checked: false},
        {id: 6, nome: "Sábado", abreviacao: "S", checked: false},
    ],
    horarioInicial: retornaDataAtual(),
    horarioFinal: retornaDataAtual(),
    horario: "",
    intervalo: 1,
    results: [],
    isDatePickerVisible: false,
    date: "", 
    h1: "" 
}
class Agendar extends React.Component{

    static navigationOptions  = ({navigation}) => {
            return {
            title: 'Agendamento',
            headerTitle: () => <AppLogo />,
            headerLeft: () => {
                return (<Icon name="arrow-back" onPress={() => navigation.goBack()} style={{margin: 5}}/>)
            },
            headerStyle: {
                backgroundColor: COLORS.HEADER_BACKGROUND_COLOR,
            },
            headerTintColor: COLORS.HEADER_FONT_COLOR,
            headerTitleStyle: {
                fontWeight: 'bold',
                color: COLORS.HEADER_FONT_COLOR
            }
        }
    };
    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE};
        //console.log(INITIAL_STATE);
    }

    
    /*
    gravar = async () =>{
        let details = {
            title: 'Lembrete ' + this.props.navigation.getParam('nomeMedicamento'),
            color: 'blue',
            entityType: Calendar.EntityTypes.REMINDER,
            sourceId: 'lembrete_' + this.props.navigation.getParam('idMedicamento')
        };

        const { status } = await Calendar.requestRemindersPermissionsAsync();
        if (status === 'granted') {
            //const evento = null;
            //const calendars = await Calendar.getReminderAsync(details.sourceId)
            //  .then( event => {
            //        evento = event;
            //        console.log("[1]" + event);
            //    })
            //    .catch( error => {
            //        console.log("[2]" + error);
            //    });
            //    
            //console.log(evento);
            //if(evento==null){
                const newReminder = await Calendar.createReminderAsync(null, details)
                    .then( event => {
                        console.log("[3]" + event);
                        this.setState({...this.state, results: event });
                    })
                    .catch( error => {
                        console.log("[4]" + error);
                        this.setState({...this.state, results: error });
                    });
            //}
             
        }
    }
    */
    gravar = async () =>{
        this.createCalendar().then(
            x => {
                console.log(`Your new calendar ID is: ${x}`);
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

    createCalendar = async () => {
        const { status } = await Calendar.requestPermissionsAsync();
        if (status === 'granted') {
            const defaultCalendar = await this.getDefaultCalendar();
            const defaultCalendarSource =
            Platform.OS === 'ios'
                ? await defaultCalendar.source
                : { isLocalAccount: true, name: 'Sinapse Calendário' };
                

            const newEvent = await Calendar.createEventAsync(defaultCalendar.id, {
                title: this.props.navigation.getParam("nomeMedicamento"),
                startDate : new Date(),
                endDate: this.incrementDate((new Date()),2),
            });
            
            

            return newEvent;
        }
    }
    
    showDatePicker = () => {
        this.setState({isDatePickerVisible: true});
    };
    
    hideDatePicker = () => {
        this.setState({isDatePickerVisible: false});
    };

    handleConfirm = date => {
        console.warn("A date has been picked: ", date);
        this.hideDatePicker();
    };
    
    incrementDate = (dt, intHours) => {
        const dtNew = new Date();
        dtNew.setTime(dt.getTime() + (intHours * 60 * 60 * 1000));
        return dtNew;
    }
    render(){
        var idMedicamento = this.props.navigation.getParam('idMedicamento');
        var nomeMedicamento = this.props.navigation.getParam('nomeMedicamento');
        return (
            <View style={{flex:1}}>
                <ScrollView style={{marginBottom: 85}}>
                    <Text style={style.tituloTela}>{nomeMedicamento}</Text>
                    
                    <SectionTitle texto="Dia/Horário inicial"/>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.date}
                            mode="date"
                            placeholder="SELECIONE A DATA"
                            format="YYYY-MM-DD"
                            minDate={retornaDataAtual()}
                            maxDate="2016-05-01"
                            confirmBtnText="Confirma"
                            cancelBtnText="Cancela"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(d) => {this.setState({date: d})}}
                        />
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.h1}
                            mode="time"
                            placeholder="SELECIONE A DATA"
                            confirmBtnText="Confirma"
                            cancelBtnText="Cancela"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(d) => {this.setState({h1: d})}}
                        />
                    </View>
                    <SectionTitle texto="Intervalo"/>
                    <View style={{flex: 1}}>
                        <Picker
                            placeholder=""
                            headerBackButtonText="Selecione o intervalo"
                            iosHeader="Selecione o intervalo"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
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
                    <View>
                        <Text>{JSON.stringify(this.state.results)}</Text>
                    </View>
                </ScrollView>
                <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
                    <TouchableOpacity 
                        style={{backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR, padding: 10, margin: 5, flex: 1, alignItems: "center"}}
                        onPress={() => this.gravar()}>
                        <Text style={{fontSize: 25}}>Agendar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const style = {
    tituloTela: {
        fontSize: 30, 
        alignSelf: "center", 
        padding: 10, 
        textDecorationLine: "underline"
    },
    titulo:{
        textDecorationLine: "underline", 
        fontSize: 25
    },
    input:{
        width: 100,
        borderWidth: 1,
        fontSize: 25,
        padding: 5
    },
    btnAdicionarHorario:{
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR,
        height: 50,
        width: 50
    },
    itemHorario:{
        borderWidth: 1,
        padding: 5
    },
    dias:{
        flex: 1, 
        flexDirection: 'row'
    },
    dayOfWeek: {
        borderWidth: 1,
        margin: 3,
        padding: 5,
        width: 45,
        height: 45,
        fontSize: 15,
        alignItems: "center",
        justifyContent: "center"
        
    },

    dayOfWeekUnChecked: {
        borderWidth: 1,
        margin: 3,
        padding: 5,
        width: 45,
        height: 45,
        fontSize: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#DCDCDC'
    },

    dayOfWeekChecked: {
        borderWidth: 1,
        margin: 3,
        padding: 5,
        width: 45,
        height: 45,
        fontSize: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'red'
    },

   
}

export default Agendar;