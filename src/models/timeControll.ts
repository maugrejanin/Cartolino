import { Injectable, Component, Inject } from "@angular/core";
import { Api } from "../providers";
import { IUserDataControll } from "./userDataControll";
import { get_time_api } from "../pages";
import { IJogadoresControll } from "./jogadoresControll";

export interface Time {
   atletas:any,
   pontuados:[{}]
}

export interface ITimeControll {
    loadTime(idTime: string);
    setTime(time:Time);
    loadJogadoresDoTime();
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
                        this.setTime(res.json());
                        this.loadJogadoresDoTime().then(res => {
                            if (res) {
                                resolve(this.time)
                            }
                        });
                    }
                );
        });
    }

    setTime(time: Time){
        this.time = time;
    }

    loadJogadoresDoTime() { 
        return new Promise((resolve, reject) => {
            for (const jogador of this.time.atletas) {
                this.time.pontuados = this.jogadoresControll.getJogador(jogador.atleta_id);
            }
            resolve(true);
        })
    }
}