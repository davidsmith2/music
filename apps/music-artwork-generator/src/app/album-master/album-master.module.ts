import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumMasterComponent } from './album-master.component';
import { RouterModule } from '@angular/router';
import { AlbumsResolverService } from './albums-resolver.service';
import { WINDOW } from '../window.constant';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlbumMasterComponent,
        resolve: {
          artists: AlbumsResolverService
        },
        children: [
          {
            path: '0',
            loadChildren: () => import('../album-detail/album-detail.module').then(m => m.AlbumDetailModule)
          }
        ]
      }
    ])
  ],
  declarations: [
    AlbumMasterComponent
  ],
  providers: [
    AlbumsResolverService
  ],
  exports: [AlbumMasterComponent]
})
export class AlbumMasterModule { }
