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
      content: 'Carregando...'
    });
  }

  ionViewDidLoad() {
    this.liga.nome = this.navParams.get('ligaNome');
    this.ligaControll.loadLiga(this.navParams.get('ligaSlug')).then(ligas => {
      for (const time of ligas.times) {        
        this.timeControll.loadTime(time.time_id).then(timeInfo => {
          this.liga.times.push(timeInfo);
        });
      }
      this.loading.dismiss();
      console.log(this.liga.times);
    });
  }
}
