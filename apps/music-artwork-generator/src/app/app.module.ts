import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WINDOW } from './window.constant';
import { DefaultDataServiceConfig, DefaultHttpUrlGenerator, EntityDataModule, HttpUrlGenerator, Pluralizer } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { entityConfig } from './entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers } from './meta-reducers.constant';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: '/graphql'
};

@Injectable()
class CoreHttpUrlGenerator extends DefaultHttpUrlGenerator {
  collectionResource(entityName: string, root: string): string {
    if (entityName === 'Library') {
      return `${root}/library`;
    }
    return null;
  }
}

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
      },
      {
        path: 'songs',
        loadChildren: () => import('./song-master/song-master.module').then(m => m.SongMasterModule)
      }
    ]),
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig)
  ],
  providers: [
    { provide: WINDOW, useValue: window },
    { provide: HttpUrlGenerator, useClass: CoreHttpUrlGenerator },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
