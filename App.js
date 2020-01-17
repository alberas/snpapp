import React from 'react';
import { Platform, View, StyleSheet,  Text, Image } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import * as actions from './src/store/actions';
import store from './src/store/reducer';

import Home from './src/Home';
import Login from './src/Login';
import MainPage from './src/MainPage';


const MainNavigator = createStackNavigator({
    Login: {screen: Login},
    MainPage: {screen: MainPage},
    Home: {screen: Home},
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