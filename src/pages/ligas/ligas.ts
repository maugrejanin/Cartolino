import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LigaControll, ILigasControll, LigaControllFake } from '../../models/ligasControll';
import { UserDataControllFake, UserDataControll, IUserDataControll } from '../../models/iUserData';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-ligas',
  templateUrl: 'ligas.html',
  providers: [
    // { provide: 'ILigaControll', useClass: LigaControllFake },
    { provide: 'ILigaControll', useClass: LigaControll }
  ]
})
export class LigasPage {
  ligas = {
    ligasClassicas : [],
    ligasDoCartola : [],
    ligasMataMata : []
  }

  loading;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('IUserDataControll') private userDataControll: IUserDataControll,
    @Inject('ILigaControll') private ligaControll: ILigasControll,
    private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Carregando...'
    });
  }

  ionViewDidLoad() {
    if (this.userDataControll.isUserLogged()) {
      this.ligaControll.loadLigas().then(res => {
        if (res) {
          let ligas = _.orderBy(this.ligaControll.getLigas(), 'nome', 'asc');
          this.ligas.ligasClassicas = _.filter(ligas, (liga) => { return liga.time_dono_id });
          this.ligas.ligasDoCartola = _.filter(ligas, (liga) => { return !liga.time_dono_id });
          this.loading.dismiss();
        }
      });
    }
  }

  ligaDetail(liga){
    this.navCtrl.push('LigaDetailPage', {ligaSlug: liga.slug});
  }
}
