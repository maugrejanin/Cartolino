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
    time: {
      time_id: '',
      nome: '',
      nome_cartola: '',
      url_escudo_svg: '',
    },
    pontuados: 0,
    pontos: '',
    atletas: [{
      foto: ''
    }]
  };
  loading;

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
    // this.time = this.navParams.get('time');
    console.log("params time: ", this.navParams.get('time'));
    this.loadTimeParciais();
  }

  loadTimeParciais() {
    this.timeControll.loadTime(this.navParams.get('time')).then(timeInfo => {
      this.getTimeParciais(timeInfo);
    });
  }

  getTimeParciais(timeInfo) {
    console.log("entrei aqui");
    
    this.timeControll.getParciaisDosJogadoresDoTime(timeInfo).then(time => {
      console.log("loaded time: ", time);
      this.time = time;
      this.loading.dismiss();
    })
  }

  doRefresh(refresher) {
    this.getTimeParciais(this.time);
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  formatPontos(parcial) {
    return parseFloat((parcial).toFixed(2));
  }

  getTotalPontos() {
    return this.formatPontos((parseFloat(this.time.pontos) + parseFloat(this.navParams.get('time').pontos.campeonato)));
  }

}
