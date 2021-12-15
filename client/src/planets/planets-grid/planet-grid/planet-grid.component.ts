import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {Planet} from '../../model/Planet'

@Component({
  selector: 'app-planet-grid',
  templateUrl: './planet-grid.component.html',
  styleUrls: ['./planet-grid.component.scss']
})
export class PlanetGridComponent implements OnInit {

  @Input() planet: Planet
  constructor() { }

  ngOnInit(): void {
  }

}
