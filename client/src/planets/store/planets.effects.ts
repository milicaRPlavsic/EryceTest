import { Actions, Effect, ofType } from "@ngrx/effects";
import { switchMap } from "rxjs/operators";
import * as PlanetActions from "./planets.actions";
import { HttpClient } from "@angular/common/http";
import { Planet } from "../model/Planet";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import * as PlanetReducer from "../store/planets.reducer";
import { Observable } from "rxjs";

@Injectable()
export class PlanetsEffects {
  stateSelector = createFeatureSelector<PlanetReducer.State>("PlanetReducer");
  planetsSelector = createSelector(
    this.stateSelector,
    (state) => state.planets
  );

  planets: Observable<Planet[]> = this.store.select(this.planetsSelector);

  @Effect()
  fetchPlanets = this.actions.pipe(
    ofType(PlanetActions.FETCH_PLANETS),
    switchMap(() => {
      return this.http.get<Planet[]>("http://localhost:3001/api/planets");
    }),

    map((planets) => {
      console.log(planets);
      return new PlanetActions.SetPlanets(planets);
    })
  );

  @Effect({ dispatch: false })
  deletePlanet = this.actions.pipe(
    ofType(PlanetActions.DELETE_PLANET),
    map((action: PlanetActions.DeletePlanet) => {
      return action.id;
    }),
    switchMap((id: number) => {
      return this.http.delete<Planet>(
        `http://localhost:3001/api/planets/${id}`
      );
    })
  );

  @Effect()
  postPlanet = this.actions.pipe(
    ofType(PlanetActions.POST_PLANET),
    map((action: PlanetActions.PostPlanet) => {
      const planet = action.data;
      const fd: FormData = new FormData();
      fd.append("planetName", planet.planetName);
      fd.append("planetColor", planet.planetColor);
      fd.append("planetRadiusKM", planet.planetRadiusKM);
      fd.append("distInMillionsKM[fromSun]", planet.distInMillionsKM.fromSun);
      fd.append(
        "distInMillionsKM[fromEarth]",
        planet.distInMillionsKM.fromEarth
      );
      fd.append("description", planet.description);
      fd.append("imageUrl", planet.imageUrl);
      return fd;
    }),
    switchMap((planet: FormData) => {
      return this.http.post<Planet>(
        `http://localhost:3001/api/planets`,
        planet
      );
    }),

    map((planet: Planet) => {
      console.log(planet);
      return new PlanetActions.AddPlanet(planet);
    })
  );

  @Effect({ dispatch: false })
  updatePlanet = this.actions.pipe(
    ofType(PlanetActions.UPDATE_PLANET),
    map((action: PlanetActions.UpdatePlanet) => {
      const planet = action.data;
      const fd: FormData = new FormData();
      fd.append("id", planet.id.toString());
      fd.append("planetName", planet.planetName);
      fd.append("planetColor", planet.planetColor);
      fd.append("planetRadiusKM", planet.planetRadiusKM);
      fd.append("distInMillionsKM[fromSun]", planet.distInMillionsKM.fromSun);
      fd.append(
        "distInMillionsKM[fromEarth]",
        planet.distInMillionsKM.fromEarth
      );
      fd.append("description", planet.description);
      fd.append("imageUrl", planet.imageUrl);

      return fd;
    }),
    switchMap((fd: FormData) => {
      return this.http.put<Planet>(
        `http://localhost:3001/api/planets/${fd.get("id")}`,
        fd
      );
    })
  );

  constructor(
    private actions: Actions,
    private http: HttpClient,
    private store: Store<PlanetReducer.State>
  ) {}
}
