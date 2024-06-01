import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumMasterComponent } from './album-master.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AlbumsResolverService } from './albums-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlbumMasterComponent,
        resolve: {
          albums: AlbumsResolverService
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
  providers: [AlbumsResolverService],
  exports: [AlbumMasterComponent]
})
export class AlbumMasterModule { }
