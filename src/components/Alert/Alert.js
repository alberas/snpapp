import React, { useState, useEffect } from 'react';
import { View, Dimensions } from "react-native"

const w = Math.round(Dimensions.get('window').width);

const Alert = (props) => {

    return (
        <View style={{position: "fixed", width: w - 40, alignSelf:"center", height: 300, borderWidth: 1, borderRadius: 15, borderColor: "#F3F3F3", padding: 15, top: 10}}>
            {props.children}
        </View>
    )
}

export default Alert;