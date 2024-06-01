import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumMasterComponent } from './album-master.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AlbumMasterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [AlbumMasterComponent]
})
export class AlbumMasterModule { }
