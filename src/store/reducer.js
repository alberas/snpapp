import * as actionTypes from './actions';
import {createStore} from 'redux';

import * as actions from './actions'

function reducer(){
    return {
        currentScreen: actions.HOME,
        idUsuario: 0
    }
}


export default createStore(reducer);