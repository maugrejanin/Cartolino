import { Component, Inject } from "@angular/core";
import { Api } from "../providers";
import { get_team_info_api, get_ligas_info_api, get_liga_info_api } from "../pages";
import { UserDataControllFake, IUserDataControll } from "./iUserData";

export interface Ligas {
    ligas: any;
}

export interface ILigasControll {
    loadLigas();
    loadLiga(ligaSlug: string);
    getLigas(): Ligas;
    setLigas(ligas: any);
    getPontuados();
    loadClube(idTime: string);
}

@Component({
    providers: [Api]
})
export class LigaControll implements ILigasControll {
    private ligas: Ligas;

    constructor(public api: Api, @Inject('IUserDataControll') public userDataControll: IUserDataControll) { };

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

    loadLiga(ligaSlug: string) {
        return new Promise((resolve, reject) => {
            this.api.getWithAuth(get_liga_info_api + ligaSlug, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        resolve(res.json());
                    }
                );
        });
    }

    loadClube(idTime:string){
        return new Promise((resolve, reject) => {
            this.api.getWithAuth("https:////api.cartolafc.globo.com/time/id/" + idTime, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        resolve(res.json());

                        // this.setLigas(res.json());
                        // resolve(true);
                    }
                );
        });
    }

    getPontuados(){
        
        return new Promise((resolve, reject) => {
            this.api.getWithAuth("https://api.cartolafc.globo.com/atletas/pontuados", { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        console.log(res.json());
                        // resolve(true);
                    }
                );
        });
    }

    getLigas() { return this.ligas };

    setLigas(ligas: any) {
        this.ligas = ligas;
    };
}

@Component({
    providers: [Api]
})
export class LigaControllFake implements ILigasControll {
    private ligas: Ligas;

    constructor(public api: Api, @Inject('IUserDataControll') public userDataControll: IUserDataControll) {
        this.setLigas(JSON.parse('[{"liga_id":75,"time_dono_id":null,"clube_id":264,"nome":"Corinthians","descricao":"A Liga do time campeão!","slug":"corinthians","tipo":"F","mata_mata":false,"editorial":false,"patrocinador":false,"criacao":"2010-04-29 09:00:00","tipo_flamula":0,"tipo_estampa_flamula":1,"tipo_adorno_flamula":1,"cor_primaria_estampa_flamula":"a64b00","cor_secundaria_estampa_flamula":"997a00","cor_borda_flamula":"bf1d17","cor_fundo_flamula":"000000","url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_time.svg","url_flamula_png":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_time.png","tipo_trofeu":1,"cor_trofeu":1,"url_trofeu_svg":"http://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/trofeu.svg","url_trofeu_png":"http://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/trofeu.png","inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/flamula.png","mes_ranking_num":482363,"mes_variacao_num":-460202,"camp_ranking_num":47294,"camp_variacao_num":-25133,"total_times_liga":1256282,"vagas_restantes":null,"total_amigos_na_liga":0},{"liga_id":62,"time_dono_id":null,"clube_id":null,"nome":"Clear #FutebolNaCabeça","descricao":"Prove que você não tem nada a esconder na liga mais disputada do Cartola FC. Quem vai mostrar mais #FutebolNaCabeça e vencer esta parada?","slug":"clear-futebolnacabeca","tipo":"F","mata_mata":false,"editorial":true,"patrocinador":true,"criacao":"2017-04-24 09:00:00","tipo_flamula":1,"tipo_estampa_flamula":null,"tipo_adorno_flamula":null,"cor_primaria_estampa_flamula":"FFFFFF","cor_secundaria_estampa_flamula":"FFFFFF","cor_borda_flamula":null,"cor_fundo_flamula":null,"url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula-clear.svg","url_flamula_png":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula-clear.png","tipo_trofeu":null,"cor_trofeu":null,"url_trofeu_svg":null,"url_trofeu_png":null,"inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/flamula.png","mes_ranking_num":808222,"mes_variacao_num":-774242,"camp_ranking_num":88714,"camp_variacao_num":-54734,"total_times_liga":1636169,"vagas_restantes":null,"total_amigos_na_liga":0},{"liga_id":64,"time_dono_id":null,"clube_id":null,"nome":"SporTV","descricao":"Participe dessa disputa com nossos apresentadores e comentaristas. Somos Todos Campeões!","slug":"liga-do-sportv","tipo":"F","mata_mata":false,"editorial":true,"patrocinador":true,"criacao":"2017-04-24 09:00:00","tipo_flamula":1,"tipo_estampa_flamula":null,"tipo_adorno_flamula":null,"cor_primaria_estampa_flamula":"FFFFFF","cor_secundaria_estampa_flamula":"FFFFFF","cor_borda_flamula":null,"cor_fundo_flamula":null,"url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula-sportv.svg","url_flamula_png":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula-sportv.png","tipo_trofeu":null,"cor_trofeu":null,"url_trofeu_svg":null,"url_trofeu_png":null,"inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/flamula.png","mes_ranking_num":1973359,"mes_variacao_num":-1899196,"camp_ranking_num":189280,"camp_variacao_num":-115117,"total_times_liga":4121589,"vagas_restantes":null,"total_amigos_na_liga":0},{"liga_id":60,"time_dono_id":null,"clube_id":null,"nome":"Nacional","descricao":"A Liga do time campeão!","slug":"nacional","tipo":"F","mata_mata":false,"editorial":false,"patrocinador":false,"criacao":"2010-04-29 09:00:00","tipo_flamula":0,"tipo_estampa_flamula":null,"tipo_adorno_flamula":null,"cor_primaria_estampa_flamula":"888888","cor_secundaria_estampa_flamula":"CCCCCC","cor_borda_flamula":null,"cor_fundo_flamula":null,"url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_nacional.svg","url_flamula_png":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_nacional.png","tipo_trofeu":null,"cor_trofeu":null,"url_trofeu_svg":null,"url_trofeu_png":null,"inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/flamula.png","mes_ranking_num":3311777,"mes_variacao_num":-3181099,"camp_ranking_num":336433,"camp_variacao_num":-205755,"total_times_liga":6798389,"vagas_restantes":null,"total_amigos_na_liga":0},{"liga_id":61,"time_dono_id":null,"clube_id":null,"nome":"Patrimônio","descricao":"A Liga do time campeão!","slug":"patrimonio","tipo":"F","mata_mata":false,"editorial":false,"patrocinador":false,"criacao":"2012-01-01 00:00:00","tipo_flamula":0,"tipo_estampa_flamula":null,"tipo_adorno_flamula":null,"cor_primaria_estampa_flamula":"888888","cor_secundaria_estampa_flamula":"CCCCCC","cor_borda_flamula":null,"cor_fundo_flamula":null,"url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_patrimonio.svg","url_flamula_png":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_patrimonio.png","tipo_trofeu":null,"cor_trofeu":null,"url_trofeu_svg":null,"url_trofeu_png":null,"inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/flamula.png","mes_ranking_num":3311777,"mes_variacao_num":-3181099,"camp_ranking_num":336433,"camp_variacao_num":-205755,"total_times_liga":6798389,"vagas_restantes":null,"total_amigos_na_liga":0},{"liga_id":613435,"time_dono_id":1541658,"clube_id":null,"nome":"Liga Correria","descricao":"Liga Correria 2017 Prêmio uma camisa para o campeão no final do campeonato.","slug":"liga-correria","tipo":"F","mata_mata":false,"editorial":false,"patrocinador":false,"criacao":"2016-05-07 13:18:40","tipo_flamula":2,"tipo_estampa_flamula":2,"tipo_adorno_flamula":4,"cor_primaria_estampa_flamula":"000000","cor_secundaria_estampa_flamula":"000000","cor_borda_flamula":"ff7400","cor_fundo_flamula":"ff7400","url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_50/flamula/26/06/59/0037002620170508160659","url_flamula_png":"https://s2.glbimg.com/fnyh1-72HPRW9Bvq0xv_YBzt8Do=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_50/flamula/26/06/59/0037002620170508160659","tipo_trofeu":null,"cor_trofeu":null,"url_trofeu_svg":null,"url_trofeu_png":null,"inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/flamula.png","mes_ranking_num":5,"mes_variacao_num":-4,"camp_ranking_num":1,"camp_variacao_num":0,"total_times_liga":9,"vagas_restantes":null,"total_amigos_na_liga":0}]'));
    };

    loadLigas() {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    };

    loadClube(idTime: string) {
        return new Promise((resolve, reject) => {
            this.api.getWithAuth("https:////api.cartolafc.globo.com/time/id/" + idTime, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        console.log(res.json());

                        // this.setLigas(res.json());
                        // resolve(true);
                    }
                );
        });
    }

    getPontuados() {

        return new Promise((resolve, reject) => {
            this.api.get("https://api.cartolafc.globo.com/atletas/pontuados", { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        console.log(res.json());
                        // resolve(true);
                    }
                );
        });
    }

    loadLiga(ligaSlug: string) {
        return new Promise((resolve, reject) => {
            this.api.getWithAuth(get_liga_info_api + ligaSlug, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        console.log(res.json);

                        // this.setLigas(res.json().ligas);
                        // resolve(true);
                    }
                );
        });
    }

    getLigas() { return this.ligas };

    setLigas(ligas: any) {
        this.ligas = ligas;
    };
}