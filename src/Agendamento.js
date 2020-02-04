import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import  * as COLORS from './constants/colors'
import AppLogo from './components/AppLogo/AppLogo';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    

    render(){
        var idMedicamento = this.props.navigation.getParam('idMedicamento');
        var nomeMedicamento = this.props.navigation.getParam('nomeMedicamento');

        return (
            <ScrollView>
                <Text style={{fontSize: 20}}>{nomeMedicamento}</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity style={style.dayOfWeek}><Text>S</Text></TouchableOpacity>
                    <TouchableOpacity style={style.dayOfWeek}><Text>T</Text></TouchableOpacity>
                    <TouchableOpacity style={style.dayOfWeek}><Text>Q</Text></TouchableOpacity>
                    <TouchableOpacity style={style.dayOfWeek}><Text>Q</Text></TouchableOpacity>
                    <TouchableOpacity style={style.dayOfWeek}><Text>S</Text></TouchableOpacity>
                    <TouchableOpacity style={style.dayOfWeek}><Text>S</Text></TouchableOpacity>
                    <TouchableOpacity style={style.dayOfWeek}><Text>D</Text></TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const style = {
    dayOfWeek: {
        borderWidth: 1,
        margin: 5,
        padding: 5,
        width: 50,
        height: 50,
        fontSize: 15
        
    },

    dayOfWeekUNChecked: {
        backgroundColor: '#DCDCDC'
    },

    dayOfWeekChecked: {
        backgroundColor: '#B0C4DE'
    }
}

export default Agendamento;