import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LigaControll } from '../../models/ligasControll';

@IonicPage()
@Component({
  selector: 'page-ligas',
  templateUrl: 'ligas.html',
  providers: [LigaControll]
})
export class LigasPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private ligaControll: LigaControll) {
  }

  ionViewDidLoad() {
    this.ligaControll.loadLigas();
  }

}
