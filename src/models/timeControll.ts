import { Injectable, Component, Inject } from "@angular/core";
import { Api } from "../providers";
import { IUserDataControll } from "./userDataControll";
import { get_time_api } from "../pages";
import { IJogadoresControll } from "./jogadoresControll";

export interface Time {
   atletas:any,
   parcial:number,
   capitao_id:number
}

export interface ITimeControll {
    loadTime(idTime: string);
    setTime(time:Time);
    loadJogadoresDoTime(time:{});
    calcularParcialTime(time: {});
}

@Injectable()
@Component({
    providers: [Api]
})
export class TimeControll implements ITimeControll {

    time:Time;

    constructor(
        private api: Api, 
        @Inject('IUserDataControll') public userDataControll: IUserDataControll,
        @Inject('IJogadoresControll') public jogadoresControll: IJogadoresControll){}

    loadTime(idTime: string) {
        return new Promise((resolve, reject) => {
            this.api.getWithAuth(get_time_api + idTime, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {                                    
                        // this.setTime(res.json());
                        this.loadJogadoresDoTime(res.json()).then((time:{atletas}) => {
                            // if (res) {
                            this.calcularParcialTime(time);
                            resolve(time)
                            // }
                        });
                    }
                );
        });
    }

    setTime(time: Time){
        this.time = time;
    }

    loadJogadoresDoTime(time:{atletas}) { 
        return new Promise((resolve, reject) => {
            for (const i in time.atletas) {
                time.atletas[i].parcial = this.jogadoresControll.getParcialJogador(time.atletas[i]['atleta_id']);
            }
            resolve(time);
        })
    }

    calcularParcialTime(time:{atletas, parcial, capitao_id}){
        return new Promise((resolve, reject) => {
            let parcialTime = 0;
            let parcialAtleta = 0;
            for (const i in time.atletas) {
                parcialAtleta = time.atletas[i].parcial; 
                parcialTime += time.capitao_id == time.atletas[i].atleta_id?(parcialAtleta*2):parcialAtleta;
                
            }            
            time.parcial = parseFloat((parcialTime).toFixed(2));
        });
        
    }
}