import { Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Store} from '@ngrx/store'
import * as PlanetReducer from '../store/planets.reducer'
import * as PlanetActions from '../store/planets.actions'
import {FormModalComponent} from '../form-modal/form-modal.component'

@Component({
  selector: 'app-form-confirmation',
  templateUrl: './form-confirmation.component.html',
  styleUrls: ['./form-confirmation.component.scss']
})
export class FormConfirmationComponent implements OnInit {
  @Output() onConfirm

  formConfirmation : FormGroup;
  constructor(private store: Store<PlanetReducer.State>) {}

  ngOnInit(): void {
    this.formConfirmation = new FormGroup({

    })
  }

  onSubmit() {
    console.log(this.formConfirmation);
    this.store.dispatch(new PlanetActions.ChangeConfirmationIndicator(false));
    this.store.dispatch(new PlanetActions.ChangeModalIndicator(false));
    // mode - edit or create

  }

  cancelConfirmation() {
    this.store.dispatch(new PlanetActions.ChangeConfirmationIndicator(false));
    this.store.dispatch(new PlanetActions.ChangeModalIndicator(false));
  }


}

