import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlbumMasterComponent } from './album-master/album-master.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumMasterModule } from './album-master/album-master.module';
import { AlbumDetailModule } from './album-detail/album-detail.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlbumMasterModule,
    AlbumDetailModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlbumMasterComponent
      },
      {
        path: ':id',
        component: AlbumDetailComponent
      }
    ])
  ]
})
export class AlbumModule { }
