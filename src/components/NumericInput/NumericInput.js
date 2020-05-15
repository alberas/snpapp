import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";

import PlusIcon from '../../../assets/icons/plus-circle.svg';
import MinusIcon from '../../../assets/icons/minus-circle.svg';


class NumericInput extends React.Component{

    state = {
        valor: "1"
    }

    sendData = () => {
        this.props.setValor(this.state.valor);
   }

   increment = () => {
        this.setState({valor: (parseInt(this.state.valor, 10) + 1).toString()});
        this.sendData();
   }

   decrement = () => {
    this.setState({valor: (parseInt(this.state.valor, 10) - 1).toString()});
    this.sendData();
}

    render = () => {
        return (

            <View style={{alignItems: "center", borderColor: "#F3F3F3", borderWidth: 1, flexDirection: "row", padding: 10, borderRadius: 5}}>
                <MinusIcon width={20} height={20} style={{flex:1}} onPress={() => this.decrement()}/>
                <TextInput style={{flex:8, textAlign: "center"}} value={this.props.valor}/>
                <PlusIcon width={20} height={20} style={{flex:1}} onPress={() => this.increment()}/>
            </View>
        );
    }
}


export default NumericInput;