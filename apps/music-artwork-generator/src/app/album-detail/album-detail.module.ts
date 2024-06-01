import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumDetailComponent } from './album-detail.component';
import { RouterModule } from '@angular/router';
import { AlbumResolverService } from './album-resolver.service';
import { WINDOW } from '../window.constant';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlbumDetailComponent,
        resolve: {
          album: AlbumResolverService
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      }
    ])
  ],
  declarations: [AlbumDetailComponent],
  providers: [
    AlbumResolverService,
    {provide: WINDOW, useValue: window}
  ],
  exports: [AlbumDetailComponent]
})
export class AlbumDetailModule { }
