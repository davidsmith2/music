import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongMasterComponent } from './song-master.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SongMasterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SongMasterComponent
      }
    ])
  ],
  exports: [SongMasterComponent]
})
export class SongMasterModule { }
