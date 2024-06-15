import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WINDOW } from './window.constant';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'artists',
        pathMatch: 'full',
      },
      {
        path: 'artists',
        loadChildren: () => import('./artist-master/artist-master.module').then(m => m.ArtistsMasterModule)
      },
      {
        path: 'albums',
        loadChildren: () => import('./album-master/album-master.module').then(m => m.AlbumMasterModule)
      }
    ])
  ],
  providers: [
    {provide: WINDOW, useValue: window}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
