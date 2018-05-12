import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JogadoresPage } from './jogadores';

@NgModule({
  declarations: [
    JogadoresPage,
  ],
  imports: [
    IonicPageModule.forChild(JogadoresPage),
  ],
})
export class JogadoresPageModule {}
