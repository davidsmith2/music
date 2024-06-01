import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WINDOW } from './window.constant';
import { AlbumMasterModule } from './album-master/album-master.module';
import { RouterModule } from '@angular/router';

@Component({
  template: `
    <h1>Detail</h1>
  `,
})
export class DetailComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'detail', component: DetailComponent}
    ]),
    AlbumMasterModule
  ],
  providers: [
    {provide: WINDOW, useValue: window}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
