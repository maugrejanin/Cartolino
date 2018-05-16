import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LigaControll, ILigasControll } from '../../models/ligasControll';
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
    nome:''
  };
  loading;
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
    this.liga.nome = this.navParams.get('ligaNome');
    this.ligaControll.loadLiga(this.navParams.get('ligaSlug')).then(liga => {  
      this.orderTimesByPontos(liga);    
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
  }

  orderTimesByPontos(liga){
    let timesOrderByPontos = _.orderBy(liga.times, 'pontos.rodada', 'desc');
    this.liga.times = timesOrderByPontos;
    this.loading.dismiss();
    console.log(this.liga);    
  }

  formatPontos(parcial){
    return parseFloat((parcial).toFixed(2))
  }

  variacaoColor(variacao){
    if (variacao>0) {
      return 'green';
    } else if (variacao<0) {
      return 'red';
    }
  }
}
