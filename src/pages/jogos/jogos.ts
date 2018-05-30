import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PartidasControll, IPartidasControll } from '../../models/partidasControll';

@IonicPage()
@Component({
  selector: 'page-jogos',
  templateUrl: 'jogos.html',
  providers:[{provide: 'IPartidasControll', useClass: PartidasControll}]
})
export class JogosPage {
  partidas = {};
  clubes = {};
  partidasLoaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject('IPartidasControll') private partidasCtrl: IPartidasControll) {
  }

  ionViewDidLoad() {
    this.getPartidas();
  }

  getPartidas(){
    this.partidasCtrl.getPartidas().then(res => {
      this.partidas = res.partidas;
      this.clubes = res.clubes;
      this.partidasLoaded = true;
    })
  }

}
