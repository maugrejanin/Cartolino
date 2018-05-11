import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { UserDataControll, UserDataControllFake, IUserDataControll } from '../../models/iUserData';
import { Storage } from '@ionic/storage';
import { Inject } from '@angular/core';

@IonicPage()
@Component({
  selector: 'home',
  templateUrl: 'home.html',
  providers: [{ provide: 'IUserDataControll', useClass: UserDataControll }]
})
export class HomePage {
  teamInfo = {};
  fakeMode = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, @Inject('IUserDataControll') private userDataControll: IUserDataControll, private storage: Storage) {
  }

  ionViewDidLoad() {
    if (this.fakeMode) {
      this.teamInfo = JSON.parse('{"time_id":7033528,"clube_id":264,"esquema_id":3,"globo_id":"530d15c6-1a3e-457c-bad1-bacc0855f233","facebook_id":717449224963234,"foto_perfil":"https://graph.facebook.com/v2.9/717449224963234/picture?width=100&height=100","nome":"SuperGemeos F.C","nome_cartola":"Mauricio Junior","slug":"supergemeos-f-c","tipo_escudo":1,"cor_fundo_escudo":"063780","cor_borda_escudo":"000000","cor_primaria_estampa_escudo":"ffffff","cor_secundaria_estampa_escudo":"bf1d17","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","url_escudo_png":"https://s2.glbimg.com/AiUtaBuJtJMHa3z73UNHE7MNo7s=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","url_camisa_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/camisa/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","url_camisa_png":"https://s2.glbimg.com/m49X5VtSnwYa-8-UTj7YpMZHlGU=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/camisa/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","tipo_estampa_escudo":2,"tipo_adorno":4,"tipo_camisa":2,"tipo_estampa_camisa":5,"cor_camisa":"063780","cor_primaria_estampa_camisa":"ffffff","cor_secundaria_estampa_camisa":"bf1d17","rodada_time_id":4,"assinante":false,"cadastro_completo":true,"patrocinador1_id":64,"patrocinador2_id":62,"temporada_inicial":2016,"simplificado":false,"sorteio_pro_num":null}');
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