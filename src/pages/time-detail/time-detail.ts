import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ITimeControll, TimeControll, TimeControllFake } from '../../models/timeControll';
import { status_mercado_fechado } from '..';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-time-detail',
  templateUrl: 'time-detail.html',
  providers: [
    // { provide: 'ITimeControll', useClass: TimeControllFake }
    { provide: 'ITimeControll', useClass: TimeControllFake }
  ]
})
export class TimeDetailPage {
  time = {
    url_escudo_svg: '',
    time_id: '',
    nome: '',
    nome_cartola: '',
    pontuados: 0,
    pontos: {
      rodada: 0,
      campeonato: 0
    },
    atletas: [{
      foto: ''
    }],
    posicoes:{},
    clubes:{}
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
    this.time = this.navParams.get('time');
    this.loadTimeParciais();
  }

  loadTimeParciais() {
    this.timeControll.loadTime(this.time).then(timeInfo => {
      this.time.atletas = _.orderBy(timeInfo.atletas, 'posicao_id', 'asc');
      this.time.clubes = timeInfo.clubes;
      this.time.posicoes = timeInfo.posicoes;
      console.log("atletas: ", this.time.atletas);      
      this.getTimeParciais(timeInfo);
    });
  }

  getTimeParciais(timeInfo, refresher = null) {
    this.timeControll.getParciaisDosJogadoresDoTime(timeInfo).then(res => {
      if (res.mercadoStatus == status_mercado_fechado) {
        this.time.pontuados = res.time.pontuados;
        this.time.pontos.rodada = res.time.pontos.rodada;
        this.time.pontos.campeonato = (this.time.pontos.rodada+this.time.pontos.campeonato);
      } else {
        this.time.pontuados = 12;
      }
      this.time.pontos.rodada = this.formatPontos(this.time.pontos.rodada);
      this.time.pontos.campeonato = this.formatPontos(this.time.pontos.campeonato);
      if (refresher) {
        refresher.complete();
      }
      this.loading.dismiss();
    })
  }

  formatPontos(parcial) {
    return parseFloat((parcial).toFixed(2))
  }

  doRefresh(refresher) {
    this.getTimeParciais(this.time, refresher);
  }

}
