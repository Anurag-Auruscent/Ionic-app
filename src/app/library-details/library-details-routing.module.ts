import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryDetailsPage } from './library-details.page';

const routes: Routes = [
  {
    path: '',
    component: LibraryDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryDetailsPageRoutingModule {}
