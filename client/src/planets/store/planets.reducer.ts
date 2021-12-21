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
        
        case PlanetActions.POST_PLANET:
            return {
                ...state
                }

        case PlanetActions.ADD_PLANET:
            console.log('add action')
            return {
                ...state,
                planets: [...state.planets, action.data]
                }
        case PlanetActions.DELETE_PLANET:
            return {
                ...state,
                planets : state.planets.filter((planet, index) => {
                    return planet['id']!== action.id;
                })
                }
        case PlanetActions.UPDATE_PLANET:
            
           const planets = [...state.planets]
           let updatedPlanet = planets.find((planet) => planet.id == action.data.id)
           updatedPlanet = {...updatedPlanet, ...action.data};
           
           const index = planets.findIndex((planet) => planet.id == action.data.id)
           planets[index]=updatedPlanet;
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