import React from 'react';
import { Platform, View, StyleSheet,  Text, Image } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as actions from './src/store/actions';
import store from './src/store/reducer';

import Home from './src/Home';
import BuscaFarmacia from './src/BuscaFarmacia';
import BuscaMedicamento from './src/BuscaMedicamento';
import BuscaPaciente from './src/BuscaPaciente';
import Scan from './src/Scan';
import Arquivo from './src/Arquivo';
import Login from './src/Login';



export default class App extends React.Component {
  
  state = {
      currentScreen: actions.HOME
  }

  isUserLogged = (props) => {
      const isLogged = props.isLogged;
      if(isLogged){
          return <Home/>;
      }else{
          return <Login/>;
      }
  }

  switchScreen = (currentScreen) => {
      this.setState({currentScreen});
  }

  renderScreen = () => {
      switch(this.state.currentScreen){
          case actions.HOME:
              return(
                  <Home switchScreen={this.switchScreen}/>
              )
          case actions.MEDICAMENTOS:
              return(
                  <BuscaMedicamento switchScreen={this.switchScreen}/>
              )
          case actions.LOCAIS:
              return(
                  <BuscaFarmacia switchScreen={this.switchScreen}/>
              )
          case actions.PACIENTES:
              return(
                  <BuscaPaciente switchScreen={this.switchScreen}/>
              )
          case actions.ARQUIVO:
              return(
                  <Arquivo switchScreen={this.switchScreen}/>
              )
        case actions.RECEITA_ENVIAR:
              return(
                  <Scan switchScreen={this.switchScreen}/>
              )
          default:
              return(
                  <Home switchScreen={this.switchScreen}/>
              )
      }
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
            {this.isUserLogged(false)}
        </View>
      </Provider>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    color: '#fff',
    marginTop: Platform.OS === "android" ? 24 : 0
  }
  
});