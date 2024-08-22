import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumDetailComponent } from './album-detail.component';

@NgModule({
  declarations: [AlbumDetailComponent],
  imports: [CommonModule],
  exports: [AlbumDetailComponent],
})
export class AlbumDetailModule {}
