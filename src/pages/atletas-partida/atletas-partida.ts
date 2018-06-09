import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IJogadoresControll } from '../../models/jogadoresControll';
import * as _ from 'lodash';
import { Partida } from '../../models/partidasControll';

@IonicPage()
@Component({
  selector: 'page-atletas-partida',
  templateUrl: 'atletas-partida.html',
})
export class AtletasPartidaPage {
  partidas: Partida[];
  clubes;
  posicoes;
  partida: Partida;
  atletas;
  atletas_casa;
  atletas_visitante;
  mandante_nome: string = '';
  visitante_nome: string = '';
  clube: string = this.mandante_nome;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('IJogadoresControll') private jogadoresCtrl: IJogadoresControll) {
  }

  ionViewDidLoad() {
    this.partidas = this.navParams.get('partidas');
    this.clubes = this.navParams.get('clubes');
    this.partida = this.navParams.get('partida');
    this.filterJogadoresDosClubes();
    this.setClubesNomes();
  }

  setClubesNomes() {
    this.mandante_nome = this.clubes[this.partida.clube_casa_id].nome;
    this.visitante_nome = this.clubes[this.partida.clube_visitante_id].nome;
  }

  filterJogadoresDosClubes() {
    this.jogadoresCtrl.getJogadoresDoMercado().then(atletas => {
      console.log("atletas: ", atletas);
      this.atletas = atletas;
      this.atletas_casa = _.filter(atletas.atletas, (atleta) => { return (atleta.clube_id == this.partida['clube_casa_id'] && atleta.status_id == 7) });
      this.atletas_visitante = _.filter(atletas.atletas, (atleta) => { return (atleta.clube_id == this.partida['clube_visitante_id'] && atleta.status_id == 7) });
    });
  }
}
