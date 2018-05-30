import { Injectable, Component } from "@angular/core";
import { Api } from "../providers";
import { get_promixas_partidas_api } from "../pages";

export interface IPartidasControll {
    getPartidas();
}

@Injectable()
@Component({
    providers: [Api]
})
export class PartidasControll implements IPartidasControll {
    constructor(public api: Api) { }

    getPartidas() {
        return new Promise((resolve, reject) => {
            this.api.get(get_promixas_partidas_api)
            .toPromise()
            .then(res => {
                resolve(res.json());
            })
        });
    }
}