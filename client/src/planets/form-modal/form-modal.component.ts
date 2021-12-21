import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  mode: string;
  filePath: string;

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
          'imageUrl' : new FormControl(null, Validators.required),
          'imageName' : new FormControl(null, Validators.required),
          'planetName' : new FormControl(null, Validators.required),
          'description' : new FormControl(null, Validators.required),
          'planetRadiusKM' : new FormControl(null, Validators.required),
          'planetColor' : new FormControl(null, Validators.required),
          'distInMillionsKM[fromSun]' : new FormControl(null, Validators.required),
          'distInMillionsKM[fromEarth]' : new FormControl(null, Validators.required),
      })
      this.mode = 'create';
    }

    else {
      this.form = new FormGroup({
        'imageUrl' : new FormControl(this.planet.imageUrl, Validators.required),
        'imageName' : new FormControl(this.planet.imageName, Validators.required),
        'planetName' : new FormControl(this.planet.planetName, Validators.required),
        'description' : new FormControl(this.planet.description, Validators.required),
        'planetRadiusKM' : new FormControl(this.planet.planetRadiusKM, Validators.required),
        'planetColor' : new FormControl(this.planet.planetColor, Validators.required),
        'distInMillionsKM[fromSun]' : new FormControl(this.planet.distInMillionsKM.fromSun, Validators.required),
        'distInMillionsKM[fromEarth]' : new FormControl(this.planet.distInMillionsKM.fromEarth, Validators.required),

    })

    this.mode='edit';
    
  }
} 


  onCancelFormModal() {
   this.store.dispatch(new PlanetActions.ChangeModalIndicator(false));
   this.store.dispatch(new PlanetActions.ChangeConfirmationIndicator(false))
  }

  onCreateFormModal() {
    

    if(!this.form.valid) {
      console.log('invalid form')
      this.mode='invalid'
    }
    
    else {
    

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
      imageUrl : this.filePath ? this.filePath : this.planet.imageUrl
    }
  }

  this.store.dispatch(new PlanetActions.ChangeConfirmationIndicator(true));
  console.log(this.mode)

  }
  


  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.form.get('imageUrl').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      console.log(this.filePath)
      this.form.patchValue({
        imageName: file.name,
        imageUrl : this.filePath
      });

    }

    reader.readAsDataURL(file)
  }


  

}
