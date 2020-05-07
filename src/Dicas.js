import React from 'react';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import { EmptyResult } from './components/EmptyResult/EmptyResult';
import { View, TouchableOpacity, Image, Text, Picker } from 'react-native';
import  * as COLORS from './constants/colors'
import { TextInput } from 'react-native-gesture-handler';

 const Dicas = ({navigation}) =>{

    return (
        <BackgroundImage>
            <View style={{display: "flex", flex: 3, paddingLeft:10, paddingRight: 10, paddingBottom: 20, backgroundColor: COLORS.HEADER_BACKGROUND_COLOR, borderBottomRightRadius: 40}}>
                <View style={{flexDirection: "row", marginBottom: 30}}>
                    <TouchableOpacity style={{borderWidth:1, borderColor: "#FFEEEE", padding: 10, borderRadius: 5, margin: 5}} onPress={()=>navigation.navigate('Home')}>
                        <Image source={require('../assets/icons/ic_keyboard_arrow_left/ic_keyboard_arrow_left_48px.png')}/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 32, color: '#FFFFFF', marginLeft: 10}}>Dicas de saúde</Text>
                </View>
                <View>
                    <View style={{borderWidth: 1, borderColor: "#F3F3F3", borderRadius: 5, margin: 10}}>
                        <TextInput style={{height:40, padding:5, fontSize:20}} placeholder="Selecione a categoria"/>
                    </View>
                    <View style={{borderWidth: 1, borderColor: "#F3F3F3", borderRadius: 5, margin: 10}}>
                        <TextInput style={{height:40, padding:5, fontSize:20}} placeholder="Digite algo para pesquisar"/>
                    </View>
                </View>
            </View>
            <View style={{flex: 7}}>
                <EmptyResult/>
            </View>
        </BackgroundImage>
    );
}

Dicas.navigationOptions = ({navigation}) => ({
    headerShown: false
});

export default Dicas;


