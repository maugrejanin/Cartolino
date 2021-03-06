import { Component, Inject } from "@angular/core";
import { Api } from "../providers";
import { get_ligas_info_api, get_liga_info_api, status_mercado_fechado } from "../pages";
import { IUserDataControll } from "./userDataControll";
import { ITimeControll, Time } from "./timeControll";
import * as _ from 'lodash';
import { IMercadoControll } from "./mercadoControll";

export interface Liga {
    times: [Time]
}

export interface ILigasControll {
    loadLigas();
    loadLiga(ligaSlug: string);
    loadTimesDaLiga();
    getLigas();
    setLigas(ligas: any);
    setLiga(liga: any);
    getLiga(): any;
}

@Component({
    providers: [Api]
})
export class LigaControll implements ILigasControll {
    private ligas: [Liga];
    private liga: Liga;

    constructor(
        public api: Api,
        @Inject('IUserDataControll') public userDataControll: IUserDataControll,
        @Inject('ITimeControll') private timeControll: ITimeControll,
        @Inject('IMercadoControll') public mercadoControll: IMercadoControll) { };

    loadLigas() {
        return new Promise((resolve, reject) => {
            if (this.userDataControll.isUserLogged) {
                this.api.getWithAuth(get_ligas_info_api, { GLBID: this.userDataControll.getGLBID() })
                    .toPromise()
                    .then(
                        res => {
                            this.setLigas(res.json());
                            resolve(true);
                        }
                    );
            }
        });
    };

    loadLiga(ligaSlug: string) {
        return new Promise((resolve, reject) => {
            this.api.getWithAuth(get_liga_info_api + ligaSlug, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        let liga = res.json();
                        this.setLiga(liga);
                        resolve(true);
                    }
                );
        });
    }

    loadTimesDaLiga() {
        return new Promise((resolve, reject) => {
            this.timeControll.loadTimesDaLiga(this.getLiga()).then(liga => {
                resolve(liga);
            });
        })
    }

    setLiga(liga: any) {
        this.liga = liga;
    }

    getLiga() {
        return this.liga;
    }

    getLigas() {
        return new Promise((resolve, reject) => {
            if (this.ligas) {
                resolve(this.ligas);
            } else {
                this.loadLigas().then(res => {
                    if (res) {
                        resolve(this.ligas);
                    }
                })
            }
        });
    };

    setLigas(ligas: any) {
        this.ligas = _.orderBy(ligas, 'nome', 'asc')[0];
    };
}

@Component({
    providers: [Api]
})
export class LigaControllFake implements ILigasControll {
    private ligas: Liga;
    private liga: any;

    constructor(public api: Api, @Inject('IUserDataControll') public userDataControll: IUserDataControll, @Inject('ITimeControll') private timeControll: ITimeControll) {
        this.setLigas(JSON.parse('[{"liga_id":75,"time_dono_id":null,"clube_id":264,"nome":"Corinthians","descricao":"A Liga do time campeão!","slug":"corinthians","tipo":"F","mata_mata":false,"editorial":false,"patrocinador":false,"criacao":"2010-04-29 09:00:00","tipo_flamula":0,"tipo_estampa_flamula":1,"tipo_adorno_flamula":1,"cor_primaria_estampa_flamula":"a64b00","cor_secundaria_estampa_flamula":"997a00","cor_borda_flamula":"bf1d17","cor_fundo_flamula":"000000","url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_time.svg","url_flamula_png":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_time.png","tipo_trofeu":1,"cor_trofeu":1,"url_trofeu_svg":"http://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/trofeu.svg","url_trofeu_png":"http://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/trofeu.png","inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/flamula.png","mes_ranking_num":482363,"mes_variacao_num":-460202,"camp_ranking_num":47294,"camp_variacao_num":-25133,"total_times_liga":1256282,"vagas_restantes":null,"total_amigos_na_liga":0},{"liga_id":62,"time_dono_id":null,"clube_id":null,"nome":"Clear #FutebolNaCabeça","descricao":"Prove que você não tem nada a esconder na liga mais disputada do Cartola FC. Quem vai mostrar mais #FutebolNaCabeça e vencer esta parada?","slug":"clear-futebolnacabeca","tipo":"F","mata_mata":false,"editorial":true,"patrocinador":true,"criacao":"2017-04-24 09:00:00","tipo_flamula":1,"tipo_estampa_flamula":null,"tipo_adorno_flamula":null,"cor_primaria_estampa_flamula":"FFFFFF","cor_secundaria_estampa_flamula":"FFFFFF","cor_borda_flamula":null,"cor_fundo_flamula":null,"url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula-clear.svg","url_flamula_png":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula-clear.png","tipo_trofeu":null,"cor_trofeu":null,"url_trofeu_svg":null,"url_trofeu_png":null,"inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/flamula.png","mes_ranking_num":808222,"mes_variacao_num":-774242,"camp_ranking_num":88714,"camp_variacao_num":-54734,"total_times_liga":1636169,"vagas_restantes":null,"total_amigos_na_liga":0},{"liga_id":64,"time_dono_id":null,"clube_id":null,"nome":"SporTV","descricao":"Participe dessa disputa com nossos apresentadores e comentaristas. Somos Todos Campeões!","slug":"liga-do-sportv","tipo":"F","mata_mata":false,"editorial":true,"patrocinador":true,"criacao":"2017-04-24 09:00:00","tipo_flamula":1,"tipo_estampa_flamula":null,"tipo_adorno_flamula":null,"cor_primaria_estampa_flamula":"FFFFFF","cor_secundaria_estampa_flamula":"FFFFFF","cor_borda_flamula":null,"cor_fundo_flamula":null,"url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula-sportv.svg","url_flamula_png":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula-sportv.png","tipo_trofeu":null,"cor_trofeu":null,"url_trofeu_svg":null,"url_trofeu_png":null,"inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/flamula.png","mes_ranking_num":1973359,"mes_variacao_num":-1899196,"camp_ranking_num":189280,"camp_variacao_num":-115117,"total_times_liga":4121589,"vagas_restantes":null,"total_amigos_na_liga":0},{"liga_id":60,"time_dono_id":null,"clube_id":null,"nome":"Nacional","descricao":"A Liga do time campeão!","slug":"nacional","tipo":"F","mata_mata":false,"editorial":false,"patrocinador":false,"criacao":"2010-04-29 09:00:00","tipo_flamula":0,"tipo_estampa_flamula":null,"tipo_adorno_flamula":null,"cor_primaria_estampa_flamula":"888888","cor_secundaria_estampa_flamula":"CCCCCC","cor_borda_flamula":null,"cor_fundo_flamula":null,"url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_nacional.svg","url_flamula_png":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_nacional.png","tipo_trofeu":null,"cor_trofeu":null,"url_trofeu_svg":null,"url_trofeu_png":null,"inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/flamula.png","mes_ranking_num":3311777,"mes_variacao_num":-3181099,"camp_ranking_num":336433,"camp_variacao_num":-205755,"total_times_liga":6798389,"vagas_restantes":null,"total_amigos_na_liga":0},{"liga_id":61,"time_dono_id":null,"clube_id":null,"nome":"Patrimônio","descricao":"A Liga do time campeão!","slug":"patrimonio","tipo":"F","mata_mata":false,"editorial":false,"patrocinador":false,"criacao":"2012-01-01 00:00:00","tipo_flamula":0,"tipo_estampa_flamula":null,"tipo_adorno_flamula":null,"cor_primaria_estampa_flamula":"888888","cor_secundaria_estampa_flamula":"CCCCCC","cor_borda_flamula":null,"cor_fundo_flamula":null,"url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_patrimonio.svg","url_flamula_png":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/default/flamula/flamula_patrimonio.png","tipo_trofeu":null,"cor_trofeu":null,"url_trofeu_svg":null,"url_trofeu_png":null,"inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/flamula.png","mes_ranking_num":3311777,"mes_variacao_num":-3181099,"camp_ranking_num":336433,"camp_variacao_num":-205755,"total_times_liga":6798389,"vagas_restantes":null,"total_amigos_na_liga":0},{"liga_id":613435,"time_dono_id":1541658,"clube_id":null,"nome":"Liga Correria","descricao":"Liga Correria 2017 Prêmio uma camisa para o campeão no final do campeonato.","slug":"liga-correria","tipo":"F","mata_mata":false,"editorial":false,"patrocinador":false,"criacao":"2016-05-07 13:18:40","tipo_flamula":2,"tipo_estampa_flamula":2,"tipo_adorno_flamula":4,"cor_primaria_estampa_flamula":"000000","cor_secundaria_estampa_flamula":"000000","cor_borda_flamula":"ff7400","cor_fundo_flamula":"ff7400","url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_50/flamula/26/06/59/0037002620170508160659","url_flamula_png":"https://s2.glbimg.com/fnyh1-72HPRW9Bvq0xv_YBzt8Do=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_50/flamula/26/06/59/0037002620170508160659","tipo_trofeu":null,"cor_trofeu":null,"url_trofeu_svg":null,"url_trofeu_png":null,"inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/flamula.png","mes_ranking_num":5,"mes_variacao_num":-4,"camp_ranking_num":1,"camp_variacao_num":0,"total_times_liga":9,"vagas_restantes":null,"total_amigos_na_liga":0}]'));
    };

    loadLigas() {
        return new Promise((resolve, reject) => {
            resolve(_.orderBy(this.getLigas(), 'nome', 'asc'));
        });
    };

    loadTimesDaLiga() { };

    loadLiga(ligaSlug: string) {
        return new Promise((resolve, reject) => {
            let liga = JSON.parse('{"amigos":[{"time_id":1198868,"nome":"ROCKETS CLUB","nome_cartola":"Henry Franco","slug":"rockets-club","facebook_id":100003308573695,"url_escudo_png":"https://s2.glbimg.com/NbIlmiTGKmYpTgfWXiAxfCSO-6M=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_117/escudo/ce/09/40/00422ede9c-3514-4b17-84a3-28bfa4a5dfce20180507170940","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_117/escudo/ce/09/40/00422ede9c-3514-4b17-84a3-28bfa4a5dfce20180507170940","foto_perfil":"https://graph.facebook.com/v2.9/100003308573695/picture?width=100&height=100","assinante":false},{"time_id":1541118,"nome":"La VecchiaFC","nome_cartola":"Felipe","slug":"la-vecchiafc","facebook_id":542473805893882,"url_escudo_png":"https://s2.glbimg.com/qzK9b38P6OrFqfkYscIx8b3p7B4=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_109/escudo/0e/28/24/00f74d5dbc-e743-4284-80ab-a6cc9738b90e20180412192824","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_109/escudo/0e/28/24/00f74d5dbc-e743-4284-80ab-a6cc9738b90e20180412192824","foto_perfil":"https://graph.facebook.com/v2.9/542473805893882/picture?width=100&height=100","assinante":false},{"time_id":1541621,"nome":"Casquinha da Fiel Fc","nome_cartola":"Casca Fina","slug":"casquinha-da-fiel-fc","facebook_id":592245060878989,"url_escudo_png":"https://s2.glbimg.com/adrpg7u8NE5lO2UFEe0vk5hGIMg=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/62/11/27/00a68e9e83-19ce-4dcd-ab63-0b71d4b4016220180414101127","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/62/11/27/00a68e9e83-19ce-4dcd-ab63-0b71d4b4016220180414101127","foto_perfil":"https://graph.facebook.com/v2.9/592245060878989/picture?width=100&height=100","assinante":false}],"destaques":{"lanterninha":{"time_id":14970804,"clube_id":264,"esquema_id":3,"globo_id":"b35c12fa-1947-4529-839d-49b6e411794a","facebook_id":null,"foto_perfil":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/perfil.png","nome":"Tanus lascado","nome_cartola":"Dércio pinto","slug":"tanus-lascado","tipo_escudo":4,"cor_fundo_escudo":"ff241d","cor_borda_escudo":"000000","cor_primaria_estampa_escudo":"19ff81","cor_secundaria_estampa_escudo":"000000","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/4a/57/57/00b35c12fa-1947-4529-839d-49b6e411794a20180414125757","url_escudo_png":"https://s2.glbimg.com/PbMRG9sj-ki6k-65ipISyy23_-s=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/4a/57/57/00b35c12fa-1947-4529-839d-49b6e411794a20180414125757","url_camisa_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/camisa/4a/57/57/00b35c12fa-1947-4529-839d-49b6e411794a20180414125757","url_camisa_png":"https://s2.glbimg.com/kU0Ytla3E8ju5xl4zCKGiGlWq-Q=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/camisa/4a/57/57/00b35c12fa-1947-4529-839d-49b6e411794a20180414125757","tipo_estampa_escudo":6,"tipo_adorno":8,"tipo_camisa":1,"tipo_estampa_camisa":8,"cor_camisa":"ff241d","cor_primaria_estampa_camisa":"19ff81","cor_secundaria_estampa_camisa":"000000","rodada_time_id":6,"assinante":true,"cadastro_completo":true,"patrocinador1_id":63,"patrocinador2_id":64,"temporada_inicial":2018,"simplificado":false,"sorteio_pro_num":null},"patrimonio":{"time_id":7033528,"clube_id":264,"esquema_id":3,"globo_id":"530d15c6-1a3e-457c-bad1-bacc0855f233","facebook_id":717449224963234,"foto_perfil":"https://graph.facebook.com/v2.9/717449224963234/picture?width=100&height=100","nome":"SuperGemeos F.C","nome_cartola":"Mauricio Junior","slug":"supergemeos-f-c","tipo_escudo":1,"cor_fundo_escudo":"063780","cor_borda_escudo":"000000","cor_primaria_estampa_escudo":"ffffff","cor_secundaria_estampa_escudo":"bf1d17","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","url_escudo_png":"https://s2.glbimg.com/AiUtaBuJtJMHa3z73UNHE7MNo7s=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","url_camisa_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/camisa/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","url_camisa_png":"https://s2.glbimg.com/m49X5VtSnwYa-8-UTj7YpMZHlGU=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/camisa/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","tipo_estampa_escudo":2,"tipo_adorno":4,"tipo_camisa":2,"tipo_estampa_camisa":5,"cor_camisa":"063780","cor_primaria_estampa_camisa":"ffffff","cor_secundaria_estampa_camisa":"bf1d17","rodada_time_id":6,"assinante":false,"cadastro_completo":true,"patrocinador1_id":64,"patrocinador2_id":62,"temporada_inicial":2016,"simplificado":false,"sorteio_pro_num":null},"rodada":{"time_id":1198868,"clube_id":277,"esquema_id":3,"globo_id":"422ede9c-3514-4b17-84a3-28bfa4a5dfce","facebook_id":100003308573695,"foto_perfil":"https://graph.facebook.com/v2.9/100003308573695/picture?width=100&height=100","nome":"ROCKETS CLUB","nome_cartola":"Henry Franco","slug":"rockets-club","tipo_escudo":3,"cor_fundo_escudo":"bf1d17","cor_borda_escudo":"808080","cor_primaria_estampa_escudo":"bf1d17","cor_secundaria_estampa_escudo":"bf1d17","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_117/escudo/ce/09/40/00422ede9c-3514-4b17-84a3-28bfa4a5dfce20180507170940","url_escudo_png":"https://s2.glbimg.com/NbIlmiTGKmYpTgfWXiAxfCSO-6M=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_117/escudo/ce/09/40/00422ede9c-3514-4b17-84a3-28bfa4a5dfce20180507170940","url_camisa_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_117/camisa/ce/09/40/00422ede9c-3514-4b17-84a3-28bfa4a5dfce20180507170940","url_camisa_png":"https://s2.glbimg.com/r43gu5LZRcenTcFgLh6NUJHczuQ=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_117/camisa/ce/09/40/00422ede9c-3514-4b17-84a3-28bfa4a5dfce20180507170940","tipo_estampa_escudo":2,"tipo_adorno":4,"tipo_camisa":2,"tipo_estampa_camisa":2,"cor_camisa":"bf1d17","cor_primaria_estampa_camisa":"ffffff","cor_secundaria_estampa_camisa":"808080","rodada_time_id":6,"assinante":false,"cadastro_completo":true,"patrocinador1_id":63,"patrocinador2_id":67,"temporada_inicial":2015,"simplificado":false,"sorteio_pro_num":null}},"liga":{"liga_id":613435,"time_dono_id":1541658,"clube_id":null,"nome":"Liga Correria","descricao":"Liga Correria 2017 Prêmio uma camisa para o campeão no final do campeonato.","slug":"liga-correria","tipo":"F","mata_mata":false,"editorial":false,"patrocinador":false,"criacao":"2016-05-07 13:18:40","tipo_flamula":2,"tipo_estampa_flamula":2,"tipo_adorno_flamula":4,"cor_primaria_estampa_flamula":"000000","cor_secundaria_estampa_flamula":"000000","cor_borda_flamula":"ff7400","cor_fundo_flamula":"ff7400","url_flamula_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_50/flamula/26/06/59/0037002620170508160659","url_flamula_png":"https://s2.glbimg.com/fnyh1-72HPRW9Bvq0xv_YBzt8Do=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_50/flamula/26/06/59/0037002620170508160659","tipo_trofeu":null,"cor_trofeu":null,"url_trofeu_svg":null,"url_trofeu_png":null,"inicio_rodada":1,"fim_rodada":null,"quantidade_times":null,"sorteada":false,"imagem":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/flamula.png","mes_ranking_num":null,"mes_variacao_num":null,"camp_ranking_num":null,"camp_variacao_num":null,"total_times_liga":9,"vagas_restantes":null,"total_amigos_na_liga":3},"membro":true,"pagina":1,"time_dono":{"time_id":1541658,"nome":"Team Doctor","nome_cartola":"Doctor","slug":"team-doctor","facebook_id":null,"url_escudo_png":"https://s2.glbimg.com/72sxa6CgyMVRAsZieOlAsiIrsFk=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_109/escudo/e6/19/25/0087253d0a-2efb-44ba-82c1-b16d9ecb7fe620180413131925","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_109/escudo/e6/19/25/0087253d0a-2efb-44ba-82c1-b16d9ecb7fe620180413131925","foto_perfil":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/perfil.png","assinante":false},"time_usuario":{"url_escudo_png":"https://s2.glbimg.com/AiUtaBuJtJMHa3z73UNHE7MNo7s=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","time_id":7033528,"nome":"SuperGemeos F.C","nome_cartola":"Mauricio Junior","slug":"supergemeos-f-c","facebook_id":717449224963234,"foto_perfil":"https://graph.facebook.com/v2.9/717449224963234/picture?width=100&height=100","assinante":false,"patrimonio":159.8,"ranking":{"rodada":2,"mes":2,"turno":1,"campeonato":1,"patrimonio":1},"pontos":{"rodada":116.259765625,"mes":169.38999938964844,"turno":455.32000732421875,"campeonato":455.32000732421875},"variacao":{"mes":3,"turno":0,"campeonato":0,"patrimonio":0}},"times":[{"url_escudo_png":"https://s2.glbimg.com/AiUtaBuJtJMHa3z73UNHE7MNo7s=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/33/52/43/00530d15c6-1a3e-457c-bad1-bacc0855f23320180414095243","time_id":7033528,"nome":"SuperGemeos F.C","nome_cartola":"Mauricio Junior","slug":"supergemeos-f-c","facebook_id":717449224963234,"foto_perfil":"https://graph.facebook.com/v2.9/717449224963234/picture?width=100&height=100","assinante":false,"patrimonio":159.8,"ranking":{"rodada":2,"mes":2,"turno":1,"campeonato":1,"patrimonio":1},"pontos":{"rodada":116.259765625,"mes":169.38999938964844,"turno":455.32000732421875,"campeonato":455.32000732421875},"variacao":{"mes":3,"turno":0,"campeonato":0,"patrimonio":0}},{"url_escudo_png":"https://s2.glbimg.com/NbIlmiTGKmYpTgfWXiAxfCSO-6M=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_117/escudo/ce/09/40/00422ede9c-3514-4b17-84a3-28bfa4a5dfce20180507170940","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_117/escudo/ce/09/40/00422ede9c-3514-4b17-84a3-28bfa4a5dfce20180507170940","time_id":1198868,"nome":"ROCKETS CLUB","nome_cartola":"Henry Franco","slug":"rockets-club","facebook_id":100003308573695,"foto_perfil":"https://graph.facebook.com/v2.9/100003308573695/picture?width=100&height=100","assinante":false,"patrimonio":151.93,"ranking":{"rodada":1,"mes":1,"turno":2,"campeonato":2,"patrimonio":2},"pontos":{"rodada":119.06005859375,"mes":209.8800048828125,"turno":449.1199951171875,"campeonato":449.1199951171875},"variacao":{"mes":0,"turno":0,"campeonato":0,"patrimonio":0}},{"url_escudo_png":"https://s2.glbimg.com/72sxa6CgyMVRAsZieOlAsiIrsFk=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_109/escudo/e6/19/25/0087253d0a-2efb-44ba-82c1-b16d9ecb7fe620180413131925","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_109/escudo/e6/19/25/0087253d0a-2efb-44ba-82c1-b16d9ecb7fe620180413131925","time_id":1541658,"nome":"Team Doctor","nome_cartola":"Doctor","slug":"team-doctor","facebook_id":null,"foto_perfil":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/perfil.png","assinante":false,"patrimonio":149.61,"ranking":{"rodada":3,"mes":3,"turno":3,"campeonato":3,"patrimonio":3},"pontos":{"rodada":109.22021484375,"mes":166.2899932861328,"turno":407.7200012207031,"campeonato":407.7200012207031},"variacao":{"mes":0,"turno":2,"campeonato":2,"patrimonio":1}},{"url_escudo_png":"https://s2.glbimg.com/adrpg7u8NE5lO2UFEe0vk5hGIMg=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/62/11/27/00a68e9e83-19ce-4dcd-ab63-0b71d4b4016220180414101127","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/62/11/27/00a68e9e83-19ce-4dcd-ab63-0b71d4b4016220180414101127","time_id":1541621,"nome":"Casquinha da Fiel Fc","nome_cartola":"Casca Fina","slug":"casquinha-da-fiel-fc","facebook_id":592245060878989,"foto_perfil":"https://graph.facebook.com/v2.9/592245060878989/picture?width=100&height=100","assinante":false,"patrimonio":142.14,"ranking":{"rodada":4,"mes":5,"turno":4,"campeonato":4,"patrimonio":6},"pontos":{"rodada":83.259765625,"mes":139.6199951171875,"turno":383.0400085449219,"campeonato":383.0400085449219},"variacao":{"mes":-1,"turno":-1,"campeonato":-1,"patrimonio":0}},{"url_escudo_png":"https://s2.glbimg.com/qzK9b38P6OrFqfkYscIx8b3p7B4=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_109/escudo/0e/28/24/00f74d5dbc-e743-4284-80ab-a6cc9738b90e20180412192824","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_109/escudo/0e/28/24/00f74d5dbc-e743-4284-80ab-a6cc9738b90e20180412192824","time_id":1541118,"nome":"La VecchiaFC","nome_cartola":"Felipe","slug":"la-vecchiafc","facebook_id":542473805893882,"foto_perfil":"https://graph.facebook.com/v2.9/542473805893882/picture?width=100&height=100","assinante":false,"patrimonio":146.25,"ranking":{"rodada":7,"mes":6,"turno":5,"campeonato":5,"patrimonio":5},"pontos":{"rodada":73.9599609375,"mes":122.62000274658203,"turno":372.7900085449219,"campeonato":372.7900085449219},"variacao":{"mes":0,"turno":-1,"campeonato":-1,"patrimonio":0}},{"url_escudo_png":"https://s2.glbimg.com/GxWaaD-I90Fw4dLIWoGv6vD45uA=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_110/escudo/be/06/54/003deedccc-1212-469a-98a0-208fece8debe20180413140654","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_110/escudo/be/06/54/003deedccc-1212-469a-98a0-208fece8debe20180413140654","time_id":877792,"nome":"SkidMaiden ","nome_cartola":"Linconl","slug":"skidmaiden","facebook_id":100008308367087,"foto_perfil":"https://graph.facebook.com/v2.9/100008308367087/picture?width=100&height=100","assinante":false,"patrimonio":147.75,"ranking":{"rodada":5,"mes":7,"turno":6,"campeonato":6,"patrimonio":4},"pontos":{"rodada":75.93017578125,"mes":120.38999938964844,"turno":365.1300048828125,"campeonato":365.1300048828125},"variacao":{"mes":1,"turno":0,"campeonato":0,"patrimonio":-1}},{"url_escudo_png":"https://s2.glbimg.com/PbMRG9sj-ki6k-65ipISyy23_-s=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/4a/57/57/00b35c12fa-1947-4529-839d-49b6e411794a20180414125757","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/4a/57/57/00b35c12fa-1947-4529-839d-49b6e411794a20180414125757","time_id":14970804,"nome":"Tanus lascado","nome_cartola":"Dércio pinto","slug":"tanus-lascado","facebook_id":null,"foto_perfil":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/perfil.png","assinante":true,"patrimonio":124.77,"ranking":{"rodada":9,"mes":8,"turno":7,"campeonato":7,"patrimonio":7},"pontos":{"rodada":58.47998046875,"mes":105.69999694824219,"turno":333.7099914550781,"campeonato":333.7099914550781},"variacao":{"mes":-1,"turno":0,"campeonato":0,"patrimonio":0}},{"url_escudo_png":"https://s2.glbimg.com/Rpccdyo-k3D5F8I4A-elhG9bJpQ=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_112/escudo/21/36/54/0044e62bdf-3587-4362-8329-e3b3e5dcc02120180414133654","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_112/escudo/21/36/54/0044e62bdf-3587-4362-8329-e3b3e5dcc02120180414133654","time_id":8533348,"nome":"Frederico Evandro FC","nome_cartola":"Rodrigo Barreiro","slug":"frederico-evandro-fc","facebook_id":null,"foto_perfil":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/perfil.png","assinante":false,"patrimonio":116.21,"ranking":{"rodada":6,"mes":4,"turno":8,"campeonato":8,"patrimonio":8},"pontos":{"rodada":75.27978515625,"mes":141.39999389648438,"turno":302.5799865722656,"campeonato":302.5799865722656},"variacao":{"mes":-2,"turno":0,"campeonato":0,"patrimonio":0}},{"url_escudo_png":"https://s2.glbimg.com/I3GncY4FmKze7rLN3vTz-8kKJH4=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/64/43/48/00035aa954-075e-4f47-bb0e-de7fc8b1826420180414094348","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_111/escudo/64/43/48/00035aa954-075e-4f47-bb0e-de7fc8b1826420180414094348","time_id":1538879,"nome":"VC N PODE COMIGO","nome_cartola":"Paulo Carvalho","slug":"vc-n-pode-comigo","facebook_id":null,"foto_perfil":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/perfil.png","assinante":false,"patrimonio":110.55,"ranking":{"rodada":8,"mes":9,"turno":9,"campeonato":9,"patrimonio":9},"pontos":{"rodada":62.719970703125,"mes":99.55999755859375,"turno":271.44000244140625,"campeonato":271.44000244140625},"variacao":{"mes":0,"turno":0,"campeonato":0,"patrimonio":0}}]}');
            this.setLiga(liga);
            this.loadTimesInfo(liga.times).then(times => {
                liga.times = times;
                resolve(liga);
            });
        });
    }

    loadTimesInfo(times) {
        return new Promise((resolve, reject) => {
            let timesOk = [];
            for (let time of times) {
                this.timeControll.loadTimeComMercadoFechado(time).then(timeInfo => {
                    time.clubes = timeInfo.clubes;
                    time.posicoes = timeInfo.posicoes;
                    time.atletas = timeInfo.atletas;
                    time.capitao_id = timeInfo.capitao_id;
                    time.pontos = timeInfo.pontos;
                    timesOk.push(time);
                    timesOk.length == times.length ? resolve(timesOk) : '';
                });
            }
        });
    }

    setLiga(liga: any) {
        this.liga = liga;
    }

    getLiga() {
        return this.liga;
    }

    getLigas() { return this.ligas };

    setLigas(ligas: any) {
        this.ligas = ligas;
    };
}