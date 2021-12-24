import { Component, OnInit } from "@angular/core";
import * as PlanetReducer from "./store/planets.reducer";
import * as PlanetActions from "./store/planets.actions";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-planets",
  templateUrl: "./planets.component.html",
  styleUrls: ["./planets.component.scss"],
})
export class PlanetsComponent implements OnInit {
  stateSelector = createFeatureSelector<PlanetReducer.State>("PlanetReducer");
  modalIndicatorSelector = createSelector(
    this.stateSelector,
    (state) => state.modalIndicator
  );
  confirmationIndicatorSelector = createSelector(
    this.stateSelector,
    (state) => state.confirmationIndicator
  );

  modalIndicator: Observable<boolean> = this.store.select(
    this.modalIndicatorSelector
  );
  confirmationIndicator: Observable<boolean> = this.store.select(
    this.confirmationIndicatorSelector
  );

  constructor(private store: Store<PlanetReducer.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new PlanetActions.FetchPlanets());
  }

  onBackDrop() {
    this.store.dispatch(new PlanetActions.ChangeModalIndicator(false));
    this.store.dispatch(new PlanetActions.ChangeConfirmationIndicator(false));
  }
}
