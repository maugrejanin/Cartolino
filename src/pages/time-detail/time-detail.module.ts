import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeDetailPage } from './time-detail';

@NgModule({
  declarations: [
    TimeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TimeDetailPage),
  ],
})
export class TimeDetailPageModule {}
