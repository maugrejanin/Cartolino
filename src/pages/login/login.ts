import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { NavController, IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home';
import { IUserData } from '../../models/iUserData';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [InAppBrowser]
})
export class LoginPage {
  browser:any;
  constructor(private http: Http, private iab: InAppBrowser, private storage: Storage, private navCtrl: NavController, private userData: IUserData) {
  }

  ionViewDidLoad() {
    this.startLoginGlobo();
  }

  startLoginGlobo() {
    this.browser = this.iab.create('https://login.globo.com/login/438', '_blank', { hidden: 'yes' });
    this.browser.on("loadstart").subscribe(event => this.handleOnLoadStart(event));
    this.browser.on("loadstop").subscribe(event => this.handleOnLoadStop(event));
    this.browser.on("exit").subscribe(event => this.handleOnExit(event));
  }

  private handleOnExit(event: InAppBrowserEvent) {
    // this.getCartolaData();
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
                this.userData.GLBID = c.substring(name.length, c.length);
                this.storage.set('GLBID', this.userData.GLBID);
                this.browser.close();
              }
            }
          }
        });
    }, 1000);
  }

  // getCartolaData() {
  //   var headers = new Headers();
  //   headers.append("X-GLB-Token", this.GLBID);

  //   let options = new RequestOptions({ headers: headers });

  //   this.http.get("https://api.cartolafc.globo.com/auth/time", options)
  //     .subscribe(data => {
  //       this.navCtrl.pop();
  //       this.navCtrl.push(HomePage, { data: data['_body'] });
  //     }, error => {
  //       console.log("erro");
  //       console.log(error);// Error getting the data
  //     });
  // }
}
