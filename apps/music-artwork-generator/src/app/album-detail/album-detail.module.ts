import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumDetailComponent } from './album-detail.component';
import { RouterModule } from '@angular/router';
import { AlbumResolverService } from './album-resolver.service';

@NgModule({
  declarations: [AlbumDetailComponent],
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
  exports: [AlbumDetailComponent],
  providers: [AlbumResolverService]
})
export class AlbumDetailModule { }
