import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import {Planet} from '../model/Planet';
import * as PlanetReducer from '../store/planets.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators'; 
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-planets-grid',
  templateUrl: './planets-grid.component.html',
  styleUrls: ['./planets-grid.component.scss']
})
export class PlanetsGridComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  planets: Planet [] = [];
  
  constructor(private store: Store<PlanetReducer.State>) { }

  ngOnInit(): void {
    this.subscription = this.store
    .select('planets')
    .subscribe((planets: Planet[]) => {
      this.planets = planets;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  bla() {
    console.log("planete "+ this.planets);
  }

}
