import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ITimeControll, TimeControll, TimeControllFake } from '../../models/timeControll';
import { status_mercado_fechado } from '..';
import * as _ from 'lodash';
import { Scout } from '../scout';
import { IMercadoControll } from '../../models/mercadoControll';

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
    atletas: [],
    posicoes: {},
    clubes: {}
  };
  loading;
  scoutOk = false;

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

  formatPontos(parcial) {
    return parseFloat((parcial).toFixed(2))
  }

  doRefresh(refresher) {
    this.timeCtrl.loadTimesInfo([this.time]).then(times => {
      this.time = times[0];
      this.time.atletas = _.orderBy(this.time.atletas, 'posicao_id', 'asc');
      this.getAtletaScout();
      refresher.complete();
    });
  }

  getPosicao(posicao_id) {
    return this.time.posicoes[posicao_id].nome;
  }

  getTime(clube_id) {
    return this.time.clubes[clube_id].nome;
  }

  getAtletaScout() {
    for (let i in this.time.atletas) {
      if (this.time.atletas[i].scout != null && Object.keys(this.time.atletas[i].scout).length && this.time.atletas[i].posicao_id != 6) {
        if (typeof this.time.atletas[i].scout[0] == 'undefined') {
          this.scoutGetter.getScout(this.time.atletas[i].scout).then(scout => {            
            this.time.atletas[i].scout = scout['treatedScout'];
            this.time.atletas[i].scoutAbreviado = scout['scoutAbreviado'];
            this.scoutOk = (parseInt(i) + 2) == Object.keys(this.time.atletas).length ? true : false;            
          });
        } else {
          this.scoutOk = true;
        }
      } else {
        this.time.atletas[i].scout = false;
      }
    }
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