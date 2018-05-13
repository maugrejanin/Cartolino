import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LigaDetailPage } from './liga-detail';

@NgModule({
  declarations: [
    LigaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LigaDetailPage),
  ],
})
export class LigaDetailPageModule {}
