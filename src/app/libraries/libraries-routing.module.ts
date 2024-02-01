import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrariesPage } from './libraries.page';

const routes: Routes = [
  {
    path: '',
    component: LibrariesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrariesPageRoutingModule {}
