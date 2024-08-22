import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SongMasterComponent } from './song-master/song-master.component';
import { SongMasterModule } from './song-master/song-master.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SongMasterModule,
    RouterModule.forChild([
      {
        path: '',
        component: SongMasterComponent,
      },
    ])
  ]
})
export class SongModule { }
