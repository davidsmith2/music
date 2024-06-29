import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumMasterComponent } from './album-master.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AlbumMasterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlbumMasterComponent
      },
      {
        path: ':id',
        loadChildren: () => import('../album-detail/album-detail.module').then(m => m.AlbumDetailModule)
      }
    ])
  ],
  exports: [
    AlbumMasterComponent
  ]
})
export class AlbumMasterModule { }
