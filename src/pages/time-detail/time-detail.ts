import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ITimeControll, TimeControll, TimeControllFake, Time } from '../../models/timeControll';
import { status_mercado_fechado } from '..';
import * as _ from 'lodash';
import { Scout } from '../scout';
import { IMercadoControll } from '../../models/mercadoControll';
import { Atleta } from '../../models/jogadoresControll';

@IonicPage()
@Component({
  selector: 'page-time-detail',
  templateUrl: 'time-detail.html',
  providers: [Scout]
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
    atletas: [{
      scoutAbreviado: [{}],
      posicao_id: '',
      foto: '',
      atleta_id: '',
      apelido: '',
      pontos_num: '',
      clube_id: ''
    }],
    posicoes: {},
    clubes: {}
  };
  loading;
  scoutOk = false;
  status_mercado;
  status_mercado_fechado = status_mercado_fechado;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('ITimeControll') private timeCtrl: ITimeControll,
    @Inject('IMercadoControll') private mercadoCtrl: IMercadoControll,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public scoutGetter: Scout) {
  }

  ionViewDidLoad() {
    this.time = this.navParams.get('time');
    this.time.atletas = _.orderBy(this.time.atletas, 'posicao_id', 'asc');
    this.getAtletaScout();
  }

  ionViewWillEnter() {
    this.mercadoCtrl.getMercadoStatus().then(status_mercado => {
      this.status_mercado = status_mercado;
    });
  }

  formatPontos(parcial) {
    return parseFloat((parcial).toFixed(2))
  }

  doRefresh(refresher) {
    this.timeCtrl.loadTimesDaLiga([this.time]).then(times => {
      this.time = times[0];
      this.time.atletas = _.orderBy(this.time.atletas, 'posicao_id', 'asc');
      this.getAtletaScout();
      refresher.complete();
    });
  }

  getPosicao(posicao_id) {
    try {
      return this.time.posicoes[posicao_id].nome;
    }
    catch{
      console.log("Id de jogador indefinido");
    }
  }

  getTimeEscudo(clube_id) {
    try {
      return this.time.clubes[clube_id].escudos['60x60'];
    } catch (error) {
      console.log("Id de clube indefinido");
    }
  }

  getAtletaScout() {
    this.scoutGetter.getScout(this.time.atletas).then((atletas) => {
      // this.time.atletas = [atletas];
    });
  }

  viewTimes(atleta) {
    this.navCtrl.push('JogadorDetailsPage', {
      atleta: atleta,
      clube: this.time.clubes[atleta.clube_id],
      posicao: this.time.posicoes[atleta.posicao_id],
      time_id: this.time.time_id
    });
  }
}