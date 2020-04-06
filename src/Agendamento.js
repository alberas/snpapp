import React from 'react';
import {ScrollView, Text, View, Alert } from 'react-native';
import { Icon, Button } from 'native-base';
import AppLogo from './components/AppLogo/AppLogo';
import  * as COLORS from './constants/colors'
import * as Calendar from 'expo-calendar';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import {EmptyResult} from './components/EmptyResult/EmptyResult';
import * as DataUtil from './util/DataUtil'
import Loader from './Loader';


class Agendamento extends React.Component{

    static navigationOptions  = {
        title: 'Agendamento'
    };
    
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            lista: [],
        };
    }

    componentDidMount = () => {
        this.renderList();
    }

    renderList = () => {
        this.setState({isLoading: true});
        var arr = [];
        Calendar.getDefaultCalendarAsync().then(
            fn = async(t) => {
                await Calendar.getEventsAsync([t.id], new Date("2020-01-01"), new Date("2020-12-31")).then(
                    fn2 = async(t2) => {
                        arr = t2.filter(obj =>  obj.title.indexOf("[sinapse]") >= 0 );
                        this.setState({lista: arr, isLoading: false});
                    }
                )
            }
        )
    }

    deleteEvent = async (eventId) => {
        const ret = await Calendar.deleteEventAsync(eventId).then(
            Alert.alert("SINAPSE", "Lembre excluído", [
                {
                    text: "OK",
                    onPress: () => this.renderList()
                }
            ])
            
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
                <ScrollView style={{flex: 1}}>
                    {
                        this.state.lista.map(obj => (
                            <View key={obj.id} style={{flexDirection: "row", borderBottomWidth:1, padding: 10}}>
                                <View style={{flex:7}}>
                                    <Text style={{fontWeight: "bold"}}>{obj.title}</Text>
                                    <Text>{this.formatDate(obj.startDate)}</Text>
                                </View>
                                <View style={{flex:3}}>
                                    <Button danger style={{justifyContent:"center"}} onPress={() => this.deleteEvent(obj.id)}>
                                        <Text style={{color:"#fff"}}>Excluir</Text>
                                    </Button>
                                </View>
                            </View>
                        ))   
                    }
                </ScrollView>
                :
                <EmptyResult/>
                }
            </BackgroundImage>
        );
    }
}

export default Agendamento;