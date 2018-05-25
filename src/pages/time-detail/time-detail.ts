import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
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
      this.getTimeParciais(this.time);
    
  }

  getTimeParciais(timeInfo, refresher = null) {
    this.timeControll.getParciaisDosJogadoresDoTime(timeInfo).then(res => {
      if (res.mercadoStatus == status_mercado_fechado) {
        this.time.pontuados = res.time.pontuados;
        this.time.pontos.rodada = res.time.pontos.rodada;
        this.time.pontos.campeonato = (this.time.pontos.rodada + this.time.pontos.campeonato);
      } else {
        this.time.pontuados = 12;
      }
      this.time.pontos.rodada = this.formatPontos(this.time.pontos.rodada);
      this.time.pontos.campeonato = this.formatPontos(this.time.pontos.campeonato);
      this.time.atletas = _.orderBy(timeInfo.atletas, 'posicao_id', 'asc');
      console.log("time: ", this.time);
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

  getPosicao(posicao_id) {
    return this.time.posicoes[posicao_id].nome;
  }

  getTime(clube_id) {
    return this.time.clubes[clube_id].nome;
  }

  click(txt) {
    console.log(txt);
  }

  viewTimes(atleta) {
    this.navCtrl.push('JogadorDetailsPage', {
      atleta: atleta, 
      clube:this.time.clubes[atleta.clube_id],
      posicao: this.time.posicoes[atleta.posicao_id]});
  }
}
