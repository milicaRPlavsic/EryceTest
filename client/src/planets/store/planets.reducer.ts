import { Planet } from "planets/model/Planet";
import *as PlanetActions from './planets.actions';

export interface State {
    planets: Planet[];
}

const initialState: State = {
    planets: []
}


export function PlanetReducer (state: State = initialState, action: PlanetActions.Actions) {
    
    switch(action.type) {
        case PlanetActions.SET_PLANETS:
            return {
                ...state,
                planets: [...action.data]
            }
        case PlanetActions.FETCH_PLANETS:
            return {

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
            
        default:
         return state;
    }
   
}