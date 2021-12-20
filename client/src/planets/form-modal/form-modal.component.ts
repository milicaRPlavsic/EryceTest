import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import * as PlanetReducer from '../store/planets.reducer'
import * as PlanetActions from '../store/planets.actions'
import { Observable } from 'rxjs';
import { Planet } from '../model/Planet';


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {

  @Input() planet: Planet;
  formData: FormData;
  mode: string;

  form: FormGroup;
  stateSelector = createFeatureSelector<PlanetReducer.State>("PlanetReducer");

  modalIndicatorSelector = createSelector(this.stateSelector, state => state.modalIndicator);
  confirmationIndicatorSelector = createSelector(this.stateSelector, state => state.confirmationIndicator);

  modalIndicator: Observable<boolean> = this.store.select(this.modalIndicatorSelector);
  confirmationIndicator : Observable<boolean> = this.store.select(this.confirmationIndicatorSelector);


  constructor(private store: Store<PlanetReducer.State>) { }

  ngOnInit(): void {

    if(!this.planet) {
        this.form = new FormGroup({
          'imageUrl' : new FormControl(null),
          'imageName' : new FormControl(null),
          'planetName' : new FormControl(null),
          'description' : new FormControl(null),
          'planetRadiusKM' : new FormControl(null),
          'planetColor' : new FormControl(null),
          'distInMillionsKM[fromSun]' : new FormControl(null),
          'distInMillionsKM[fromEarth]' : new FormControl(null),
      })
      this.mode = 'create';
    }

    else {
      this.form = new FormGroup({
        'imageUrl' : new FormControl(null),
        'imageName' : new FormControl(this.planet.imageName),
        'planetName' : new FormControl(this.planet.planetName),
        'description' : new FormControl(this.planet.description),
        'planetRadiusKM' : new FormControl(this.planet.planetRadiusKM),
        'planetColor' : new FormControl(this.planet.planetColor),
        'distInMillionsKM[fromSun]' : new FormControl(this.planet.distInMillionsKM.fromSun),
        'distInMillionsKM[fromEarth]' : new FormControl(this.planet.distInMillionsKM.fromEarth),

    })

    this.mode = 'edit';
    
  }
} 


  onCancelFormModal() {
   this.store.dispatch(new PlanetActions.ChangeModalIndicator(false));
  }

  onCreateFormModal() {
    this.store.dispatch(new PlanetActions.ChangeConfirmationIndicator(true));
    
    this.planet = {
      ... this.planet,
      planetName: this.form.get('planetName').value,
      imageName: this.form.get('imageName').value,
      description: this.form.get('description').value,
      planetColor: this.form.get('planetColor').value,
      planetRadiusKM : this.form.get('planetRadiusKM').value,
      distInMillionsKM: {
        fromEarth: this.form.get('distInMillionsKM[fromEarth]').value,
        fromSun:  this.form.get('distInMillionsKM[fromSun]').value,
      },
      imageUrl : "https://storage.googleapis.com/planets-fr.appspot.com/mercury.jpg",

    } 



    

  }

  

}
