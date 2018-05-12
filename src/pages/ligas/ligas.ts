import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LigaControll, ILigasControll, LigaControllFake } from '../../models/ligasControll';
import { UserDataControllFake, UserDataControll } from '../../models/iUserData';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-ligas',
  templateUrl: 'ligas.html',
  providers: [
    // { provide: 'ILigaControll', useClass: LigaControllFake },
    // { provide: 'IUserDataControll', useClass: UserDataControllFake }
    { provide: 'ILigaControll', useClass: LigaControll },
    { provide: 'IUserDataControll', useClass: UserDataControll }
  ]
})
export class LigasPage {
  ligas: {};
  fakeMode = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject('ILigaControll') private ligaControll: ILigasControll) {
  }

  ionViewDidLoad() {
    if (this.fakeMode) {
      this.ligas = _.orderBy(this.ligaControll.getLigas(), 'liga_id', 'desc');
      console.log("ligas: ", this.ligas);

    } else {
      this.ligaControll.loadLigas().then(res => {
        if (res) {
          this.ligas = this.ligaControll.getLigas();
        }
      });
    }
  }

}
