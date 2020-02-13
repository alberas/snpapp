import React from 'react';
import {ScrollView, Text, View, TextInput, FlatList} from 'react-native';
import  * as COLORS from './constants/colors'
import AppLogo from './components/AppLogo/AppLogo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import RNCalendarEvents from 'react-native-calendar-events';


class Agendamento extends React.Component{

    static navigationOptions = {
        title: 'Agendamento',
        headerTitle: () => <AppLogo />,
        headerStyle: {
            backgroundColor: COLORS.HEADER_BACKGROUND_COLOR,
        },
        headerTintColor: COLORS.HEADER_FONT_COLOR,
        headerTitleStyle: {
            fontWeight: 'bold',
            color: COLORS.HEADER_FONT_COLOR
        },
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
        horario: "",
        horarios: []
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

    exibirHorarios = () => {
        return (
            this.state.horarios.map((item, index) => (
                <TouchableOpacity
                    onPress={() => this.removeHorario(index)} 
                    key={index}
                    style={style.itemHorario}>
                    <Text style={{fontSize: 30}}>{item}</Text>
                </TouchableOpacity>
            ))
        );
    }

    gravar = () =>{
        /*
        RNCalendarEvents.saveEvent(this.props.navigation.getParam('nomeMedicamento'), {

        });
        */

        
    }
    
    render(){
        var idMedicamento = this.props.navigation.getParam('idMedicamento');
        var nomeMedicamento = this.props.navigation.getParam('nomeMedicamento');
        return (
            <ScrollView style={{flex: 0}}>
                <Text style={style.tituloTela}>{nomeMedicamento}</Text>
                <View style={{flex: 1}}>
                    <Text style={style.titulo}>Dias da semana</Text>
                    <View style={style.dias}>
                        { this.trocaSelecaoDia() }
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <Text style={style.titulo}>Horários</Text>
                    <View style={{flexDirection: "row"}}>
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'HH:mm'
                            }}
                            value={this.state.horario}
                            onChangeText={text => this.setState({...this.state, horario: text})}
                            style={style.input}
                            maxLength={5}/>
                            <TouchableOpacity
                                onPress={() => this.adicionaHorario()}
                                style={style.btnAdicionarHorario}
                                >
                                <Text style={{fontSize: 35}}> + </Text>
                            </TouchableOpacity>
                    </View>
                    <View>
                        {this.exibirHorarios()}
                    </View>
                </View>
                <View style={{flex:1,marginTop: 100, alignItems: "center" }}>
                    <TouchableOpacity style={{backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR, padding: 15, borderRadius: 15}}><Text style={{fontSize: 30}}>Agendar</Text></TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const style = {
    tituloTela: {
        fontSize: 40, 
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
    }
}

export default Agendamento;