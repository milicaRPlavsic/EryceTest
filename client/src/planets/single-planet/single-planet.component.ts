import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import * as PlanetReducer from "../store/planets.reducer";
import * as PlanetActions from '../store/planets.actions';
import { Observable } from "rxjs";
import { Planet } from "../model/Planet";
import { Params } from "@angular/router";
import { withLatestFrom } from "rxjs/operators";
import { Action } from "rxjs/internal/scheduler/Action";

@Component({
  selector: "app-single-planet",
  templateUrl: "./single-planet.component.html",
  styleUrls: ["./single-planet.component.scss"],
})
export class SinglePlanetComponent implements OnInit {
  stateSelector = createFeatureSelector<PlanetReducer.State>("PlanetReducer");
  planetsSelector = createSelector(
    this.stateSelector,
    (state) => state.planets
  );

  planets: Observable<Planet[]> = this.store.select(this.planetsSelector);

  planet: Planet;

  modalIndicatorSelector = createSelector(this.stateSelector, state => state.modalIndicator);

  modalIndicator: Observable<boolean> = this.store.select(this.modalIndicatorSelector);

  constructor(
    private store: Store<PlanetReducer.State>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      const planetsWithRouteParam$ = this.planets.pipe(
        withLatestFrom(this.route.params)
      );

      planetsWithRouteParam$.subscribe( sub =>  { 
        const planets: Planet[] = sub[0];
        const id = +sub[1].id;
        this.planet = planets.find(planet => planet.id === id);
      });
  }

}
