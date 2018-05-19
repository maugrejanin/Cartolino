import { Injectable, Component, Inject } from "@angular/core";
import { Api } from "../providers";
import { IUserDataControll } from "./userDataControll";
import { get_time_api, status_mercado_aberto, status_mercado_fechado } from "../pages";
import { IJogadoresControll } from "./jogadoresControll";
import { IMercadoControll } from "./mercadoControll";

export interface Time {
    atletas: any,
    pontos: string,
    capitao_id: number,
    time_id: string
}

export interface ITimeControll {
    loadTime(time: any);
    setTime(time: Time);
    getParciaisDosJogadoresDoTime(time: Time);
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

    loadTime(time: any) {
        return new Promise((resolve, reject) => {
            this.api.getWithAuth(get_time_api + time.time_id, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        this.time = res.json();
                        if (this.mercadoControll.getMercadoStatus() == status_mercado_fechado) {
                            this.getParciaisDosJogadoresDoTime(this.time).then(res => {
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

    getParciaisDosJogadoresDoTime(time: Time) {
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
            this.time.pontos = parcialTime.toFixed(2);
            resolve(this.time);
        });

    }
}

@Injectable()
@Component({
    providers: [Api]
})
export class TimeControllFake implements ITimeControll {

    time: Time;

    constructor(
        private api: Api,
        @Inject('IUserDataControll') public userDataControll: IUserDataControll,
        @Inject('IJogadoresControll') public jogadoresControll: IJogadoresControll,
        @Inject('IMercadoControll') public mercadoControll: IMercadoControll) { }

    loadTime(time: Time) {
        return new Promise((resolve, reject) => {
            this.time = JSON.parse('{"atletas":[{"nome":"Adilson Warken","slug":"","apelido":"Adilson","foto":"https://s.glbimg.com/es/sde/f/2018/05/07/8d28089e075545ce7ac5d0eacc69563e_FORMATO.png","atleta_id":50307,"rodada_id":5,"clube_id":282,"posicao_id":4,"status_id":7,"pontos_num":0,"preco_num":7.17,"variacao_num":1.25,"media_num":4.28,"jogos_num":4,"scout":null},{"nome":"Leonardo da Silva Moura","slug":"","apelido":"Léo Moura","foto":"https://s.glbimg.com/es/sde/f/2017/04/23/7277c35fed3ff5f997fbf230b96586e4_FORMATO.png","atleta_id":37701,"rodada_id":5,"clube_id":284,"posicao_id":2,"status_id":7,"pontos_num":0,"preco_num":11.92,"variacao_num":0,"media_num":6.73,"jogos_num":3,"scout":null},{"nome":"Antônio Carlos Cunha Capocasali Júnior","slug":"","apelido":"Antônio Carlos ","foto":"https://s.glbimg.com/es/sde/f/2017/04/18/5b3fcb4c6c1625d8e38d933619f9e42a_FORMATO.png","atleta_id":79702,"rodada_id":5,"clube_id":275,"posicao_id":3,"status_id":7,"pontos_num":0,"preco_num":8.17,"variacao_num":0.42,"media_num":3.4,"jogos_num":5,"scout":null},{"nome":"Roger Machado Marques","slug":"","apelido":"Roger Machado ","foto":"https://s.glbimg.com/es/sde/f/2018/03/01/212d053449b688cbf5c418199f7d8e8d_FORMATO.png","atleta_id":79437,"rodada_id":5,"clube_id":275,"posicao_id":6,"status_id":7,"pontos_num":0,"preco_num":10.67,"variacao_num":-0.25,"media_num":4.42,"jogos_num":5,"scout":null},{"nome":"Maicon Thiago Pereira de Souza","slug":"","apelido":"Maicon","foto":"https://s.glbimg.com/es/sde/f/2017/04/23/2d7990dd22103819070a18092e4a35b7_FORMATO.png","atleta_id":38196,"rodada_id":5,"clube_id":284,"posicao_id":4,"status_id":7,"pontos_num":0,"preco_num":9.02,"variacao_num":-2.62,"media_num":7.22,"jogos_num":4,"scout":null},{"nome":"Bruno Henrique Corsini","slug":"","apelido":"Bruno Henrique","foto":"https://s.glbimg.com/es/sde/f/2017/09/04/f252554797209a70ab4bd0e0cf7e8692_FORMATO.jpeg","atleta_id":70944,"rodada_id":5,"clube_id":275,"posicao_id":4,"status_id":7,"pontos_num":0,"preco_num":10.1,"variacao_num":0.81,"media_num":6.6,"jogos_num":4,"scout":null},{"nome":"Leonardo Campos Duarte da Silva","slug":"","apelido":"Léo Duarte","foto":"https://s.glbimg.com/es/sde/f/2018/05/04/ee1f02d44cf27eea6302d6696a7ca975_FORMATO.png","atleta_id":94214,"rodada_id":5,"clube_id":262,"posicao_id":3,"status_id":7,"pontos_num":0,"preco_num":6.89,"variacao_num":0.02,"media_num":5.57,"jogos_num":3,"scout":null},{"nome":"Victor Leandro Bagy","slug":"","apelido":"Victor","foto":"https://s.glbimg.com/es/sde/f/2018/05/07/d890df905bbd3bb36a77d0ebf6a7ec0e_FORMATO.png","atleta_id":52950,"rodada_id":5,"clube_id":282,"posicao_id":1,"status_id":7,"pontos_num":0,"preco_num":13.04,"variacao_num":4,"media_num":4.9,"jogos_num":5,"scout":null},{"nome":"Lucas Rafael Araujo Lima","slug":"","apelido":"Lucas Lima","foto":"https://s.glbimg.com/es/sde/f/2018/03/01/8596087ee3b876941e59b282b29cfcb2_FORMATO.png","atleta_id":80583,"rodada_id":5,"clube_id":275,"posicao_id":4,"status_id":7,"pontos_num":0,"preco_num":6.14,"variacao_num":-0.8,"media_num":0.96,"jogos_num":5,"scout":null},{"nome":"Patric Cabral Lalau","slug":"","apelido":"Patric","foto":"https://s.glbimg.com/es/sde/f/2018/05/07/1a92a6695f550a6074401fe61265d5db_FORMATO.png","atleta_id":60969,"rodada_id":5,"clube_id":282,"posicao_id":2,"status_id":7,"pontos_num":0,"preco_num":6.25,"variacao_num":0.98,"media_num":3.72,"jogos_num":5,"scout":null},{"nome":"Vinicius José Paixão de Oliveira Junior","slug":"","apelido":"Vinicius Junior","foto":"https://s.glbimg.com/es/sde/f/2018/05/04/55d0a5b2076c985057d4359c79ba8b9d_FORMATO.png","atleta_id":99535,"rodada_id":5,"clube_id":262,"posicao_id":5,"status_id":7,"pontos_num":0,"preco_num":15.72,"variacao_num":0.87,"media_num":7.74,"jogos_num":5,"scout":null},{"nome":"Marcos da Silva França","slug":"","apelido":"Keno","foto":"https://s.glbimg.com/es/sde/f/2017/04/18/ab0e22f1ff91a12ce2e88a367450bf03_FORMATO.png","atleta_id":86485,"rodada_id":5,"clube_id":275,"posicao_id":5,"status_id":7,"pontos_num":0,"preco_num":10.89,"variacao_num":-0.56,"media_num":5.7,"jogos_num":5,"scout":null}],"clubes":{"262":{"id":262,"nome":"Flamengo","abreviacao":"FLA","posicao":1,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-30.png"}},"263":{"id":263,"nome":"Botafogo","abreviacao":"BOT","posicao":6,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/botafogo_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/botafogo_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/botafogo_30x30.png"}},"264":{"id":264,"nome":"Corinthians","abreviacao":"COR","posicao":2,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/corinthians_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/corinthians_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/corinthians_30x30.png"}},"265":{"id":265,"nome":"Bahia","abreviacao":"BAH","posicao":13,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/bahia_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/bahia_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/bahia_30x30.png"}},"266":{"id":266,"nome":"Fluminense","abreviacao":"FLU","posicao":11,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/fluminense_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/fluminense_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/Fluminense-escudo.png"}},"267":{"id":267,"nome":"Vasco","abreviacao":"VAS","posicao":9,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2016/07/29/Vasco-65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2016/07/29/Vasco-45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2016/07/29/Vasco-30.png"}},"275":{"id":275,"nome":"Palmeiras","abreviacao":"PAL","posicao":8,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/palmeiras_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/palmeiras_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/palmeiras_30x30.png"}},"276":{"id":276,"nome":"São Paulo","abreviacao":"SAO","posicao":7,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/sao_paulo_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/sao_paulo_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/sao_paulo_30x30.png"}},"277":{"id":277,"nome":"Santos","abreviacao":"SAN","posicao":15,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/santos_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/santos_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/santos_30x30.png"}},"282":{"id":282,"nome":"Atlético-MG","abreviacao":"ATL","posicao":4,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2017/11/23/Atletico-Mineiro-escudo65px.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2017/11/23/Atletico-Mineiro-escudo45px.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2017/11/23/Atletico-Mineiro-escudo30px.png"}},"283":{"id":283,"nome":"Cruzeiro","abreviacao":"CRU","posicao":18,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/04/29/cruzeiro_65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/04/29/cruzeiro_45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/04/29/cruzeiro_30.png"}},"284":{"id":284,"nome":"Grêmio","abreviacao":"GRE","posicao":12,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/gremio_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/gremio_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/gremio_30x30.png"}},"285":{"id":285,"nome":"Internacional","abreviacao":"INT","posicao":10,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2016/05/03/inter65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2016/05/03/inter45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2016/05/03/inter30.png"}},"287":{"id":287,"nome":"Vitória","abreviacao":"VIT","posicao":17,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/vitoria_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/vitoria_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/vitoria_30x30.png"}},"289":{"id":289,"nome":"Paraná","abreviacao":"PAR","posicao":20,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/13/parana_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2014/04/13/parana_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2014/04/13/parana_30x30.png"}},"292":{"id":292,"nome":"Sport","abreviacao":"SPO","posicao":14,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/sport65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/sport45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/sport30.png"}},"293":{"id":293,"nome":"Atlético-PR","abreviacao":"ATL","posicao":5,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/06/24/atletico-pr_2015_65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/06/24/atletico-pr_2015_45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/06/24/atletico-pr_2015_30.png"}},"315":{"id":315,"nome":"Chapecoense","abreviacao":"CHA","posicao":16,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/08/03/Escudo-Chape-165.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/08/03/Escudo-Chape-145.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/08/03/Escudo-Chape-130.png"}},"327":{"id":327,"nome":"América-MG","abreviacao":"AME","posicao":3,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/organizacoes/2018/01/24/AmericaMG-65.png","45x45":"https://s.glbimg.com/es/sde/f/organizacoes/2018/01/24/AmericaMG-45.png","30x30":"https://s.glbimg.com/es/sde/f/organizacoes/2018/01/24/AmericaMG-30.png"}},"354":{"id":354,"nome":"Ceará","abreviacao":"CEA","posicao":19,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/ceara_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/ceara_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/ceara_30x30.png"}}},"posicoes":{"1":{"id":1,"nome":"Goleiro","abreviacao":"gol"},"2":{"id":2,"nome":"Lateral","abreviacao":"lat"},"3":{"id":3,"nome":"Zagueiro","abreviacao":"zag"},"4":{"id":4,"nome":"Meia","abreviacao":"mei"},"5":{"id":5,"nome":"Atacante","abreviacao":"ata"},"6":{"id":6,"nome":"Técnico","abreviacao":"tec"}},"status":{"2":{"id":2,"nome":"Dúvida"},"3":{"id":3,"nome":"Suspenso"},"5":{"id":5,"nome":"Contundido"},"6":{"id":6,"nome":"Nulo"},"7":{"id":7,"nome":"Provável"}},"capitao_id":99535,"time":{"time_id":8533348,"clube_id":275,"esquema_id":4,"globo_id":"44e62bdf-3587-4362-8329-e3b3e5dcc021","facebook_id":null,"foto_perfil":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/placeholder/perfil.png","nome":"Frederico Evandro FC","nome_cartola":"Rodrigo Barreiro","slug":"frederico-evandro-fc","tipo_escudo":4,"cor_fundo_escudo":"0066ff","cor_borda_escudo":"0a6634","cor_primaria_estampa_escudo":"ff241d","cor_secundaria_estampa_escudo":"000000","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_112/escudo/21/36/54/0044e62bdf-3587-4362-8329-e3b3e5dcc02120180414133654","url_escudo_png":"https://s2.glbimg.com/Rpccdyo-k3D5F8I4A-elhG9bJpQ=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_112/escudo/21/36/54/0044e62bdf-3587-4362-8329-e3b3e5dcc02120180414133654","url_camisa_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_112/camisa/21/36/54/0044e62bdf-3587-4362-8329-e3b3e5dcc02120180414133654","url_camisa_png":"https://s2.glbimg.com/RpIzTsAKugD8Z9ghE1by0xFj8Pk=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_112/camisa/21/36/54/0044e62bdf-3587-4362-8329-e3b3e5dcc02120180414133654","tipo_estampa_escudo":4,"tipo_adorno":3,"tipo_camisa":1,"tipo_estampa_camisa":5,"cor_camisa":"0066ff","cor_primaria_estampa_camisa":"ff241d","cor_secundaria_estampa_camisa":"000000","rodada_time_id":6,"assinante":false,"cadastro_completo":true,"patrocinador1_id":63,"patrocinador2_id":64,"temporada_inicial":2017,"simplificado":false,"sorteio_pro_num":null},"patrimonio":0,"esquema_id":4,"pontos":75.27978515625,"valor_time":0,"rodada_atual":6}');
            if (this.mercadoControll.getMercadoStatus() == status_mercado_fechado) {
                this.getParciaisDosJogadoresDoTime(this.time).then(res => {
                    if (res) {
                        this.calcularParcialTime().then(time => {
                            resolve(time)
                        });
                    }
                });
            } else {
                resolve(this.time);
            }
        });
    }

    setTime(time: Time) {
        this.time = time;
    }

    getParciaisDosJogadoresDoTime(time: Time) {
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
            this.time.pontos = parcialTime.toFixed(2);
            resolve(this.time);
        });

    }
}