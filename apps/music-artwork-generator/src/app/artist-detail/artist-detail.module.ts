import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistDetailComponent } from './artist-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArtistDetailComponent
      }
    ])
  ],
  declarations: [ArtistDetailComponent],
  exports: [ArtistDetailComponent]
})
export class ArtistDetailModule { }
