import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { UserDataControll, UserDataControllFake, IUserDataControll } from '../../models/iUserData';
import { Storage } from '@ionic/storage';
import { Inject } from '@angular/core';

@IonicPage()
@Component({
  selector: 'home',
  templateUrl: 'home.html',
  // providers: [{ provide: 'IUserDataControll', useClass: UserDataControllFake }]
  providers: [{ provide: 'IUserDataControll', useClass: UserDataControll }]
})
export class HomePage {
  teamInfo = {};
  fakeMode = false;
  constructor(private navCtrl: NavController, private navParams: NavParams, @Inject('IUserDataControll') private userDataControll: IUserDataControll, private storage: Storage) {
  }

  ionViewDidLoad() {
    if (this.fakeMode) {
      this.teamInfo = this.userDataControll.getTeamInfo();
      console.log("teamInfo: ", this.teamInfo);
    } else {
      this.userDataControll.loadUserData().then(res => {
        if (res) {
          this.teamInfo = this.userDataControll.getTeamInfo();
          console.log(this.teamInfo);
        }
      }, err => {
        console.log("err: ", err);
      }).catch(err => {
        console.log(err);
      });
    }
  }

  openPage(page) {
    this.navCtrl.push(page);
  }
}