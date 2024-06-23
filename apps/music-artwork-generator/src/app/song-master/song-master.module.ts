import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongMasterComponent } from './song-master.component';
import { Router, RouterModule } from '@angular/router';
import { SongsResolver } from './songs.resolver';



@NgModule({
  declarations: [SongMasterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SongMasterComponent,
        resolve: {
          songs: SongsResolver
        }
      }
    ])
  ],
  providers: [SongsResolver],
  exports: [SongMasterComponent]
})
export class SongMasterModule { }
