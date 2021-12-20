import { Component, Input, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as PlanetReducer from '../store/planets.reducer';
import * as PlanetActions from '../store/planets.actions'
import { Router } from '@angular/router';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-planet-header',
  templateUrl: './single-planet-header.component.html',
  styleUrls: ['./single-planet-header.component.scss']
})
export class SinglePlanetHeaderComponent implements OnInit {

  @Input() planet;

  constructor(private store: Store<PlanetReducer.State>, private router: Router) { }

  ngOnInit(): void {

  }

  onDelete() {
    this.store.dispatch(new PlanetActions.DeletePlanet(this.planet['id']));
    this.router.navigate(['planets','grid']);
  }

  onEdit() {
    console.log('edit');
    this.store.dispatch(new PlanetActions.ChangeModalIndicator(true));
  }

}
