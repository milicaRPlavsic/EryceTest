import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsComponent } from './planets.component';
import { PlanetsGridComponent } from './planets-grid/planets-grid.component';
import { PlanetGridComponent } from './planets-grid/planet-grid/planet-grid.component';
import { PlanetsTableComponent } from './planets-table/planets-table.component';
import { PlanetTableComponent } from './planets-table/planet-table/planet-table.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    PlanetsComponent, 
    PlanetsGridComponent,
    PlanetGridComponent,
    PlanetsTableComponent,
    PlanetTableComponent, 
    HeaderComponent],
  imports: [
    CommonModule
  ]
})
export class PlanetsModule { }
