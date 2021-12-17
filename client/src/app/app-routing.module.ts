import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../planets/header/header.component';
import { PlanetsComponent } from '../planets/planets.component';
import { SinglePlanetComponent } from '../planets/single-planet/single-planet.component';
import { PlanetsGridComponent } from '../planets/planets-grid/planets-grid.component';
import { PlanetsTableComponent } from '../planets/planets-table/planets-table.component';
import { FormModalComponent } from '../planets/form-modal/form-modal.component';
import { FormConfirmationComponent } from '../planets/form-confirmation/form-confirmation.component';


const routes: Routes = [
  {path : '' , redirectTo: 'planets', pathMatch: 'full'}, 
  {path : 'planets', component: PlanetsComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'grid'},
    {path: 'grid' , component: PlanetsGridComponent},
    {path: 'table' , component: PlanetsTableComponent},
    //{path: 'form' , component: FormConfirmationComponent},
    {path: ':id' , component: SinglePlanetComponent},
  ]},
  //{path : '', redirectTo : '/planets'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
