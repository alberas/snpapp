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
import Receita from './src/Receita';
import BuscaPaciente from './src/BuscaPaciente';
import Agendamento from './src/Agendamento';
import Descontos from './src/Descontos';
import Dicas from './src/Dicas';

const MainNavigator = createStackNavigator({
    Home: {screen: Home},
    Login: {screen: Login},
    Arquivos: {screen: Arquivos},
    Arquivo: {screen: Arquivo},
    Locais: {screen: BuscaFarmacia},
    BuscaMedicamento: {screen: BuscaMedicamento},
    Paciente: {screen: Paciente},
    BuscaPaciente: {screen: BuscaPaciente},
    Scan: {screen: Scan},
    Local: {screen: Local},
    Scan2: {screen: Scan2},
    Receita: {screen: Receita},
    Agendamento: {screen: Agendamento},
    Descontos: {screen: Descontos},
    Dicas: {screen: Dicas}

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