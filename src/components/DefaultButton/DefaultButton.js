import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as COLORS from '../../constants/colors';
import { Icon } from 'native-base';

const showIcon = (iconName) => {
    if(iconName!=""){
        return <Icon name={iconName} style={{position: "absolute", left: 5}}/>
    }else{
        return null;
    }
}

const showLabel = (label, fontSize) => {
    var fs = 20;
    if(fontSize==="2"){ 
        fs = 25;
    }
    if(label!=""){
        return <Text style={{color: COLORS.BUTTON_FONT_COLOR, textAlign: "center", fontSize: fs}}>{label}</Text>
    }
}
export default function DefaultButton({label, icon, onPress, fontSize}){
    return(
        <TouchableOpacity
                    style={{backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR, borderWidth:1, borderColor: COLORS.BUTTON_BORDER_COLOR, flexDirection: "row", padding: 5, alignSelf: "stretch", justifyContent: "center", margin: 1}}
                    onPress={()=>{ onPress() }}
            >{showIcon(icon)}{showLabel(label, fontSize)}
        </TouchableOpacity>
    );
}


