import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JogadorDetailsPage } from './jogador-details';

@NgModule({
  declarations: [
    JogadorDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(JogadorDetailsPage),
  ],
})
export class JogadorDetailsPageModule {}
