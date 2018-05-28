import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ITimeControll, TimeControll, TimeControllFake } from '../../models/timeControll';
import { status_mercado_fechado } from '..';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-time-detail',
  templateUrl: 'time-detail.html'
})
export class TimeDetailPage {
  time = {
    url_escudo_svg: '',
    time_id: '',
    nome: '',
    nome_cartola: '',
    pontuados: 0,
    capitao_id: '',
    pontos: {
      rodada: 0,
      campeonato: 0
    },
    atletas: [],
    posicoes: {},
    clubes: {}
  };
  loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('ITimeControll') private timeControll: ITimeControll,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.time = this.navParams.get('time');
    console.log(this.time.atletas);
    
    this.time.atletas = _.orderBy(this.time.atletas, 'posicao_id', 'asc');
  }

  formatPontos(parcial) {
    return parseFloat((parcial).toFixed(2))
  }

  doRefresh(refresher) {    
    this.timeControll.loadTimesInfo([this.time]).then(times => {
      this.time = times[0];
      this.time.atletas = _.orderBy(this.time.atletas, 'posicao_id', 'asc');
      refresher.complete();
    });
  }

  getPosicao(posicao_id) {
    return this.time.posicoes[posicao_id].nome;
  }

  getTime(clube_id) {
    return this.time.clubes[clube_id].nome;
  }

  viewTimes(atleta) {
    this.navCtrl.push('JogadorDetailsPage', {
      atleta: atleta, 
      clube:this.time.clubes[atleta.clube_id],
      posicao: this.time.posicoes[atleta.posicao_id],
      time_id:this.time.time_id
    });
  }
}
