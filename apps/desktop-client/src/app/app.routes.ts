import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { LibraryComponent } from './library/library.component';

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
    path: 'library',
    component: LibraryComponent
  }
];
