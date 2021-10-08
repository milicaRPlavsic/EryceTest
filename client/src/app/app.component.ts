import {Component, OnInit} from '@angular/core';
//import '../assets/js/sendRequest.js';
import '../assets/js/myApp.js';

declare const init:any;
//declare const sendRequest:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

    init();  
  
  }
} 
