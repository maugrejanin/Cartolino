import { Injectable, Component, Inject } from "@angular/core";
import { Api } from "../providers";
import { IUserDataControll } from "./userDataControll";
import { get_time_api } from "../pages";
import { IJogadoresControll } from "./jogadoresControll";

export interface Time {
    atletas: any,
    parcial: number,
    capitao_id: number
}

export interface ITimeControll {
    loadTime(idTime: string);
    setTime(time: Time);
    loadJogadoresDoTime(time: Time);
    calcularParcialTime();
}

@Injectable()
@Component({
    providers: [Api]
})
export class TimeControll implements ITimeControll {

    time: Time;

    constructor(
        private api: Api,
        @Inject('IUserDataControll') public userDataControll: IUserDataControll,
        @Inject('IJogadoresControll') public jogadoresControll: IJogadoresControll) { }

    loadTime(idTime: string) {
        return new Promise((resolve, reject) => {
            this.api.getWithAuth(get_time_api + idTime, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        // this.setTime(res.json());
                        this.time = res.json();
                        this.loadJogadoresDoTime(this.time).then(res => {
                            if (res) {
                                this.calcularParcialTime().then(time => {
                                    resolve(time)
                                });
                            }
                        });
                    }
                );
        });
    }

    setTime(time: Time) {
        this.time = time;
    }

    loadJogadoresDoTime(time: Time) {
        return new Promise((resolve, reject) => {
            for (const i in this.time.atletas) {
                this.time.atletas[i].parcial = this.jogadoresControll.getParcialJogador(this.time.atletas[i]['atleta_id']);
            }
            resolve(true);
        })
    }

    calcularParcialTime() {
        return new Promise((resolve, reject) => {
            let parcialTime = 0;
            let parcialAtleta = 0;
            for (const i in this.time.atletas) {
                parcialAtleta = this.time.atletas[i].parcial;
                parcialTime += this.time.capitao_id == this.time.atletas[i].atleta_id ? (parcialAtleta * 2) : parcialAtleta;

            }
            this.time.parcial = parseFloat((parcialTime).toFixed(2));
            resolve(this.time);
        });

    }
}