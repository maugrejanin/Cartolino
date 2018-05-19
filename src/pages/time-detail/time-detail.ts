import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ITimeControll, TimeControll, TimeControllFake } from '../../models/timeControll';
import { IJogadoresControll } from '../../models/jogadoresControll';

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
      url_escudo_svg: '',
      time_id: '',
      nome: '',
      nome_cartola: '',
    },
    patrimonio: '',
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
    private loadingCtrl: LoadingController,
    @Inject('IJogadoresControll') public jogadoresControll: IJogadoresControll) {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Carregando...'
    });

    this.loading.present();
  }

  ionViewDidLoad() {
    this.time = this.navParams.get('time');
    console.log("params time: ", this.navParams.get('time'));
    this.loadTimeParciais();
  }

  loadTimeParciais() {
    new Promise((resolve, reject) => {
      this.jogadoresControll.loadJogadores().then(() => {
        this.timeControll.loadTime(this.time).then(timeInfo => {
          this.time = timeInfo;
          this.time.patrimonio = this.navParams.get('time').patrimonio;
          console.log("loaded time: ", this.time);
          this.loading.dismiss();
        });
      });
    })
  }

  doRefresh(refresher) {
    this.loadTimeParciais();
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
