import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistDetailComponent } from './artist-detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ArtistDetailComponent],
  exports: [ArtistDetailComponent],
})
export class ArtistDetailModule {}
