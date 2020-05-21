import React from 'react';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import { TouchableOpacity, Image } from 'react-native';

const DescontoDetalhe = (props) => {

    const {navigation} = props.navigation;

    return (
        <BackgroundImage></BackgroundImage>
    )
    
}

DescontoDetalhe.navigationOptions =({navigation}) => {
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
        headerTitle: "Descrição da promoção",
        headerLeft: () => 
            <TouchableOpacity style={{borderWidth:1, borderColor: "#FFEEEE", padding: 10, borderRadius: 5, margin: 5}} onPress={()=>navigation.goBack()}>
                <Image source={require('../assets/icons/ic_keyboard_arrow_left/ic_keyboard_arrow_left_48px.png')}/>
            </TouchableOpacity>
    }
}

export default DescontoDetalhe;