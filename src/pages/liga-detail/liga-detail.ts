import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LigaControll, ILigasControll, LigaControllFake } from '../../models/ligasControll';
import * as _ from 'lodash';
import { TimeControll, ITimeControll, TimeControllFake } from '../../models/timeControll';
import { status_mercado_fechado } from '..';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('ILigasControll') private ligaControll: ILigasControll,
    private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Carregando times...'
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    this.liga.nome = this.navParams.get('ligaNome');
    this.liga.url_flamula_svg = this.navParams.get('ligaFlamulaUrl');
    this.liga.descricao = this.navParams.get('ligaDescricao');
    this.loadLigaDetails();
  }

  loadLigaDetails(refresher = null) {
    this.ligaControll.loadLiga(this.navParams.get('ligaSlug')).then(liga => {
      if (liga) {
        console.log("Liga: ", liga);
        liga.times = _.orderBy(liga.times, this.orderBy, this.order);
        this.liga.times = liga.times;
        this.loading.dismiss();
      }
      refresher?refresher.complete():'';
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
    this.loadLigaDetails(refresher);
  }

  timeDetail(time) {
    this.navCtrl.push('TimeDetailPage',
      {
        time: time
      });
  }
}
