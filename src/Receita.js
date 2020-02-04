import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import Medicamento from "./Medicamento";
import  * as COLORS from './constants/colors'
import AppLogo from "./components/AppLogo/AppLogo";

class Receita extends React.Component {
  
  static navigationOptions = {
    title: 'Detalhamento',
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
      return (<Medicamento dados={this.state.dataSource} navigation={this.props.navigation}/>);
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