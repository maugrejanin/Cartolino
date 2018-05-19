import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LigaControll, ILigasControll, LigaControllFake } from '../../models/ligasControll';
import * as _ from 'lodash';
import { TimeControll, ITimeControll } from '../../models/timeControll';

@IonicPage()
@Component({
  selector: 'page-liga-detail',
  templateUrl: 'liga-detail.html',
  providers: [
    // { provide: 'ILigaControll', useClass: LigaControllFake },
    { provide: 'ILigaControll', useClass: LigaControll },
    { provide: 'ITimeControll', useClass: TimeControll }
  ]
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
    @Inject('ILigaControll') private ligaControll: ILigasControll,
    @Inject('ITimeControll') private timeControll: ITimeControll,
    private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Carregando times...'
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    new Promise((resolve, reject) => {
      this.loadLigaDetails().then(res => {
        res ? this.loading.dismiss() : '';
      })
    });
  }

  loadLigaDetails(orderBy = null, order = null) {
    return new Promise((resolve, reject) => {
      this.liga.nome = this.navParams.get('ligaNome');
      this.liga.url_flamula_svg = this.navParams.get('ligaFlamulaUrl');
      this.liga.descricao = this.navParams.get('ligaDescricao');
      this.ligaControll.loadLiga(this.navParams.get('ligaSlug')).then(liga => {
        this.orderTimesByPontos(liga, orderBy, order);
        resolve(true);
        // let timesToLoad = liga.times.length;
        // for (const time of liga.times) {
        //   this.timeControll.loadTime(time.time_id).then(timeInfo => {
        //     // Vamos assumir que podemos usar a proprieade pontos tanto com mercado aberto quanto fechado
        //     // Acho que com o mercado fechado, essa propriedade retorna os pontos da rodada passada
        //     // Se nao for isso, essa propriedade nem existe, o que me permite cria-la e usa la sem problemas
        //     timeInfo.pontos = parseFloat((timeInfo.pontos).toFixed(2));
        //     this.liga.times.push(timeInfo);
        //     this.liga.times.length==timesToLoad?this.orderTimesByPontos():'';

        //   });
        // }
      });
    })
  }

  orderTimesByPontos(liga, orderBy = null, order = null) {
    orderBy = orderBy ? orderBy : 'pontos.rodada';
    order = order ? order : 'desc';
    console.log("order:",orderBy, order);    
    let timesOrderByPontos = _.orderBy(liga.times, orderBy, order);
    this.liga.times = timesOrderByPontos;
    console.log(this.liga);
  }

  formatPontos(parcial) {
    return parseFloat((parcial).toFixed(2))
  }

  variacaoColor(variacao) {
    if (variacao > 0) {
      return 'green';
    } else if (variacao < 0) {
      return 'red';
    }
  }

  doRefresh(refresher) {
    new Promise((resolve, reject) => {
      this.loadLigaDetails().then(res => {
        res ? refresher.complete() : '';
      })
    });
  }

  orderLigaBy(orderBy, order) {
    if (this.orderBy == orderBy) {
      this.order = order=='asc'?'desc':'asc';
      this.orderTimesByPontos(this.liga, this.orderBy, this.order);
    } else if (this.orderBy != orderBy) {
      this.orderBy = orderBy;
      this.order = 'desc' ;
      this.orderTimesByPontos(this.liga, this.orderBy, this.order);
    } 
  }

  timeDetail(time) {
    this.navCtrl.push('TimeDetailPage',
      {
        time:time
      });
  }
}
