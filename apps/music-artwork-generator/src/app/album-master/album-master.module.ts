import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumMasterComponent } from './album-master.component';
import { RouterModule } from '@angular/router';
import { AlbumsResolverService } from './albums-resolver.service';

@NgModule({
  declarations: [
    AlbumMasterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlbumMasterComponent,
        resolve: {
          albums: AlbumsResolverService
        }
      },
      {
        path: ':id',
        loadChildren: () => import('../album-detail/album-detail.module').then(m => m.AlbumDetailModule)
      }
    ])
  ],
  providers: [
    AlbumsResolverService
  ],
  exports: [
    AlbumMasterComponent
  ]
})
export class AlbumMasterModule { }
