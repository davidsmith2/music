import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistMasterComponent } from './artist-master.component';
import { RouterModule } from '@angular/router';
import { ArtistResolverService } from './artist-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArtistMasterComponent,
        resolve: {
          artists: ArtistResolverService
        },
        children: [
          {
            path: ':name',
            loadChildren: () => import('../artist-detail/artist-detail.module').then(m => m.ArtistDetailModule)
          }
        ]
      }
    ])
  ],
  declarations: [
    ArtistMasterComponent
  ],
  providers: [
    ArtistResolverService
  ],
  exports: [ArtistMasterComponent]
})
export class ArtistsMasterModule { }
