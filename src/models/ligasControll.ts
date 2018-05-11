import { Injectable, Component } from "@angular/core";
import { Api } from "../providers";
import { get_team_info_api, get_ligas_info_api } from "../pages";
import { UserDataControllFake } from "./iUserData";

export interface Ligas {
    ligas: [];
}

export interface ILigasControll {
    loadLigas();
    getLigas(): Ligas;
    setLigas(ligas: any);
}

@Injectable()
@Component({
    providers: [Api]
})
export class LigaControll implements ILigasControll {
    private ligas: Ligas;

    constructor(public api: Api, public userDataControll: UserDataControllFake) { };

    loadLigas() {
        return new Promise((resolve, reject) => {
            this.api.getWithAuth(get_ligas_info_api, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        this.setLigas(res.json().ligas);
                        resolve(true);
                    }
                );
        });
        
    };
    getLigas() { return this.ligas };
    setLigas(ligas: any) { };


}