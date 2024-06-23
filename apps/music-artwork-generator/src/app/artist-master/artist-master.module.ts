import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistMasterComponent } from './artist-master.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArtistMasterComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../artist-detail/artist-detail.module').then(m => m.ArtistDetailModule)
          }
        ]
      }
    ])
  ],
  declarations: [
    ArtistMasterComponent
  ],
  exports: [ArtistMasterComponent]
})
export class ArtistsMasterModule { }
