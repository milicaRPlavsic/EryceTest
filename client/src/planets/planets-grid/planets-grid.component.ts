import { Component, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { Planet } from "../model/Planet";
import * as PlanetReducer from "../store/planets.reducer";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-planets-grid",
  templateUrl: "./planets-grid.component.html",
  styleUrls: ["./planets-grid.component.scss"],
})
export class PlanetsGridComponent implements OnInit {

  stateSelector = createFeatureSelector<PlanetReducer.State>("PlanetReducer");
  planetsSelector = createSelector(this.stateSelector, state => state.planets);

  planets: Observable<Planet[]> = this.store.select(this.planetsSelector);

  constructor(private store: Store<PlanetReducer.State>) {}

  ngOnInit(): void {
   
  }

  


  
}
