import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import Medicamento from "./Medicamento";

class Receita extends React.Component {
  
    constructor(props){
      super(props);
      this.state = { isLoading: true}
  }

  componentDidMount(){
    var id = this.props.navigation.getParam('id'); 

    return fetch("http://www.snpmed.com.br/api/protocolo/" + id + "/medicamentos")
        .then((response) => response.json())
        .then((responseJson) => {

          this.setState({
              isLoading: false,
              dataSource: responseJson.Data,
          }, function(){
          });

        })
        .catch((error) =>{
            console.error(error);
        });
  }
      

  renderData = () => {
    if(this.state.isLoading){
        return(
            <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
            </View>
        );
    }else{
      console.log(this.state.dataSource);
      return (<Medicamento dados={this.state.dataSource}/>);
    }
  }

  render = () => {
    
    
    return (
      <View style={{ flex: 1 }}>
        {this.renderData()}
      </View>
    );
  }
}

export default Receita;