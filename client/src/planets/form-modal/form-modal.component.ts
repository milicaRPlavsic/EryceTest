import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as PlanetReducer from '../store/planets.reducer'
import * as PlanetActions from '../store/planets.actions'

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {

  form: FormGroup;
  constructor(private store: Store<PlanetReducer.State>) { }

  ngOnInit(): void {

    this.form = new FormGroup({
        'choose-file' : new FormControl(null),
        'imageName' : new FormControl(null),
        'planetName' : new FormControl(null),
        'description' : new FormControl(null),
        'planetRadiusKM' : new FormControl(null),
        'planetColor' : new FormControl(null),
        'distInMillionsKM[fromSun]' : new FormControl(null),
        'distInMillionsKM[fromEarth]' : new FormControl(null),
    })
    
  } 

  onSubmit() {
    console.log('onsubmit')
    console.log(this.form);
  }

  onCancelFormModal() {
    this.store.dispatch(new PlanetActions.ChangeModalIndicator(false));
  }

  onCreateFormModal() {
    this.store.dispatch(new PlanetActions.ChangeConfirmationIndicator(true));
  }



}
