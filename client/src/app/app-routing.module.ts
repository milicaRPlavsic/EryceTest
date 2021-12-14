import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../planets/header/header.component';
import { PlanetsComponent } from '../planets/planets.component';


const routes: Routes = [
  {path : 'planets', component: PlanetsComponent},
  {path : '', component: PlanetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
