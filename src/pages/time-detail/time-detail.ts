import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ITimeControll, TimeControll, TimeControllFake } from '../../models/timeControll';

@IonicPage()
@Component({
  selector: 'page-time-detail',
  templateUrl: 'time-detail.html',
  providers: [
    // { provide: 'ITimeControll', useClass: TimeControllFake }
    { provide: 'ITimeControll', useClass: TimeControll }
  ]
})
export class TimeDetailPage {
  time = {
    url_escudo_svg: '',
    time_id: '',
    nome: '',
    nome_cartola: '',
    pontuados: 0,
    pontos: '',
    atletas: [{
      foto: ''
    }]
  };
  loading;
  timeLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('ITimeControll') private timeControll: ITimeControll,
    private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Carregando...'
    });

    this.loading.present();
  }

  ionViewDidLoad() {
    this.loadTimeParciais();
  }

  loadTimeParciais() {
    this.time = this.navParams.get('time');
    this.timeControll.loadTime(this.time).then(timeInfo => {
      this.getTimeParciais(timeInfo);
    });
  }

  getTimeParciais(timeInfo, refresher = null) { 
    this.timeControll.getParciaisDosJogadoresDoTime(timeInfo).then(time => {
      this.time = Object.assign(this.time, time);
      console.log("time: ", this.time);
      
      this.timeLoaded = true;
      if (refresher) {
        refresher.complete();
      }
      this.loading.dismiss();
    })
  }

  doRefresh(refresher) {
    this.timeLoaded = false;
    this.getTimeParciais(this.time, refresher);
  }

  formatPontos(parcial) {
    return parseFloat((parcial).toFixed(2));
  }

  getTotalPontos() {
    return (parseFloat(this.time.pontos) + parseFloat(this.navParams.get('time').pontos.campeonato));
  }

}
