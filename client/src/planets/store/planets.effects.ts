import {Actions, Effect, ofType} from '@ngrx/effects' 
import {switchMap} from 'rxjs/operators';
import * as PlanetActions from './planets.actions';
import { HttpClient } from '@angular/common/http';
import {Planet} from '../model/Planet'
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class PlanetsEffects {
    @Effect()
    fetchPlanets = this.actions.pipe
    (ofType(PlanetActions.FETCH_PLANETS),
    switchMap( () => {
        
     return this.http.get<Planet[]>('http://localhost:3001/api/planets')
    }),
   
    map(planets => {
        console.log(planets);
        return new PlanetActions.SetPlanets(planets);
       
      })
    ) 

    constructor(private actions: Actions, private http : HttpClient) {}
}