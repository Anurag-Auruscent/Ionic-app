import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewallnotificationsPage } from './viewallnotifications.page';

const routes: Routes = [
  {
    path: '',
    component: ViewallnotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewallnotificationsPageRoutingModule {}
