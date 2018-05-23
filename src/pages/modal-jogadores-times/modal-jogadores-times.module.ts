import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalJogadoresTimesPage } from './modal-jogadores-times';

@NgModule({
  declarations: [
    ModalJogadoresTimesPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalJogadoresTimesPage),
  ],
})
export class ModalJogadoresTimesPageModule {}
