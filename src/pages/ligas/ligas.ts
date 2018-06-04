import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LigaControll, ILigasControll, LigaControllFake } from '../../models/ligasControll';
import { IUserDataControll } from '../../models/userDataControll';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-ligas',
  templateUrl: 'ligas.html'
})
export class LigasPage {
  ligas = {
    ligasClassicas: [],
    ligasDoCartola: [],
    ligasMataMata: []
  };
  loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('IUserDataControll') private userDataControll: IUserDataControll,
    @Inject('ILigasControll') private ligaControll: ILigasControll,
    private loadingCtrl: LoadingController) { }

  ionViewDidLoad() {
    this.showLoadSpinner();
    this.ligaControll.getLigas().then(ligas => {
      this.ligas.ligasClassicas = _.filter(ligas, (liga) => { return liga.time_dono_id });
      this.ligas.ligasDoCartola = _.filter(ligas, (liga) => { return !liga.time_dono_id });
      this.ligas.ligasMataMata = _.filter(ligas, (liga) => { return liga.mata_mata });
      this.hideLoadSpinner();
    })
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

  ligaDetail(liga) {
    this.navCtrl.push('LigaDetailPage',
      {
        ligaSlug: liga.slug,
        ligaNome: liga.nome,
        ligaFlamulaUrl: liga.url_flamula_svg,
        ligaDescricao: liga.descricao
      });
  }
}
