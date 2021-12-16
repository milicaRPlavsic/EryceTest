import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'single-planet-header',
  templateUrl: './single-planet-header.component.html',
  styleUrls: ['./single-planet-header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }



}