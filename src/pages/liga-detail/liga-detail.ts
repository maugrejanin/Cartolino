import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LigaControll, ILigasControll } from '../../models/ligasControll';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-liga-detail',
  templateUrl: 'liga-detail.html',
  providers: [
    // { provide: 'ILigaControll', useClass: LigaControllFake },
    { provide: 'ILigaControll', useClass: LigaControll }
  ]
})
export class LigaDetailPage {
  liga = {
    times: []
  };
  loading;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('ILigaControll') private ligaControll: ILigasControll,
    private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Carregando...'
    });
  }

  ionViewDidLoad() {
    // this.ligaControll.getPontuados();

    this.ligaControll.loadLiga(this.navParams.get('ligaSlug')).then(ligas => {
      for (const time of ligas.times) {
        this.ligaControll.loadClube(time.time_id).then(timeInfo => {
          this.liga.times.push(timeInfo);
        });
      }
      this.loading.dismiss();
    });


    // this.liga.times = _.orderBy(ligaDetails.times, '')
  }

}
