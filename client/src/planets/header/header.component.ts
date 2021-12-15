import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  onGridIcon() {
    this.router.navigate(['grid'], {relativeTo: this.route});
  }

  OnTableIcon() {
    this.router.navigate(['table'], {relativeTo: this.route});
  }

}
