import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WINDOW } from './window.constant';
import {
  DefaultDataServiceConfig,
  DefaultHttpUrlGenerator,
  EntityDataModule,
  HttpUrlGenerator
} from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { entityConfig } from './entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers } from './meta-reducers.constant';
import { GraphQLModule } from './graphql.module';
import { LibraryComponent } from './library/library.component';
import { LibraryModule } from './library/library.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { AuthGuard } from './auth.guard';
import { UserResolver } from './user.resolver';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: '/graphql',
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
        redirectTo: 'library',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'library',
        component: LibraryComponent,
        canActivate: [AuthGuard],
        resolve: {
          user: UserResolver
        },
        children: [
          {
            path: 'artists',
            loadChildren: () =>
              import('./artist/artist.module').then(
                (m) => m.ArtistModule
              ),
          },
          {
            path: 'albums',
            loadChildren: () =>
              import('./album/album.module').then(
                (m) => m.AlbumModule
              ),
          },
          {
            path: 'songs',
            loadChildren: () =>
              import('./song/song.module').then(
                (m) => m.SongModule
              ),
          },
        ],
      },
    ]),
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    GraphQLModule,
    LibraryModule,
    LoginModule
  ],
  providers: [
    { provide: WINDOW, useValue: window },
    { provide: HttpUrlGenerator, useClass: CoreHttpUrlGenerator },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
