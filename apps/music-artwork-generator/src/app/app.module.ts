import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WINDOW } from './window.constant';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'albums',
        loadChildren: () => import('./album-master/album-master.module').then(m => m.AlbumMasterModule)
      }
    ])
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
