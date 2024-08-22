import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistMasterComponent } from './artist-master.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ArtistMasterComponent],
  exports: [ArtistMasterComponent],
})
export class ArtistsMasterModule {}
