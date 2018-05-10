import { Injectable } from "@angular/core";
import { IUserData } from "../../models/iUserData";
import { IGetUserDataFromServer } from "../../models/iGetUserDataFromServer";
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController } from "ionic-angular";

@Injectable()
export class IGetUserData implements IGetUserDataFromServer{

    constructor(private userData: IUserData, private http: Http, public navCtrl:NavController){};

    loadUserData() { 
        var headers = new Headers();
        headers.append("X-GLB-Token", this.userData.GLBID);

        let options = new RequestOptions({headers:headers});

        this.http.get("https://api.cartolafc.globo.com/auth/time", options)
            .subscribe(data => {
                this.userData.teamInfo = JSON.parse(data['_body']).time;                
            }, error => {
                console.log("erro");
                console.log(error);// Error getting the data
            });
    };
}