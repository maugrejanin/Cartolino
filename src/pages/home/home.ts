import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController } from 'ionic-angular';
import { IUserDataControll } from '../../models/userDataControll';
import { Inject } from '@angular/core';
import { IMercadoControll } from '../../models/mercadoControll';

@IonicPage()
@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {
  teamInfo = {};
  loading;
  userLogged = false;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    @Inject('IUserDataControll') private userDataControll: IUserDataControll,
    @Inject('IMercadoControll') private mercadoControll: IMercadoControll,
    private loadingCtrl: LoadingController) { }

  ionViewWillEnter() {
    if (Object.keys(this.teamInfo).length === 0 && this.teamInfo.constructor === Object) {
      this.showLoadSpinner();
      this.userDataControll.initUserData().then(res => {
        if (res) {
          this.userLogged = true;
          this.teamInfo = this.userDataControll.getTeamInfo();
          this.hideLoadSpinner();
        } else {
          this.hideLoadSpinner();
        }
      });
    }
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

  openPage(page) {
    this.navCtrl.push(page);
  }
}