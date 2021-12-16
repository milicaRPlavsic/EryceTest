import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {Planet} from '../../model/Planet'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planet-grid',
  templateUrl: './planet-grid.component.html',
  styleUrls: ['./planet-grid.component.scss']
})
export class PlanetGridComponent implements OnInit {

  @Input() planet: Planet
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //console.log('planet: ', this.planet);
  }

  onPlanetGrid(planet: Planet) {
    this.router.navigate(['planets', planet.id])
  }


}
