import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ILigasControll, LigaControllFake } from '../../models/ligasControll';
import * as _ from 'lodash';
import { Scout } from './scout';

@IonicPage()
@Component({
  selector: 'page-jogador-details',
  templateUrl: 'jogador-details.html'
})
export class JogadorDetailsPage {

  atleta: any = {
    foto: '',
  };

  clube: any = {
    escudos: {
      '60x60': ''
    }
  }

  timesComAtleta = [];

  posicao: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('ILigasControll') public ligaController: ILigasControll) {}

  ionViewDidLoad() {
    this.atleta = this.navParams.get('atleta');
    this.clube = this.navParams.get('clube');
    this.posicao = this.navParams.get('posicao');
    this.getTimesComJogador();
  }

  getTimesComJogador() {
    let temJogador;
    for (let time of this.ligaController.getLiga().times) {
      temJogador = _.filter(time.atletas, (atleta) => { return atleta.atleta_id == this.atleta.atleta_id });
      if (temJogador.length > 0 && time.time_id != this.navParams.get('time_id')) {
        this.timesComAtleta.push(time);
      }
    }
  }

  timeDetail(time) {
    this.navCtrl.push('TimeDetailPage',
      {
        time: time
      });
  }

}
