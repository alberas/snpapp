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
    var fs = 25;
    if(fontSize==="2"){ 
        fs = 35;
    }
    if(label!=""){
        return <Text style={{color: COLORS.BUTTON_FONT_COLOR, textAlign: "center", fontSize: fs}}>{label}</Text>
    }
}
export default function DefaultButton({label, icon, onPress, fontSize}){
    return(
        <TouchableOpacity
                    style={{backgroundColor: COLORS.BUTTON_BACKGROUND_COLOR, borderColor: COLORS.BUTTON_BORDER_COLOR, flexDirection: "row", padding: 15, alignSelf: "stretch", justifyContent: "center", margin: 1, borderRadius: 10}}
                    onPress={()=>{ onPress() }}
            >{showIcon(icon)}{showLabel(label, fontSize)}
        </TouchableOpacity>
    );
}


