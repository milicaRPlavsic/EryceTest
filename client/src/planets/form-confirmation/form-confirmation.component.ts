import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Store} from '@ngrx/store'
import * as PlanetReducer from '../store/planets.reducer'
import * as PlanetActions from '../store/planets.actions'
import {Planet} from '../model/Planet'

@Component({
  selector: 'app-form-confirmation',
  templateUrl: './form-confirmation.component.html',
  styleUrls: ['./form-confirmation.component.scss']
})
export class FormConfirmationComponent implements OnInit {
  
  @Input() planet: Planet;
  @Input() mode: string;

  constructor(private store: Store<PlanetReducer.State>) {}

  ngOnInit(): void {
  }


  confirmConfirmation() {
   
    this.store.dispatch(new PlanetActions.ChangeConfirmationIndicator(false));
    this.store.dispatch(new PlanetActions.ChangeModalIndicator(false));
    if(this.mode === 'create') {
     
      this.store.dispatch(new PlanetActions.AddPlanet(this.planet));
     
    }
    else( console.log('edit ', this.planet.id));
    this.store.dispatch(new PlanetActions.UpdatePlanet(this.planet));
  }

  cancelConfirmation() {
    this.store.dispatch(new PlanetActions.ChangeConfirmationIndicator(false));
    this.store.dispatch(new PlanetActions.ChangeModalIndicator(false));
  


}
}

