import { Component, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { IUserDataControll } from '../../models/userDataControll';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [InAppBrowser]
})
export class LoginPage {
  browser: any;
  loading;
  constructor(
    private iab: InAppBrowser, 
    private storage: Storage, 
    private navCtrl: NavController, 
    @Inject('IUserDataControll') public userDataControll: IUserDataControll,
    private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    this.startLoginGlobo();
    this.showLoadSpinner();
  }

  showLoadSpinner() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Carregando...'
    });

    this.loading.present();
  }

  hideLoadSpinner() {
    this.loading.dismiss();
  }

  startLoginGlobo() {
    this.browser = this.iab.create('https://login.globo.com/login/438', '_blank', { hidden: 'yes' });
    this.browser.on("loadstart").subscribe(event => this.handleOnLoadStart(event));
    this.browser.on("loadstop").subscribe(event => this.handleOnLoadStop(event));
    this.browser.on("exit").subscribe(event => this.handleOnExit(event));
  }

  private handleOnExit(event: InAppBrowserEvent) {
    this.hideLoadSpinner();
    this.navCtrl.pop();
  }

  private handleOnLoadStart(event: InAppBrowserEvent) {
    // console.log("handleOnLoadStart");
  }

  private handleOnLoadStop(event: InAppBrowserEvent) {
    this.browser.show();

    setInterval(() => {
      this.browser.executeScript({ code: `document.cookie` })
        .then(args => {
          if (args[0]) {
            var cookie = args[0];
            var name = "GLBID=";
            var decodedCookie = decodeURIComponent(cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                var GLBID = c.substring(name.length, c.length);
                this.userDataControll.setGLBID(GLBID);
                this.storage.set('GLBID', GLBID);
                this.browser.close();
              }
            }
          }
        });
    }, 1000);
  }
}
