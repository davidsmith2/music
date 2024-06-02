import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistDetailComponent } from './artist-detail.component';
import { RouterModule } from '@angular/router';
import { AlbumsResolverService } from './albums-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArtistDetailComponent,
        resolve: {
          albums: AlbumsResolverService
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      }
    ])
  ],
  declarations: [ArtistDetailComponent],
  providers: [
    AlbumsResolverService
  ],
  exports: [ArtistDetailComponent]
})
export class ArtistDetailModule { }
