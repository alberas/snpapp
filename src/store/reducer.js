import {createStore} from 'redux';

import * as actions from './actions'

const INITIAL_STATE = {
    usuario: {
        id: 0,
        id_tipo_usuario: 0,
        nome: ""
    },
    coordenadas: {
        lat: "-15.7567308",
        lng: "-47.8888723"
    }
}

function reducer(state = INITIAL_STATE, action){
    if(action.type===actions.LOGIN){
        return {...state, usuario: action.usuario}
    }
    if(action.type==="setCoordenadas"){
        return {...state, coordenadas: action.coordenadas}
    }
    return state;
}


export default createStore(reducer);