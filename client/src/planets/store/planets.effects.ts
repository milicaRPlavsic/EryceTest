import {Actions, Effect, ofType} from '@ngrx/effects' 
import {switchMap} from 'rxjs/operators';
import * as PlanetActions from './planets.actions';
import { HttpClient } from '@angular/common/http';
import {Planet} from '../model/Planet'
import { map } from 'rxjs/operators';

export class PlanetsEffects {
    @Effect()
    fetch = this.actions.pipe
    (ofType(PlanetActions.FETCH_PLANETS),
    switchMap( () => {
     return this.http.get<Planet[]>('http://localhost:3001/api/planets')
    }),
    map( planets => {
        return planets.map(planet => {

        })
    })
    ) 

    constructor(private actions: Actions, private http : HttpClient) {}
}