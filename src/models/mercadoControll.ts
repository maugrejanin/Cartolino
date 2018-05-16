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
        this.api.getWithAuth(get_mercado_info_api, { GLBID: this.userDataControll.getGLBID() })
            .toPromise()
            .then(
                res => {
                    console.log("mercado ok", res.json());
                    this.mercado = res.json();
                }
            ).catch(err => {
                console.log("Erro ao carregar status do mercado");                
            });
    }

    getMercadoStatus(){
        return this.mercado.status_mercado;
    }

    updateMercadoInfo() { };
}