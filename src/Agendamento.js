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


const DBNAME = "ItemAgenda";

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
    }

    componentDidMount = () => {
        this.renderList();
    }

    renderList = () => {
        this.setState({isLoading: true});
        var arr = [];
        SQLite.openDatabase(DBNAME,1);
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