import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ILigasControll, LigaControllFake } from '../../models/ligasControll';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-jogador-details',
  templateUrl: 'jogador-details.html'
})
export class JogadorDetailsPage {

  atleta: any = {
    foto: '',
    scout: []
  };

  scout = {
    RB: {
      acao: 'Roubada de bola',
      pontos: 1.7
    },
    DD: {
      acao: "Defesa difícil",
      pontos: 3.0
    },
    GS: {
      acao: "Gol sofrido",
      pontos: -2.0
    }
  };

  clube: any = {
    escudos: {
      '60x60': ''
    }
  }

  posicao: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('ILigasControll') public ligaController: ILigasControll) {

  }

  ionViewDidLoad() {
    this.atleta = this.navParams.get('atleta');
    this.clube = this.navParams.get('clube');
    this.posicao = this.navParams.get('posicao');
    this.getAtletaScout();
    console.log("atleta: ", this.atleta);
    this.getTimesComJogador();
  }

  getAtletaScout() {
    var treatedScout = [];
    for (let i in this.atleta.scout) {
      treatedScout.push({
        acao: this.scout[i].acao,
        quantidade: this.atleta.scout[i],
        pontos: (this.scout[i].pontos * this.atleta.scout[i])
      });
    }
    return (treatedScout);
  }

  getTimesComJogador() {
    console.log("sptc: ", this.atleta.atleta_id);

    console.log("times: ",
      _.filter(
        this.ligaController.getLiga().times,
        function (atleta) {
          return atleta;
        }
      )
    );
  }

  //       "FC" => array(
  //     "acao" => "Falta cometida",
  //     "pontos" => -0.5
  //   ),
  //   "GC" => array(
  //     "acao" => "Gol contra",
  //     "pontos" => -6.0
  //   ),
  //   "CA" => array(
  //     "acao" => "Cartão amarelo",
  //     "pontos" => -2.0
  //   ),
  //   "CV" => array(
  //     "acao" => "Cartão vermelho",
  //     "pontos" => -5.0
  //   ),
  //   "FS" => array(
  //     "acao" => "Falta sofrida",
  //     "pontos" => 0.5
  //   ),
  //   "PE" => array(
  //     "acao" => "Passe errado",
  //     "pontos" => -0.3
  //   ),
  //   "FT" => array(
  //     "acao" => "Finalização na trave",
  //     "pontos" => 3.5
  //   ),
  //   "FD" => array(
  //     "acao" => "Finalização defendida",
  //     "pontos" => 1.0
  //   ),
  //   "FF" => array(
  //     "acao" => "Finalização para fora",
  //     "pontos" => 0.7
  //   ),
  //   "G" => array(
  //     "acao" => "Gols",
  //     "pontos" => 8.0
  //   ),
  //   "I" => array(
  //     "acao" => "Impedimento",
  //     "pontos" => -0.5
  //   ),
  //   "PP" => array(
  //     "acao" => "Penalti perdido",
  //     "pontos" => -3.5
  //   ),
  //   "A" => array(
  //     "acao" => "Assistência",
  //     "pontos" => 5.0
  //   ),
  //   "SG" => array(
  //     "acao" => "Jogo sem sofrer gol",
  //     "pontos" => 5.0
  //   ),
  //   ,
  //   "DP" => array(
  //     "acao" => "Defesa de penalti",
  //     "pontos" => 7.0
  //   ),
  //   
  // ];

}
