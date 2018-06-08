import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PartidasControll, IPartidasControll, PartidasControllFake } from '../../models/partidasControll';
import * as _ from "lodash";
import { IJogadoresControll } from '../../models/jogadoresControll';

@IonicPage()
@Component({
  selector: 'page-jogos',
  templateUrl: 'jogos.html',
  providers: [
    { provide: 'IPartidasControll', useClass: PartidasControll }
    // { provide: 'IPartidasControll', useClass: PartidasControllFake }
  ]
})
export class JogosPage {
  partidas = {};
  clubes = {};
  partidasLoaded = false;
  rodada;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    @Inject('IPartidasControll') private partidasCtrl: IPartidasControll,
    @Inject('IJogadoresControll') private jogadoresCtrl: IJogadoresControll) {
  }

  ionViewDidLoad() {
    this.getPartidas();
  }

  getPartidas() {
    this.partidasCtrl.getPartidas().then(res => {
      this.partidas = _.orderBy(res.partidas, 'partida_data', 'asc');
      this.clubes = res.clubes;
      this.rodada = res.rodada;
      this.partidasLoaded = true;
    })
  }

  doRefresh(refresher) {
    this.partidasCtrl.getPartidas().then(res => {
      this.partidas = _.orderBy(res.partidas, 'partida_data', 'asc');
      refresher.complete();
    })
  }

  openSelect(){
    console.log("open");
    
  }

  filterJogadoresDosClubes(partida){
    this.jogadoresCtrl.getJogadoresDoMercado().then(atletas => {
      console.log("atletas: ", atletas);      
    });
  }

}
