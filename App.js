import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';

import store from './src/store/reducer';

import Home from './src/Home';
import Login from './src/Login';
import Arquivo from './src/Arquivo';
import Arquivos from './src/Arquivos';
import BuscaFarmacia from './src/BuscaFarmacia';
import Farmacia from './src/Farmacia';
import BuscaMedicamento from './src/BuscaMedicamento';
import Paciente from './src/Paciente';
import Scan from './src/Scan';
import Scan2 from './src/Scan2';
import ScanSearch from './src/ScanSearch';
import Local from './src/Local';
import Receita from './src/Receita';
import BuscaPaciente from './src/BuscaPaciente';
import Agendamento from './src/Agendamento';
import Agendar from './src/Agendar';
import Descontos from './src/Descontos';
import Dicas from './src/Dicas';
import Voucher from './src/Voucher';
import Vouchers from './src/Vouchers';
import Documento from './src/Documento';
import ListaMedicamentos from './src/ListaMedicamentos';
import CadastroFarmacia from './src/CadastroFarmacia';
import Cadastro from './src/Cadastro';
import DescontoDetalhe from './src/DescontoDetalhe';

import * as COLORS from './src/constants/colors';
import Orcamento from './src/Orcamento';


const MainNavigator = createStackNavigator({
    Home: {screen: Home},
    Login: {screen: Login},
    Arquivos: {screen: Arquivos},
    Arquivo: {screen: Arquivo},
    Locais: {screen: BuscaFarmacia},
    Farmacia: {screen: Farmacia},
    BuscaMedicamento: {screen: BuscaMedicamento},
    ListaMedicamentos: {screen: ListaMedicamentos},
    Paciente: {screen: Paciente},
    BuscaPaciente: {screen: BuscaPaciente},
    Scan: {screen: Scan},
    Scan2: {screen: Scan2},
    ScanSearch: {screen: ScanSearch},
    Local: {screen: Local},
    Receita: {screen: Receita},
    Agendar: {screen: Agendar},
    Agendamento: {screen: Agendamento},
    Descontos: {screen: Descontos},
    Dicas: {screen: Dicas},
    Voucher: {screen: Voucher},
    Documento: {screen: Documento},
    CadastroFarmacia: {screen: CadastroFarmacia},
    Cadastro: {screen: Cadastro},
    DescontoDetalhe: {screen: DescontoDetalhe},
    Orcamento: {screen: Orcamento}
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
          backgroundColor: COLORS.HEADER_BACKGROUND_COLOR,
          height: 100
      },
      headerTintColor: COLORS.HEADER_FONT_COLOR,
      headerTitleStyle: {
          fontWeight: 'bold',
          color: COLORS.HEADER_FONT_COLOR
      }
    }
  });

const Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component {
  state = {
    isReady: false,
  };
  
  render() {
      if (!this.state.isReady) {
        return (
          <AppLoading
            startAsync={this._cacheResourcesAsync}
            onFinish={() => this.setState({ isReady: true })}
            onError={console.warn}
          />
        ); 
      }
      return (
        <Provider store={store}>
          <Navigation />
        </Provider>
      );
    }

    async _cacheResourcesAsync() {
      const images = [require('./assets/logos/logo_small.png')];
  
      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      }); 
      return Promise.all(cacheImages);
    }
  }