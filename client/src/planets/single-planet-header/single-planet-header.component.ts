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
  mode: string;

  stateSelector = createFeatureSelector<PlanetReducer.State>("PlanetReducer");

  confirmationIndicatorSelector = createSelector(this.stateSelector, state => state.confirmationIndicator);
  confirmationIndicator : Observable<boolean> = this.store.select(this.confirmationIndicatorSelector);

  constructor(private store: Store<PlanetReducer.State>) { }

  ngOnInit(): void {

  }

  onDelete() {
    this.mode='delete';
    console.log('delete')
    this.store.dispatch(new PlanetActions.ChangeConfirmationIndicator(true));
  }

  onEdit() {
    this.mode='edit';
    this.store.dispatch(new PlanetActions.ChangeModalIndicator(true));
  }

}
