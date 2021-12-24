import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import * as PlanetReducer from "../store/planets.reducer";
import { Store } from "@ngrx/store";
import * as PlanetActions from "../store/planets.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Output() onSearch = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<PlanetReducer.State>
  ) {}

  ngOnInit(): void {}

  onGridIcon() {
    this.router.navigate(["planets", "grid"]);
  }

  OnTableIcon() {
    this.router.navigate(["planets", "table"]);
  }

  onCreatePlanet() {
    this.store.dispatch(new PlanetActions.ChangeModalIndicator(true));
  }

  valuechange(data: any) {
    this.onSearch.emit(data.target.value);
  }
}
