import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LigaControll, ILigasControll, LigaControllFake } from '../../models/ligasControll';
import * as _ from 'lodash';
import { TimeControll, ITimeControll } from '../../models/timeControll';
import { status_mercado_fechado } from '..';
import { IMercadoControll } from '../../models/mercadoControll';
import { Time } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-liga-detail',
  templateUrl: 'liga-detail.html'
})
export class LigaDetailPage {
  liga = {
    times: [],
    nome: '',
    url_flamula_svg: '',
    descricao: ''
  };
  loading;
  orderBy = 'pontos.rodada';
  order = 'desc';
  status_mercado;
  status_mercado_fechado = status_mercado_fechado;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('ILigasControll') private ligaCtrl: ILigasControll,
    @Inject('IMercadoControll') private mercadoCtrl: IMercadoControll,
    @Inject('ITimeControll') private timeCtrl: ITimeControll,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.liga.nome = this.navParams.get('ligaNome');
    this.liga.url_flamula_svg = this.navParams.get('ligaFlamulaUrl');
    this.liga.descricao = this.navParams.get('ligaDescricao');
    this.loadLiga();
    this.showLoadSpinner();
  }

  ionViewWillEnter() {
    this.mercadoCtrl.getMercadoStatus().then(status_mercado => {
      this.status_mercado = status_mercado;
    });
  }

  loadLiga() {
    this.ligaCtrl.loadLiga(this.navParams.get('ligaSlug')).then(res => {
      if (res) {
        this.loadTimesDaLiga();
      }
    });
  }

  loadTimesDaLiga(refresher = null) {
    this.timeCtrl.loadTimesDaLiga(this.ligaCtrl.getLiga()).then(liga => {
      this.liga.times = _.orderBy(liga.times, this.orderBy, this.order);
      this.hideLoadSpinner();
      refresher ? refresher.complete() : '';
    });
  }


  orderLigaBy(orderBy, order) {
    if (this.orderBy == orderBy) {
      this.order = order == 'asc' ? 'desc' : 'asc';
    } else if (this.orderBy != orderBy) {
      this.orderBy = orderBy;
      this.order = 'desc';
    }
    this.liga.times = _.orderBy(this.liga.times, this.orderBy, this.order);
  }

  formatPontos(parcial) {
    return parseFloat((parcial).toFixed(2))
  }

  doRefresh(refresher) {
    this.loadTimesDaLiga(refresher);
  }

  getTimePos(time, index) {
    return (this.order == 'desc' ? index + 1 : Object.keys(this.liga.times).length - index) + '°';
  }

  timeDetail(time) {
    this.navCtrl.push('TimeDetailPage',
      {
        time: time
      });
  }

  showLoadSpinner() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Carregando...'
    });

    this.loading.present();
  }

  hideLoadSpinner() {
    this.loading.dismiss();
  }
}
