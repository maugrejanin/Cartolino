import { Injectable, Component, Inject } from "@angular/core";
import { Api } from "../providers";
import { IUserDataControll } from "./userDataControll";
import { get_time_api, status_mercado_aberto, status_mercado_fechado } from "../pages";
import { IJogadoresControll } from "./jogadoresControll";
import { IMercadoControll } from "./mercadoControll";

export interface Time {
    atletas: any,
    pontos: number,
    capitao_id: number
}

export interface ITimeControll {
    loadTime(idTime: string);
    setTime(time: Time);
    loadParciaisDosJogadoresDoTime(time: Time);
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
        @Inject('IJogadoresControll') public jogadoresControll: IJogadoresControll,
        @Inject('IMercadoControll') public mercadoControll: IMercadoControll) { }

    loadTime(idTime: string) {
        return new Promise((resolve, reject) => {
            this.api.getWithAuth(get_time_api + idTime, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        // this.setTime(res.json());
                        this.time = res.json();
                        // quando o mercado esta fechado n ha parcial de jogadores para carregar, a pontuação já
                        // vem no retorno da requisição acima, dentro do array de cada jogador
                        if (this.mercadoControll.getMercadoStatus() == status_mercado_fechado) {
                            this.loadParciaisDosJogadoresDoTime(this.time).then(res => {
                                if (res) {
                                    this.calcularParcialTime().then(time => {
                                        resolve(time)
                                    });
                                }
                            });    
                        } else {
                            resolve(this.time);
                        }
                    }
                );
        });
    }

    setTime(time: Time) {
        this.time = time;
    }

    loadParciaisDosJogadoresDoTime(time: Time) {
        return new Promise((resolve, reject) => {
            for (const i in this.time.atletas) {
                this.time.atletas[i].pontos_num = this.jogadoresControll.getParcialJogador(this.time.atletas[i]['atleta_id']);
            }
            resolve(true);
        })
    }

    calcularParcialTime() {
        return new Promise((resolve, reject) => {
            let parcialTime = 0;
            let parcialAtleta = 0;
            for (const i in this.time.atletas) {
                parcialAtleta = this.time.atletas[i].pontos_num;
                parcialTime += this.time.capitao_id == this.time.atletas[i].atleta_id ? (parcialAtleta * 2) : parcialAtleta;

            }
            this.time.pontos = parcialTime;
            resolve(this.time);
        });

    }
}