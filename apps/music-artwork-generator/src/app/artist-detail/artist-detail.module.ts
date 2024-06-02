import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistDetailComponent } from './artist-detail.component';
import { RouterModule } from '@angular/router';
import { AlbumResolverService } from './album-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArtistDetailComponent,
        resolve: {
          albums: AlbumResolverService
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      }
    ])
  ],
  declarations: [ArtistDetailComponent],
  providers: [AlbumResolverService],
  exports: [ArtistDetailComponent]
})
export class ArtistDetailModule { }
