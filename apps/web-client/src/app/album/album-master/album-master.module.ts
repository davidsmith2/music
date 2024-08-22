import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumMasterComponent } from './album-master.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AlbumMasterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AlbumMasterComponent],
})
export class AlbumMasterModule {}
