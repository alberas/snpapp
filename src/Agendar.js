import React from 'react';
import {ScrollView, Text, View, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Icon, Picker } from 'native-base';
import * as DataUtil from './util/DataUtil';
import DefaultButton from './components/DefaultButton/DefaultButton';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import NumericInput from './components/NumericInput/NumericInput';

import Pill from '../assets/icons/pills.svg';
import WeatherButton from './components/WeatherButton/WeatherButton';

import AgendamentoDAO from "./dao/AgendamentoDAO";



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

    constructor(props){
        super(props);
        this.state = {
            msg: "",
            idMedicamento: 0,
            nomeMedicamento: "",
            qtdDose: "1",
            tipoDose: "Capsula",
            qtdIntervalo: "1",
            tipoIntervalo: "Dia",
            lista: []
        }

        
    }

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
    
    

    componentDidMount = () => {
        this.setState({
            idMedicamento: this.props.navigation.getParam('idMedicamento'),
            nomeMedicamento: this.props.navigation.getParam('nomeMedicamento'),
        });
    }
 
   
    gravar = async () =>{
        const {navigate} = this.props.navigation;
        if(this.state.qtdDose=="" || this.state.tipoDose=="" || this.state.qtdIntervalo=="" || this.state.tipoIntervalo==""){
            this.setState({msg: "Preencha todos os campos"});
        }

              
        const agendamentoDAO = new AgendamentoDAO();
        agendamentoDAO.inserir([
                this.state.idMedicamento,
                this.state.nomeMedicamento,
                this.state.qtdDose,
                this.state.tipoDose,
                this.state.qtdIntervalo,
                this.state.tipoIntervalo
            ], 
            () => {
                navigate('Agendamento')
            }, (erro) => {
                this.setState({msg: erro});
            }
        )
    }


    setQtdDose = (qtd) => {
        this.setState({qtdDose: qtd});
    }
    setQtdIntervalo = (qtd) => {
        this.setState({qtdIntervalo: qtd});
    }

    onTipoDoseChange = (value) => {
        this.setState({
          tipoDose: value
        });
    }
    onTipoIntervaloChange = (value) => {
        this.setState({
          tipoIntervalo: value
        });
    }

    render(){
        var idMedicamento = this.state.idMedicamento;
        var nomeMedicamento = this.state.nomeMedicamento;
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
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined,  borderColor: "#F3F3F3", borderWidth: 1, borderRadius: 5, marginTop: 25, padding: 0 }}
                                    selectedValue={this.state.tipoDose}
                                    onValueChange={this.onTipoDoseChange.bind(this)}
                                    >
                                    <Picker.Item label="Capsula" value="Capsula" />
                                    <Picker.Item label="Gota" value="Gota" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <View style={{margin: 10, flex: 5}}>
                                <Text style={{color:"#616161B3", fontSize:15, marginBottom:10}}>Intervalo</Text>
                                <NumericInput setValor={this.setQtdIntervalo} valor={this.state.qtdIntervalo}/> 
                            </View>
                            <View style={{margin: 10, flex: 5}}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined,  borderColor: "#F3F3F3", borderWidth: 1, borderRadius: 5, marginTop: 25, padding: 0 }}
                                    selectedValue={this.state.tipoIntervalo}
                                    onValueChange={this.onTipoIntervaloChange.bind(this)}
                                    >
                                    
                                    <Picker.Item label="Hora" value="Hora" />
                                    <Picker.Item label="Dia" value="Dia" />
                                    <Picker.Item label="Semana" value="Semana" />
                                    <Picker.Item label="Mês" value="Mês" />
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
                </ScrollView>
                <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 5}}>
                    <DefaultButton onPress={() => this.gravar()} label="Agendar"/>
                </View>
                {this.state.msg != "" ?
                <Text style={{textAlign:"center", color:"red"}}>{msg}</Text>
                :
                null
                }
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
