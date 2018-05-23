import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-jogador-details',
  templateUrl: 'jogador-details.html',
})
export class JogadorDetailsPage {

  atleta:any = {
    foto:''
  };

  clube:any = {
    escudos:{
      '60x60':''
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.atleta = this.navParams.get('atleta');
    this.clube = this.navParams.get('clube');
  }

}
