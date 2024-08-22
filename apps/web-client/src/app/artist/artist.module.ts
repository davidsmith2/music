import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArtistMasterComponent } from './artist-master/artist-master.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistsMasterModule } from './artist-master/artist-master.module';
import { ArtistDetailModule } from './artist-detail/artist-detail.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ArtistsMasterModule,
    ArtistDetailModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArtistMasterComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        children: [
          {
            path: ':id',
            component: ArtistDetailComponent
          }
        ]
      }
    ])
  ]
})
export class ArtistModule { }
