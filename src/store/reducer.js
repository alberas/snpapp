import {createStore} from 'redux';

import * as actions from './actions'

const INITIAL_STATE = {
    usuario: {
        id: 0,
        id_tipo_usuario: 0,
        nome: ""
    }
}

function reducer(state = INITIAL_STATE, action){
    if(action.type===actions.LOGIN){
        return {...state, usuario: action.usuario}
    }
    return state;
}


export default createStore(reducer);