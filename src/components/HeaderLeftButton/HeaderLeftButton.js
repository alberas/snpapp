import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';

const HeaderLeftButton = (props) => {
    console.log(props.x);
    return  (
        <TouchableOpacity style={{borderWidth:1, borderColor: "#FFEEEE", padding: 10, borderRadius: 5, margin: 5}}>
            <Image source={require('../../../assets/icons/ic_keyboard_arrow_left/ic_keyboard_arrow_left_48px.png')}/>
        </TouchableOpacity>
    )
}

export default HeaderLeftButton;