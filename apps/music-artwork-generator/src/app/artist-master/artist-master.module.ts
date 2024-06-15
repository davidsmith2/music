import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistMasterComponent } from './artist-master.component';
import { RouterModule } from '@angular/router';
import { ArtistsResolverService } from './artists-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArtistMasterComponent,
        resolve: {
          artists: ArtistsResolverService
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        children: [
          {
            path: '',
            redirectTo: 'All Artists',
            pathMatch: 'full'
          },
          {
            path: ':name',
            loadChildren: () => import('../artist-detail/artist-detail.module').then(m => m.ArtistDetailModule)
          }
        ]
      }
    ])
  ],
  declarations: [
    ArtistMasterComponent
  ],
  providers: [
    ArtistsResolverService
  ],
  exports: [ArtistMasterComponent]
})
export class ArtistsMasterModule { }
