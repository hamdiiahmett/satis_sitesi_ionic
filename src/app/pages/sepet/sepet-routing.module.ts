import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SepetPage } from './sepet.page';

const routes: Routes = [
  {
    path: '',
    component: SepetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SepetPageRoutingModule {}
