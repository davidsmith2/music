import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistMasterComponent } from './artist-master.component';
import { RouterModule } from '@angular/router';
import { AlbumResolverService } from './album-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArtistMasterComponent,
        resolve: {
          albums: AlbumResolverService
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
    AlbumResolverService
  ],
  exports: [ArtistMasterComponent]
})
export class ArtistsMasterModule { }
