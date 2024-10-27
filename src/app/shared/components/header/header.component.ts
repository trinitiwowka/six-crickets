import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, Routes } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgForOf, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routes: Routes = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.routes = this.router.config.filter(route => route.path && route.path !== '**');
  }
}
