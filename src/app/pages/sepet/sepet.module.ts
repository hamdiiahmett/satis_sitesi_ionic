import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SepetPageRoutingModule } from './sepet-routing.module';

import { SepetPage } from './sepet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SepetPageRoutingModule
  ],
  declarations: [SepetPage]
})
export class SepetPageModule {}
