import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { IUserData } from '../../models/iUserData';
import { IGetUserData } from '../../providers/userData/IGetUserdata';
import { Storage } from '@ionic/storage';
import { IGetUserDataFake } from '../../providers/userData/IGetUserDataFake';

@IonicPage()
@Component({
  selector: 'home',
  templateUrl: 'home.html',
  providers: [IGetUserDataFake]
})
export class HomePage {
  constructor(private navCtrl: NavController, private navParams: NavParams, private userData: IUserData, private storage: Storage, private userDataGetter: IGetUserDataFake) {
    this.storage.ready().then(() => {
      this.storage.get('GLBID').then(GLBID => {
        if (GLBID) {
          console.log(GLBID);          
          this.userData.GLBID = GLBID;
          this.userDataGetter.loadUserData();
        }
        //  else {
        //   this.userDataGetter.loadUserData();
        // }
      })
    })
  }

  ionViewDidLoad() {
    console.log("load");
  }

  openPage(page) {
    this.navCtrl.push(page);
  }
}