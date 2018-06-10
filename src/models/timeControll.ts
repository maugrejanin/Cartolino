import { Injectable, Component, Inject } from "@angular/core";
import { Api } from "../providers";
import { IUserDataControll } from "./userDataControll";
import { get_time_api, status_mercado_aberto, status_mercado_fechado } from "../pages";
import { IJogadoresControll, Atleta } from "./jogadoresControll";
import { IMercadoControll } from "./mercadoControll";
import * as _ from 'lodash';

export interface Time {
    url_escudo_svg: string,
    time_id: number,
    nome: string,
    nome_cartola: string,
    pontuados: number,
    capitao_id: number,
    pontos: {
        rodada: number,
        campeonato: number
    },
    atletas: Atleta[],
    posicoes: {},
    clubes: {}
}

export interface ITimeControll {
    loadTimeComMercadoFechado(time: any);
    loadTime(time: any);
    getParciaisDosJogadoresDoTime(time: Time);
    calcularParcialTime(time);
    loadTimesDaLiga(times);
}

@Injectable()
@Component({
    providers: [Api]
})
export class TimeControll implements ITimeControll {
    constructor(
        private api: Api,
        @Inject('IUserDataControll') public userDataControll: IUserDataControll,
        @Inject('IJogadoresControll') public jogadoresControll: IJogadoresControll,
        @Inject('IMercadoControll') public mercadoControll: IMercadoControll) { }

    loadTimesDaLiga(liga) {
        return new Promise((resolve, reject) => {
            let timeInfo;
            this.mercadoControll.getMercadoStatus().then(mercadoStatus => {
                for (let i in liga.times) {
                    if (mercadoStatus == status_mercado_fechado) {
                        this.loadTimeComMercadoFechado(liga.times[i]).then(timeData => {
                            liga.times[i].pontos.rodada = timeData['pontos'].rodada;
                            liga.times[i].pontos.campeonato_pre_rodada = this.savePontosCampeonatoPreRodada(liga.times[i]);
                            liga.times[i].pontos.campeonato = liga.times[i].pontos.rodada + liga.times[i].pontos.campeonato_pre_rodada;
                            liga.times[i].pontuados = timeData['pontuados'];
                            liga.times[i] = this.setTimeInfo(liga.times[i], timeData);
                            liga.times[i].atletas = _.orderBy(liga.times[i].atletas, 'posicao_id', 'asc');
                            parseInt(i) + 1 == liga.times.length ? resolve(liga) : '';
                        })
                    } else {
                        this.loadTime(liga.times[i]).then(timeData => {
                            liga.times[i] = this.setTimeInfo(liga.times[i], timeData);
                            parseInt(i) + 1 == liga.times.length ? resolve(liga) : '';
                        })
                    }
                }
            });
        });
    }

    savePontosCampeonatoPreRodada(time) {
        if (time.pontos.campeonato_pre_rodada) {
            return time.pontos.campeonato_pre_rodada;
        } else {
            return time.pontos.campeonato;
        }
    };

    loadTimeComMercadoFechado(time: Time) {
        // Nao funciona com mercado em manutenção
        return new Promise((resolve, reject) => {
            this.api.getWithAuth(get_time_api + time.time_id, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        let time = res.json();
                        this.getParciaisDosJogadoresDoTime(time).then(timeComParciais => {
                            resolve(timeComParciais);
                        });
                    }
                );
        });
    }

    setTimeInfo(time, timeInfo) {
        time.clubes = timeInfo.clubes;
        time.posicoes = timeInfo.posicoes;
        time.atletas = timeInfo.atletas;
        time.capitao_id = timeInfo.capitao_id;
        time.pontos.rodada = parseFloat((time.pontos.rodada).toFixed(2));
        time.pontos.campeonato = parseFloat((time.pontos.campeonato).toFixed(2));
        return time;
    }

    loadTime(time: any) {
        // Nao funciona com mercado em manutenção
        return new Promise((resolve, reject) => {
            this.api.getWithAuth(get_time_api + time.time_id, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        // this.setTime(res.json());
                        resolve(res.json());
                    }
                );
        });
    }

    setTime(time) {

    }

    getParciaisDosJogadoresDoTime(time: Time) {
        return new Promise((resolve, reject) => {
            this.jogadoresControll.loadJogadores().then(res => {
                if (res) {
                    time.pontuados = 0;
                    for (const i in time.atletas) {
                        let parcialJogador = this.jogadoresControll.getParcialJogador(time.atletas[i]['atleta_id']);
                        if (parcialJogador !== false) {
                            if (!(parcialJogador == 0 && time.atletas[i].posicao_id == 6)) {
                                time.atletas[i].pontos_num = parcialJogador;
                                time.pontuados++;
                            }
                        }

                        let scoutJogador = this.jogadoresControll.getScoutJogador(time.atletas[i]['atleta_id']);
                        if (scoutJogador) {
                            time.atletas[i].scout = scoutJogador;
                        }
                    }
                    this.calcularParcialTime(time).then(time => {
                        resolve(time)
                    });
                }
            })
        });
    }

    calcularParcialTime(time: Time) {
        return new Promise((resolve, reject) => {
            let parcialTime = 0;
            let parcialAtleta = 0;
            for (const i in time.atletas) {
                parcialAtleta = time.atletas[i].pontos_num;
                parcialTime += time.capitao_id == time.atletas[i].atleta_id ? (parcialAtleta * 2) : parcialAtleta;
            }
            delete time.pontos;
            time.pontos = {
                rodada: parcialTime,
                campeonato: 0
            };
            resolve(time);
        });
    }
}

@Injectable()
@Component({
    providers: [Api]
})
export class TimeControllFake implements ITimeControll {

    constructor(
        private api: Api,
        @Inject('IUserDataControll') public userDataControll: IUserDataControll,
        @Inject('IJogadoresControll') public jogadoresControll: IJogadoresControll,
        @Inject('IMercadoControll') public mercadoControll: IMercadoControll) { }

    loadTimeComMercadoFechado(time: any) {
        // Nao funciona com mercado em manutenção
        return new Promise((resolve, reject) => {
            let time = JSON.parse('{"atletas":[{"nome":"Roger Machado Marques","slug":"","apelido":"Roger Machado ","foto":"https://s.glbimg.com/es/sde/f/2018/03/01/212d053449b688cbf5c418199f7d8e8d_FORMATO.png","atleta_id":79437,"rodada_id":6,"clube_id":275,"posicao_id":6,"status_id":7,"pontos_num":8.82,"preco_num":11.97,"variacao_num":1.3,"media_num":5.15,"jogos_num":6,"scout":{}},{"nome":"Gustavo Leonardo Cuellar Gallego","slug":"","apelido":"Cuéllar","foto":"https://s.glbimg.com/es/sde/f/2018/05/04/f29c0031ffc2adccbe51088049c2dea0_FORMATO.png","atleta_id":71709,"rodada_id":6,"clube_id":262,"posicao_id":4,"status_id":3,"pontos_num":-2.9,"preco_num":9.43,"variacao_num":-1.04,"media_num":3.82,"jogos_num":6,"scout":{"CA":1,"CV":1,"FC":3,"FS":1,"PE":3,"RB":4}},{"nome":"Ramiro Moschen Benetti","slug":"","apelido":"Ramiro","foto":"https://s.glbimg.com/es/sde/f/2018/05/21/b542f6b29859cc988c01d38d2b6e75b2_FORMATO.png","atleta_id":78715,"rodada_id":6,"clube_id":284,"posicao_id":4,"status_id":7,"pontos_num":2,"preco_num":5.44,"variacao_num":-0.14,"media_num":1.2,"jogos_num":4,"scout":{"FC":1,"FS":2,"RB":1}},{"nome":"Vinicius José Paixão de Oliveira Junior","slug":"","apelido":"Vinicius Junior","foto":"https://s.glbimg.com/es/sde/f/2018/05/04/55d0a5b2076c985057d4359c79ba8b9d_FORMATO.png","atleta_id":99535,"rodada_id":6,"clube_id":262,"posicao_id":5,"status_id":7,"pontos_num":7.6,"preco_num":16.17,"variacao_num":0.45,"media_num":7.72,"jogos_num":6,"scout":{"FC":1,"FF":1,"FS":2,"G":1,"I":1,"PE":4}},{"nome":"Rodrigo Modesto da Silva Moledo","slug":"","apelido":"Rodrigo Moledo","foto":"https://s.glbimg.com/es/sde/f/2018/03/20/e5bb6257009bf74098a367b4c1b9e53d_FORMATO.png","atleta_id":63354,"rodada_id":6,"clube_id":285,"posicao_id":3,"status_id":7,"pontos_num":12.3,"preco_num":13.12,"variacao_num":1.77,"media_num":7.86,"jogos_num":5,"scout":{"FC":2,"G":1,"PE":4,"RB":1,"SG":1}},{"nome":"Lucas Tolentino Coelho de Lima","slug":"","apelido":"Lucas Paquetá","foto":"https://s.glbimg.com/es/sde/f/2018/05/04/a51d4ecef8c077c6114fcc199a9b40e4_FORMATO.png","atleta_id":94930,"rodada_id":6,"clube_id":262,"posicao_id":4,"status_id":7,"pontos_num":3.6,"preco_num":21.76,"variacao_num":-2.06,"media_num":10.68,"jogos_num":5,"scout":{"FC":2,"FF":1,"FS":1,"PE":4,"RB":3}},{"nome":"Matheus Simonete Bressanelli","slug":"","apelido":"Bressan","foto":"https://s.glbimg.com/es/sde/f/2018/05/18/89ef7379a0826a62657cb5948a315081_FORMATO.png","atleta_id":72491,"rodada_id":6,"clube_id":284,"posicao_id":3,"status_id":7,"pontos_num":7.7,"preco_num":8.45,"variacao_num":1.1,"media_num":4.38,"jogos_num":4,"scout":{"FC":1,"FS":1,"PE":1,"RB":2,"SG":1}},{"nome":"Antônio Carlos Cunha Capocasali Júnior","slug":"","apelido":"Antônio Carlos ","foto":"https://s.glbimg.com/es/sde/f/2017/04/18/5b3fcb4c6c1625d8e38d933619f9e42a_FORMATO.png","atleta_id":79702,"rodada_id":6,"clube_id":275,"posicao_id":3,"status_id":7,"pontos_num":11.2,"preco_num":10.23,"variacao_num":2.06,"media_num":4.7,"jogos_num":6,"scout":{"CA":1,"FC":1,"FF":1,"FS":1,"G":1,"PE":2,"SG":1}},{"nome":"José Henrique da Silva Dourado","slug":"","apelido":"Henrique Dourado","foto":"https://s.glbimg.com/es/sde/f/2018/05/04/d9413dcc3e693b62854a22d1a1f58501_FORMATO.png","atleta_id":81905,"rodada_id":6,"clube_id":262,"posicao_id":5,"status_id":7,"pontos_num":-0.8,"preco_num":12.07,"variacao_num":-0.7,"media_num":2.27,"jogos_num":6,"scout":{"FC":2,"FS":2,"I":1,"PE":1}},{"nome":"Miguel Angel Borja Hernandez","slug":"","apelido":"Borja","foto":"https://s.glbimg.com/es/sde/f/2017/04/23/4b0f5cd460ee874344bfbfd4e3eef9a6_FORMATO.png","atleta_id":86120,"rodada_id":6,"clube_id":275,"posicao_id":5,"status_id":3,"pontos_num":11,"preco_num":12.68,"variacao_num":1.92,"media_num":5.08,"jogos_num":4,"scout":{"A":1,"CA":1,"FC":1,"FF":2,"FS":1,"G":1,"I":2,"PE":2}},{"nome":"Diego Ribas da Cunha","slug":"","apelido":"Diego","foto":"https://s.glbimg.com/es/sde/f/2018/05/04/2ccade199ef965ef2245240569beb88d_FORMATO.png","atleta_id":38909,"rodada_id":6,"clube_id":262,"posicao_id":4,"status_id":7,"pontos_num":3.6,"preco_num":8.76,"variacao_num":0.55,"media_num":2.5,"jogos_num":4,"scout":{"FC":2,"FF":1,"FS":4,"PE":4,"RB":2}},{"nome":"Walter Leandro Capeloza Artune","slug":"","apelido":"Walter","foto":"https://s.glbimg.com/es/sde/f/2018/05/18/11b52002e2c6682af718f09f4c143886_FORMATO.png","atleta_id":51413,"rodada_id":6,"clube_id":264,"posicao_id":1,"status_id":7,"pontos_num":4,"preco_num":6.12,"variacao_num":-0.88,"media_num":4,"jogos_num":1,"scout":{"DD":2,"GS":1}}],"clubes":{"262":{"id":262,"nome":"Flamengo","abreviacao":"FLA","posicao":1,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-30.png"}},"263":{"id":263,"nome":"Botafogo","abreviacao":"BOT","posicao":10,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/botafogo_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/botafogo_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/botafogo_30x30.png"}},"264":{"id":264,"nome":"Corinthians","abreviacao":"COR","posicao":3,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/corinthians_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/corinthians_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/corinthians_30x30.png"}},"265":{"id":265,"nome":"Bahia","abreviacao":"BAH","posicao":13,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/bahia_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/bahia_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/bahia_30x30.png"}},"266":{"id":266,"nome":"Fluminense","abreviacao":"FLU","posicao":6,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/fluminense_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/fluminense_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/Fluminense-escudo.png"}},"267":{"id":267,"nome":"Vasco","abreviacao":"VAS","posicao":4,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2016/07/29/Vasco-65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2016/07/29/Vasco-45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2016/07/29/Vasco-30.png"}},"275":{"id":275,"nome":"Palmeiras","abreviacao":"PAL","posicao":2,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/palmeiras_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/palmeiras_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/palmeiras_30x30.png"}},"276":{"id":276,"nome":"São Paulo","abreviacao":"SAO","posicao":8,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/sao_paulo_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/sao_paulo_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/sao_paulo_30x30.png"}},"277":{"id":277,"nome":"Santos","abreviacao":"SAN","posicao":16,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/santos_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/santos_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/santos_30x30.png"}},"282":{"id":282,"nome":"Atlético-MG","abreviacao":"ATL","posicao":5,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2017/11/23/Atletico-Mineiro-escudo65px.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2017/11/23/Atletico-Mineiro-escudo45px.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2017/11/23/Atletico-Mineiro-escudo30px.png"}},"283":{"id":283,"nome":"Cruzeiro","abreviacao":"CRU","posicao":14,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/04/29/cruzeiro_65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/04/29/cruzeiro_45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/04/29/cruzeiro_30.png"}},"284":{"id":284,"nome":"Grêmio","abreviacao":"GRE","posicao":11,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/gremio_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/gremio_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/gremio_30x30.png"}},"285":{"id":285,"nome":"Internacional","abreviacao":"INT","posicao":12,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2016/05/03/inter65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2016/05/03/inter45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2016/05/03/inter30.png"}},"287":{"id":287,"nome":"Vitória","abreviacao":"VIT","posicao":19,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/vitoria_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/vitoria_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/vitoria_30x30.png"}},"289":{"id":289,"nome":"Paraná","abreviacao":"PAR","posicao":20,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/13/parana_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2014/04/13/parana_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2014/04/13/parana_30x30.png"}},"292":{"id":292,"nome":"Sport","abreviacao":"SPO","posicao":15,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/sport65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/sport45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/sport30.png"}},"293":{"id":293,"nome":"Atlético-PR","abreviacao":"ATL","posicao":9,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/06/24/atletico-pr_2015_65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/06/24/atletico-pr_2015_45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/06/24/atletico-pr_2015_30.png"}},"315":{"id":315,"nome":"Chapecoense","abreviacao":"CHA","posicao":17,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/08/03/Escudo-Chape-165.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/08/03/Escudo-Chape-145.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/08/03/Escudo-Chape-130.png"}},"327":{"id":327,"nome":"América-MG","abreviacao":"AME","posicao":7,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/organizacoes/2018/01/24/AmericaMG-65.png","45x45":"https://s.glbimg.com/es/sde/f/organizacoes/2018/01/24/AmericaMG-45.png","30x30":"https://s.glbimg.com/es/sde/f/organizacoes/2018/01/24/AmericaMG-30.png"}},"354":{"id":354,"nome":"Ceará","abreviacao":"CEA","posicao":18,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/ceara_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/ceara_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/ceara_30x30.png"}}},"posicoes":{"1":{"id":1,"nome":"Goleiro","abreviacao":"gol"},"2":{"id":2,"nome":"Lateral","abreviacao":"lat"},"3":{"id":3,"nome":"Zagueiro","abreviacao":"zag"},"4":{"id":4,"nome":"Meia","abreviacao":"mei"},"5":{"id":5,"nome":"Atacante","abreviacao":"ata"},"6":{"id":6,"nome":"Técnico","abreviacao":"tec"}},"status":{"2":{"id":2,"nome":"Dúvida"},"3":{"id":3,"nome":"Suspenso"},"5":{"id":5,"nome":"Contundido"},"6":{"id":6,"nome":"Nulo"},"7":{"id":7,"nome":"Provável"}},"capitao_id":81905,"time":{"time_id":877792,"clube_id":276,"esquema_id":1,"globo_id":"3deedccc-1212-469a-98a0-208fece8debe","facebook_id":100008308367087,"foto_perfil":"https://graph.facebook.com/v2.9/100008308367087/picture?width=100\u0026height=100","nome":"SkidMaiden ","nome_cartola":"Linconl","slug":"skidmaiden","tipo_escudo":4,"cor_fundo_escudo":"000000","cor_borda_escudo":"bf1d17","cor_primaria_estampa_escudo":"bf1d17","cor_secundaria_estampa_escudo":"000000","url_escudo_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_110/escudo/be/06/54/003deedccc-1212-469a-98a0-208fece8debe20180413140654","url_escudo_png":"https://s2.glbimg.com/GxWaaD-I90Fw4dLIWoGv6vD45uA=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_110/escudo/be/06/54/003deedccc-1212-469a-98a0-208fece8debe20180413140654","url_camisa_svg":"https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_110/camisa/be/06/54/003deedccc-1212-469a-98a0-208fece8debe20180413140654","url_camisa_png":"https://s2.glbimg.com/EkSqLt9q6vD_CH5tKtQwpIyLQoA=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_110/camisa/be/06/54/003deedccc-1212-469a-98a0-208fece8debe20180413140654","tipo_estampa_escudo":1,"tipo_adorno":2,"tipo_camisa":2,"tipo_estampa_camisa":5,"cor_camisa":"000000","cor_primaria_estampa_camisa":"bf1d17","cor_secundaria_estampa_camisa":"000000","rodada_time_id":7,"assinante":false,"cadastro_completo":true,"patrocinador1_id":63,"patrocinador2_id":62,"temporada_inicial":2014,"simplificado":false,"sorteio_pro_num":null},"patrimonio":0,"esquema_id":1,"pontos":67.31982421875,"valor_time":0,"rodada_atual":6}');
            // this.getParciaisDosJogadoresDoTime(time).then(timeComParciais => {
            //     resolve(timeComParciais);
            // });
        });
    }
    loadTimesDaLiga(time) { }

    loadTime(time: any) {
        // Nao funciona com mercado em manutenção
        return new Promise((resolve, reject) => {
            this.api.getWithAuth(get_time_api + time.time_id, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        resolve(res.json());
                    }
                );
        });
    }

    getParciaisDosJogadoresDoTime(time: Time) {
        // let mercadoStatus = 2; //Para simular o mercado fechado
        // return new Promise((resolve, reject) => {
        //     if (status_mercado_fechado == mercadoStatus) {
        //         time.pontuados = 0;
        //         for (const i in time.atletas) {
        //             let parcialJogador = this.jogadoresControll.getParcialJogador(time.atletas[i]['atleta_id']);
        //             if (parcialJogador) {
        //                 time.atletas[i].pontos_num = parcialJogador;
        //                 time.pontuados++;
        //             }
        //         }
        //         this.calcularParcialTime(time).then(time => {
        //             resolve(time)
        //         });
        //     } else { // Simular o mercado aberto
        //         resolve(time)
        //     }
        // });
    }

    calcularParcialTime(time: Time) {
        // return new Promise((resolve, reject) => {
        //     let parcialTime = 0;
        //     let parcialAtleta = 0;
        //     for (const i in time.atletas) {
        //         parcialAtleta = time.atletas[i].pontos_num;
        //         parcialTime += time.capitao_id == time.atletas[i].atleta_id ? (parcialAtleta * 2) : parcialAtleta;
        //     }
        //     delete time.pontos;
        //     time.pontos = {
        //         rodada: 0,
        //         campeonato: 0
        //     };
        //     time.pontos.rodada = parcialTime;
        //     resolve(time);
        // });
    }
}