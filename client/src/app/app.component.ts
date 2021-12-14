import {Component, OnInit} from '@angular/core';
import '../assets/js/myApp.js';

declare const init:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

    //init();  
  
  }
} 
