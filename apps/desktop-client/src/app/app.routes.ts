import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';

@Component({
  template: 'TestComponent'
})
export class TestComponent {
  constructor() {
    console.log('TestComponent constructor');
  }
}

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'test',
    component: TestComponent
  }
];
