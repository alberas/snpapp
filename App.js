import React from 'react';
import { Provider } from 'react-redux';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import * as actions from './src/store/actions';
import store from './src/store/reducer';

import Home from './src/Home';
import Login from './src/Login';
import Arquivo from './src/Arquivo';
import Arquivos from './src/Arquivos';
import BuscaFarmacia from './src/BuscaFarmacia';
import BuscaMedicamento from './src/BuscaMedicamento';
import Paciente from './src/Paciente';
import Scan from './src/Scan';
import Local from './src/Local';
import Scan2 from './src/Scan2';

const MainNavigator = createStackNavigator({
    Login: {screen: Login},
    Home: {screen: Home},
    Arquivos: {screen: Arquivos},
    Arquivo: {screen: Arquivo},
    Locais: {screen: BuscaFarmacia},
    BuscaMedicamento: {screen: BuscaMedicamento},
    Paciente: {screen: Paciente},
    Scan: {screen: Scan},
    Local: {screen: Local},
    Scan2: {screen: Scan2},
  });

const Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <Navigation />
        </Provider>
      );
    }
  }