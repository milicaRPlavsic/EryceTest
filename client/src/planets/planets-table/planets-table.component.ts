import { Component, OnInit } from "@angular/core";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import * as PlanetReducer from "../store/planets.reducer";
import { Observable } from "rxjs";
import { Planet } from "../model/Planet";
import { Router } from "@angular/router";

@Component({
  selector: "app-planets-table",
  templateUrl: "./planets-table.component.html",
  styleUrls: ["./planets-table.component.scss"],
})
export class PlanetsTableComponent implements OnInit {
  stateSelector = createFeatureSelector<PlanetReducer.State>("PlanetReducer");
  planetsSelector = createSelector(
    this.stateSelector,
    (state) => state.planets
  );

  planets: Observable<Planet[]> = this.store.select(this.planetsSelector);

  constructor(
    private store: Store<PlanetReducer.State>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onPlanetTable(planet: Planet) {
    console.log("bla");
    this.router.navigate(["planets", planet.id]);
  }
}
