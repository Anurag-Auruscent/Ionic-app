import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentDetailsPage } from './content-details.page';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ContentDetailsPage
  }
];

@NgModule({

  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class ContentDetailsPageRoutingModule { }
