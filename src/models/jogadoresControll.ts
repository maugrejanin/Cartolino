import { Api } from "../providers";
import { get_pontuados_api } from "../pages";
import { IUserDataControll } from "./userDataControll";
import { Inject, Injectable, Component } from "@angular/core";

export interface Jogadores {
    "rodada": string,
    "atletas": {},
    "clubes": {},
    "posicoes": {},
    "total_atletas": {};
}

export interface IJogadoresControll {
    loadJogadores();
    setJogadores(jogadores: {});
    getJogadores(): {};
    getJogador(jogador_id: string);
    jogadoresLoaded(): boolean;
}

@Injectable()
@Component({
    providers: [Api]
})
export class JogadoresControll implements IJogadoresControll {
    private jogadores: Jogadores;

    constructor(private api: Api, @Inject('IUserDataControll') public userDataControll: IUserDataControll) {
        this.loadJogadores();
    };

    loadJogadores() {
        new Promise((resolve, reject) => {
            this.api.getWithAuth(get_pontuados_api, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        this.setJogadores(res.json());
                        resolve(true);
                    }
                );
        });
    }

    setJogadores(jogadores: Jogadores) {
        this.jogadores = jogadores;        
    };

    getJogadores() { return this.jogadores };

    getJogador(jogador_id: string) {
        // return new Promise((resolve, reject) => {
        //     resolve(this.jogadores.atletas['jogador_id'])
        // })
        return this.jogadores.atletas[jogador_id];
    };

    jogadoresLoaded() {
        return this.getJogadores() ? true : false;
    }
}