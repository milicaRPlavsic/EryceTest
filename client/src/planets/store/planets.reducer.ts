import { Planet } from "../model/Planet";
import *as PlanetActions from './planets.actions';


export interface State {
    planets: Planet[],
    modalIndicator: boolean,
    confirmationIndicator : boolean
}

const initialState: State = {
    planets: [],
    modalIndicator: false,
    confirmationIndicator : false
}



export function PlanetReducer (state: State = initialState, action: PlanetActions.Actions) {
    
    switch(action.type) {
        case PlanetActions.SET_PLANETS:
            console.log('set')
            console.log([...action.data]);
            return {
                ...state,
                planets: [...action.data]
            }
       
        case PlanetActions.ADD_PLANET:
            return {
                ...state,
                planets: [...state.planets, action.data]
                }
        case PlanetActions.DELETE_PLANET:
            return {
                ...state,
                planets : state.planets.filter((planet, index) => {
                    return (index+1)!== action.id;
                })
                }
        case PlanetActions.UPDATE_PLANET:
           const updatedPlanet = {...state.planets[action.data.id], ...action.data};
           const planets = [...state.planets]
           planets[action.data.id]=updatedPlanet
            return {
                ...state,
                planets: planets
            }
        case PlanetActions.CHANGE_MODAL_INICATOR:
            return {
                ...state,
                modalIndicator: action.data
            }
        case PlanetActions.CHANGE_CONFIRMATION_INDICATOR:
            return {
                ...state,
                confirmationIndicator: action.data
            }
            
        default:
         return state;
    }
   
}