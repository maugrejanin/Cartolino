import { Injectable } from "@angular/core";
import { IUserData } from "../../models/iUserData";
import { IGetUserDataFromServer } from "../../models/iGetUserDataFromServer";
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController } from "ionic-angular";
import { Storage } from '@ionic/storage';

@Injectable()
export class IGetUserDataFake implements IGetUserDataFromServer {

    constructor(private userData: IUserData, private http: Http, public navCtrl: NavController, public storage: Storage) {
        this.storage.ready().then(() => {
            this.storage.set('GLBID', '1021a3e0d4ecd085008493615c9b2872b7a664e655f4f56617351794f6b4239574e3357585878382d524e4f6c51795479624e7662576a756950586e616d31385545737270497256454738335476794b415a647a4579703566494162435238477a702d663150773d3d3a303a6d6175726963696f5f6a756e696f725f323031355f32');
        })
     };

    loadUserData() {
        var headers = new Headers();
        headers.append("X-GLB-Token", this.userData.GLBID);
        headers.append("Access-Control-Allow-Origin", '*'); 
        headers.append("Access-Control-Allow-Origin", 'http://localhost:8100');

        let options = new RequestOptions({ headers: headers });

        this.http.get("https://api.cartolafc.globo.com/auth/time", options)
            .subscribe(data => {
                this.userData.teamInfo = JSON.parse(data['_body']).time;
            }, error => {
                console.log("erro");
                console.log(error);// Error getting the data
            });
    };
}