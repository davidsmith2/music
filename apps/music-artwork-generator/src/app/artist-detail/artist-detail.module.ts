import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistDetailComponent } from './artist-detail.component';
import { RouterModule } from '@angular/router';
import { ArtistResolverService } from './artist-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArtistDetailComponent,
        resolve: {
          artists: ArtistResolverService
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      }
    ])
  ],
  declarations: [ArtistDetailComponent],
  providers: [ArtistResolverService],
  exports: [ArtistDetailComponent]
})
export class ArtistDetailModule { }
