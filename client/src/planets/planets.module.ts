import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlanetsComponent } from "./planets.component";
import { PlanetsGridComponent } from "./planets-grid/planets-grid.component";
import { PlanetGridComponent } from "./planets-grid/planet-grid/planet-grid.component";
import { PlanetsTableComponent } from "./planets-table/planets-table.component";
import { PlanetTableComponent } from "./planets-table/planet-table/planet-table.component";
import { HeaderComponent } from "./header/header.component";
import { SinglePlanetComponent } from "./single-planet/single-planet.component";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import * as PlanetReducer from "./store/planets.reducer";
import { PlanetsEffects } from "./store/planets.effects";
import { EffectsModule } from "@ngrx/effects";
import { SinglePlanetHeaderComponent } from "./single-planet-header/single-planet-header.component";
import { FormModalComponent } from "./form-modal/form-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FormConfirmationComponent } from "./form-confirmation/form-confirmation.component";
import { SortDirective } from "./sort.directive";
import { SearchFilterPipe } from "./search-filter.pipe";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
  declarations: [
    PlanetsComponent,
    PlanetsGridComponent,
    PlanetGridComponent,
    PlanetsTableComponent,
    PlanetTableComponent,
    HeaderComponent,
    SinglePlanetComponent,
    SinglePlanetHeaderComponent,
    FormModalComponent,
    FormConfirmationComponent,
    SortDirective,
    SearchFilterPipe,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forRoot(PlanetReducer),
    EffectsModule.forRoot([PlanetsEffects]),
    ReactiveFormsModule,
  ],
  exports: [],
})
export class PlanetsModule {}
