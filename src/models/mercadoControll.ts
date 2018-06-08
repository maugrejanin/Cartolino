import { Injectable, Component, Inject } from "@angular/core";
import { Api } from "../providers";
import { get_mercado_info_api } from "../pages";
import { IUserDataControll } from "./userDataControll";

export interface Mercado {
    "rodada_atual",
    "status_mercado",
    "fechamento"
}

export interface IMercadoControll {
    getMercadoInfo();
    updateMercadoInfo();
    getMercadoStatus();
}

@Injectable()
@Component({
    providers: [Api]
})
export class MercadoControll implements IMercadoControll {
    private mercado: Mercado;

    constructor(private api: Api, @Inject('IUserDataControll') public userDataControll: IUserDataControll) {
        this.getMercadoInfo();
    };

    getMercadoInfo() {
        return this.api.getWithAuth(get_mercado_info_api, {})
            // .toPromise()
            .then(
                res => {
                    console.log("mercado: ", res);
                    
                    // this.mercado = res;
                }
            ).catch(err => {
                console.log("Erro ao carregar status do mercado", err);
            });
    }

    getMercadoStatus() {
        return new Promise((resolve, reject) => {
            if (!this.mercado || !this.mercado.status_mercado) {
                this.getMercadoInfo().then(() => {
                    resolve(this.mercado.status_mercado);
                });
            } else {
                resolve(this.mercado.status_mercado);
            }
        });
    }

    updateMercadoInfo() { };
}

@Injectable()
@Component({
    providers: [Api]
})
export class MercadoControllFake implements IMercadoControll {
    private mercado: Mercado;

    constructor(private api: Api, @Inject('IUserDataControll') public userDataControll: IUserDataControll) {
        this.getMercadoInfo();
    };

    getMercadoInfo() {
        this.mercado = JSON.parse('{"rodada_atual":6,"status_mercado":2,"esquema_default_id":4,"cartoleta_inicial":100,"max_ligas_free":1,"max_ligas_pro":6,"max_ligas_matamata_free":5,"max_ligas_matamata_pro":5,"max_ligas_patrocinadas_free":2,"max_ligas_patrocinadas_pro_num":2,"game_over":false,"temporada":2018,"reativar":true,"exibe_sorteio_pro":false,"times_escalados":4961421,"fechamento":{"dia":19,"mes":5,"ano":2018,"hora":14,"minuto":0,"timestamp":1526749200},"mercado_pos_rodada":false,"aviso":"","aviso_url":""}');
        console.log("mercado: ", this.mercado);
    }

    getMercadoStatus() {
        return this.mercado.status_mercado;
    }

    updateMercadoInfo() { };
}