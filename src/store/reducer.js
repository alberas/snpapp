import * as actionTypes from './actions';
import {createStore} from 'redux';

function switchScreen(state = {currentScreen: 'home'}, action){
    switch(action.type){
        case actionTypes.MEDICAMENTO:
            return {
                ...state,
                currentScreen: action.teste
            }
        default:
            return state
    }
}

export default createStore(switchScreen);