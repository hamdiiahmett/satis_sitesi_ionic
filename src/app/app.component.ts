import { Component, OnInit } from '@angular/core';
import { Authentication } from './authentication';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private authService: Authentication) { }

  ngOnInit() {
    this.authService.tokenSil();
  }
}
