import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ITimeControll, TimeControll } from '../../models/timeControll';

@IonicPage()
@Component({
  selector: 'page-time-detail',
  templateUrl: 'time-detail.html',
  providers: [
    { provide: 'ITimeControll', useClass: TimeControll }
  ]
})
export class TimeDetailPage {
  time = {
    time_id: '',
    nome: '',
    url_escudo_svg: '',
    nome_cartola: '',
    patrimonio: '',
    pontos: {
      rodada: 0,
      campeonato: 0
    },
    atletas: [{
      foto:''
    }]
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject('ITimeControll') private timeControll: ITimeControll) {
  }

  ionViewDidLoad() {
    this.time = this.navParams.get('time');
    this.loadAtletasTime();
  }

  loadAtletasTime() {
    this.timeControll.loadTime(this.time.time_id).then(timeInfo => {
      this.time.atletas = timeInfo.atletas;
      console.log(this.time);
    });
  }

  doRefresh(refresher) {
    console.log("refresh");
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  formatPontos(parcial) {
    return parseFloat((parcial).toFixed(2));
  }

}
