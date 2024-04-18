import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeeppagePage } from './deeppage.page';

const routes: Routes = [
  {
    path: '',
    component: DeeppagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeeppagePageRoutingModule {}
