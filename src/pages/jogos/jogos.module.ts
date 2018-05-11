import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JogosPage } from './jogos';

@NgModule({
  declarations: [
    JogosPage,
  ],
  imports: [
    IonicPageModule.forChild(JogosPage),
  ],
})
export class JogosPageModule {}
