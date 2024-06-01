import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WINDOW } from './window.constant';
import { AlbumMasterModule } from './album-master/album-master.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'detail',
        loadChildren: () => import('./album-detail/album-detail.module').then(m => m.AlbumDetailModule)
      }
    ]),
    AlbumMasterModule
  ],
  providers: [
    {provide: WINDOW, useValue: window}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
