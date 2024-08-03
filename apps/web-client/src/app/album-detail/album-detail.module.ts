import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumDetailComponent } from './album-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AlbumDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlbumDetailComponent,
      },
    ]),
  ],
  exports: [AlbumDetailComponent],
})
export class AlbumDetailModule {}
