import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController, private navParams: NavParams) {
    var cartolaData = this.navParams.get('data');
    if (cartolaData) {
      console.log(cartolaData);
    } else {
      console.log("not");
    }
  }

  openPage(page) {
    this.navCtrl.push(page);
  }
}