import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PlanetsModule } from '../planets/planets.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PlanetsModule,
    StoreDevtoolsModule.instrument({logOnly: environment.production})
   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {} 
