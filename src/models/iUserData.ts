import { Injectable, Component } from "@angular/core";
import { Api } from "../providers";
import { get_team_info_api } from "../pages";

export interface UserData {
    GLBID: string;
    teamInfo: {};
}

export interface IUserDataControll {
    loadUserData();
    getUserData();
    setGLBID(GLBID: string);
    getGLBID():string;
    setTeamInfo(teamInfo: {});
    getTeamInfo(): {};
}

@Injectable()
@Component({
    providers: [Api]
})
export class UserDataControll implements IUserDataControll {
    private userData: UserData = {
        GLBID: '',
        teamInfo: {}
    };

    constructor(public api: Api) { };

    setGLBID(GLBID: string) {
        this.userData.GLBID = GLBID;
    };

    getGLBID() {
        return this.userData.GLBID;
    }

    setTeamInfo(teamInfo: {}) {
        this.userData.teamInfo = teamInfo;
    }

    getTeamInfo() {
        return this.userData.teamInfo;
    };

    loadUserData() {
        if (Object.keys(this.userData.teamInfo).length === 0 && this.userData.teamInfo.constructor === Object) {            
            return new Promise((resolve, reject) => {
                this.api.getWithAuth(get_team_info_api, { GLBID: this.userData.GLBID })
                    .toPromise()
                    .then(
                        res => {
                            this.setTeamInfo(res.json().time);
                            resolve(true);
                        }
                    );
            });
        }
    }

    getUserData(): UserData {
        return this.userData;
    }

}

@Injectable()
@Component({
    providers: [Api]
})
export class UserDataControllFake implements IUserDataControll {
    private userData: UserData = {
        GLBID: '',
        teamInfo: {}
    };

    constructor(public api: Api) {
        this.userData.GLBID = '1021a3e0d4ecd085008493615c9b2872b7a664e655f4f56617351794f6b4239574e3357585878382d524e4f6c51795479624e7662576a756950586e616d31385545737270497256454738335476794b415a647a4579703566494162435238477a702d663150773d3d3a303a6d6175726963696f5f6a756e696f725f323031355f32';
        this.setTeamInfo(JSON.parse('{"time_id":7033528,"clube_id":264,"esquema_id":3,"globo_id":"530d15c6-1a3e-457c-bad1-bacc0855f233","facebook_id":717449224963234,"foto_perfil":"https://graph.facebook.com/v2.9/717449224963234/picture?width=100&height=100","nome":"SuperGemeos F.C","nome_cartola":"Mauricio Junior","slug":"supergemeos-f-c","tipo_escudo":1,"cor_fundo_escudo":"063780","cor_borda_escudo":"000000","cor_primaria_estampa_escudo":"ffffff","cor_secundaria_estampa_escudo":"bf1d17","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","url_escudo_png":"https://s2.glbimg.com/AiUtaBuJtJMHa3z73UNHE7MNo7s=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","url_camisa_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/camisa/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","url_camisa_png":"https://s2.glbimg.com/m49X5VtSnwYa-8-UTj7YpMZHlGU=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/camisa/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","tipo_estampa_escudo":2,"tipo_adorno":4,"tipo_camisa":2,"tipo_estampa_camisa":5,"cor_camisa":"063780","cor_primaria_estampa_camisa":"ffffff","cor_secundaria_estampa_camisa":"bf1d17","rodada_time_id":4,"assinante":false,"cadastro_completo":true,"patrocinador1_id":64,"patrocinador2_id":62,"temporada_inicial":2016,"simplificado":false,"sorteio_pro_num":null}'));
    };

    setGLBID(GLBID: string) {
        this.userData.GLBID = GLBID;
    };

    getGLBID() {
        return this.userData.GLBID;
    }

    setTeamInfo(teamInfo: {}) {
        this.userData.teamInfo = teamInfo;
    }

    getTeamInfo() {
        return this.userData.teamInfo;
    };

    loadUserData() {
        return true;
    }

    getUserData(): UserData {
        return this.userData;
    }

}