import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { IJogadoresControll } from '../../models/jogadoresControll';

@IonicPage()
@Component({
  selector: 'page-jogadores',
  templateUrl: 'jogadores.html',
})
export class JogadoresPage {
  loading;
  atletas = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('IJogadoresControll') public jogadoresCtrl: IJogadoresControll,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.showLoadSpinner();
    this.loadJogadores();
  }

  loadJogadores(refresher = null) {
    this.jogadoresCtrl.getJogadores().then(res => {
      this.hideLoadSpinner();
      this.atletas = res;
      if (refresher) {
        refresher.complete();
      }
    });
  }

  doRefresh(refresh) {
    this.loadJogadores(refresh);
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
