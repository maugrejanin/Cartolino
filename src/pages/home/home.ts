import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController } from 'ionic-angular';
import { UserDataControll, UserDataControllFake, IUserDataControll } from '../../models/iUserData';
import { Inject } from '@angular/core';

@IonicPage()
@Component({
  selector: 'home',
  templateUrl: 'home.html',
  // providers: [{ provide: 'IUserDataControll', useClass: UserDataControllFake }]
  // providers: [{ provide: 'IUserDataControll', useClass: UserDataControll }]
})
export class HomePage {
  teamInfo = {};
  loading;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    @Inject('IUserDataControll') private userDataControll: IUserDataControll,
    private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      spinner:"bubbles",
      content: 'Carregando...'
    });

    this.loading.present();
  }

  ionViewDidLoad() {
    this.userDataControll.initUserData().then(res => {
      if (res) {
        this.teamInfo = this.userDataControll.getTeamInfo();
        this.loading.dismiss();
      }
    });
  }

  openPage(page) {
    this.navCtrl.push(page);
  }
}