import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongMasterComponent } from './song-master.component';

@NgModule({
  declarations: [SongMasterComponent],
  imports: [
    CommonModule,
  ],
  exports: [SongMasterComponent],
})
export class SongMasterModule {}
