import React from 'react';
import {ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Picker } from 'native-base';
import SectionTitle from './components/SectionTitle/SectionTitle';
import AppLogo from './components/AppLogo/AppLogo';
import  * as COLORS from './constants/colors'
import * as Calendar from 'expo-calendar';
import { FileSystem } from 'react-native-unimodules';


class Agendamento2 extends React.Component{

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

    state = {
        dias: [
            {id: 0, nome: "Domingo", abreviacao: "D", checked: false},
            {id: 1, nome: "Segunda", abreviacao: "S", checked: false},
            {id: 2, nome: "Terça", abreviacao: "T", checked: false},
            {id: 3, nome: "Quarta", abreviacao: "Q", checked: false},
            {id: 4, nome: "Quinta", abreviacao: "Q", checked: false},
            {id: 5, nome: "Sexta", abreviacao: "S", checked: false},
            {id: 6, nome: "Sábado", abreviacao: "S", checked: false},
        ],
        horarioInicial: new Date(),
        horarioFinal: new Date(),
        horario: "",
        intervalo: 1,
        results: []
    }


    selecionaDia = (idDiaSemana) => {
        const dayIndex = this.state.dias.findIndex(item => {return item.id === idDiaSemana});
        if(dayIndex>=0){
            const day = {...this.state.dias[dayIndex]};
            day.checked = !day.checked;
            const aux = [...this.state.dias];
            aux[dayIndex] = day;
            this.setState({dias:  aux});
        }
    }
    
    trocaSelecaoDia = () => {
        return (
            this.state.dias.map((t)=>{
                if(t.checked){
                    return this.itemChecked(t);
                }else{
                    return this.itemUnchecked(t);
                }
            }
            )
        );
    }

    itemChecked = (obj) => {
        return(<TouchableOpacity 
            style={style.dayOfWeekChecked} 
            key={obj.id} 
            onPress={() => this.selecionaDia(obj.id)}>
            <Text>{obj.abreviacao}</Text>
        </TouchableOpacity>);
    }
    itemUnchecked = (obj) => {
        return (<TouchableOpacity 
                    style={style.dayOfWeekUnChecked} 
                    key={obj.id} 
                    onPress={() => this.selecionaDia(obj.id)}>
                    <Text>{obj.abreviacao}</Text>
        </TouchableOpacity>);
    }

    adicionaHorario = () => {
        if(this.state.horario===""){
            return;
        }
        const aux = [...this.state.horarios];
        aux.push(this.state.horario);
        this.setState({...this.state, horarios: aux, horario: ""});
    }
    removeHorario = (index) => {
        const aux = [...this.state.horarios];
        aux.splice(index, 1);
        this.setState({...this.state, horarios: aux});
    }

    gravar = async () =>{
        let details = {
            title: 'myCalendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.REMINDER,
            sourceId: 'my_calendar_1'
        };

        const { status } = await Calendar.requestRemindersPermissionsAsync();
        if (status === 'granted') {
            //const calendars = await Calendar.getCalendarsAsync();
            const reminder = await Calendar.getReminderAsync('my_calendar_1')
                .then( event => {
                    console.log(event);
                  })
                  .catch( error => {
                    console.log(error);
                  });
            /*
            const newReminder = await Calendar.createReminderAsync('my_calendar_1', details)
            .then( event => {
                console.log(event);
                this.setState({...this.state, results: event });
              })
              .catch( error => {
                console.log(error);
                this.setState({...this.state, results: error });
              });
              */
        }
    }
    
    

    render(){
        var idMedicamento = this.props.navigation.getParam('idMedicamento');
        var nomeMedicamento = this.props.navigation.getParam('nomeMedicamento');
        return (
            <View style={{flex:1}}>

                <ScrollView>
                    <Text style={style.tituloTela}>{nomeMedicamento}</Text>
                    <SectionTitle texto="Dias da semana"/>
                    <View style={style.dias}>
                        { this.trocaSelecaoDia() }
                    </View>
                    <SectionTitle texto="Dia/Horário inicial"/>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <DatePicker
                            date={this.state.horarioInicial}
                            onDateChange={date => this.setState({...this.state, horarioInicial: date })}
                            locale="br"
                            />
                        <DatePicker
                            date={this.state.horarioFinal}
                            onDateChange={date => this.setState({...this.state, horarioFinal: date })}
                            locale="br"
                            />
                    </View>
                    <SectionTitle texto="Intervalo"/>
                    <View style={{flex: 1}}>
                        <Picker
                            headerBackButtonText=""
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
                    <Text>{this.state.results.length}</Text>
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

export default Agendamento2;