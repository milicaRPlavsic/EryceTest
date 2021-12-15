import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PlanetReducer from './store/planets.reducer';
import * as PlanetActions from './store/planets.actions'

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {

  constructor(private store: Store<PlanetReducer.State>) { }

  ngOnInit(): void {
    this.store.dispatch(new PlanetActions.FetchPlanets());
  }

}
