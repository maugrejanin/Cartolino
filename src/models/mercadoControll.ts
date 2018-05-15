import { Injectable, Component } from "@angular/core";
import { Api } from "../providers";

export interface Mercado{
    "rodada_atual",
    "status_mercado",
    "fechamento"
}

export interface IMercadoControll{
    getMercadoInfo();
    updateMercadoInfo();
}

@Injectable()
@Component({
 providers: [Api]   
})
export class MercadoControll implements IMercadoControll{
    mercado:Mercado;

    constructor(){

    };

    getMercadoInfo(){
        
    }

    updateMercadoInfo(){};
}