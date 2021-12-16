import { Action } from "@ngrx/store";
import { Planet } from "../model/Planet";

export const SET_PLANETS = 'Set Planets'
export const FETCH_PLANETS = 'Fetch Planets';
export const ADD_PLANET = 'Add Planet';
export const DELETE_PLANET = 'Delete Planet';
export const UPDATE_PLANET = 'Update Planet';


export class SetPlanets implements Action {
    readonly type= SET_PLANETS;
    constructor(public data: Planet[]) {}
}

export class FetchPlanets implements Action {
    readonly type= FETCH_PLANETS
    
}

export class AddPlanet implements Action {
    readonly type = ADD_PLANET
    constructor(public data: Planet) {}
}

export class DeletePlanet implements Action {
    readonly type = DELETE_PLANET;
    constructor(public id: number) {}
}

export class UpdatePlanet implements Action {
    readonly type = UPDATE_PLANET;
    constructor(public data: Planet) {} 
}

export type Actions = SetPlanets | FetchPlanets | AddPlanet | DeletePlanet | UpdatePlanet 

