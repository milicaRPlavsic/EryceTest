import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-planet-table]',
  templateUrl: './planet-table.component.html',
  styleUrls: ['./planet-table.component.scss'],

})
export class PlanetTableComponent implements OnInit {

  @Input() planet;
  constructor() { }

  ngOnInit(): void {
  }

}
