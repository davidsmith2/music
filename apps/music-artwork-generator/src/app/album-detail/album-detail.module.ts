import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumDetailComponent } from './album-detail.component';
import { RouterModule } from '@angular/router';
import { AlbumResolver } from './album.resolver';

@NgModule({
  declarations: [
    AlbumDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlbumDetailComponent,
        resolve: {
          album: AlbumResolver
        }
      }
    ])
  ],
  providers: [
    AlbumResolver
  ],
  exports: [
    AlbumDetailComponent
  ]
})
export class AlbumDetailModule { }
