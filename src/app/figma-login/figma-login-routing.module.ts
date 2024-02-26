import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FigmaLoginPage } from './figma-login.page';

const routes: Routes = [
  {
    path: '',
    component: FigmaLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FigmaLoginPageRoutingModule {}
