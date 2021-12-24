import { Component, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as PlanetReducer from "../store/planets.reducer";
import * as PlanetActions from "../store/planets.actions";
import { Planet } from "../model/Planet";
import { Router } from "@angular/router";

@Component({
  selector: "app-form-confirmation",
  templateUrl: "./form-confirmation.component.html",
  styleUrls: ["./form-confirmation.component.scss"],
})
export class FormConfirmationComponent implements OnInit {
  @Input() planet: Planet;
  @Input() mode: string;

  constructor(
    private store: Store<PlanetReducer.State>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  confirmConfirmation() {
    this.store.dispatch(new PlanetActions.ChangeConfirmationIndicator(false));
    this.store.dispatch(new PlanetActions.ChangeModalIndicator(false));
    if (this.mode === "create") {
      this.store.dispatch(new PlanetActions.PostPlanet(this.planet));
    } else if (this.mode === "edit") {
      this.store.dispatch(new PlanetActions.UpdatePlanet(this.planet));
    } else if (this.mode === "delete") {
      this.store.dispatch(new PlanetActions.DeletePlanet(this.planet["id"]));
      this.router.navigate(["planets", "grid"]);
    }
  }

  cancelConfirmation() {
    this.store.dispatch(new PlanetActions.ChangeConfirmationIndicator(false));
    this.store.dispatch(new PlanetActions.ChangeModalIndicator(false));
  }
}
