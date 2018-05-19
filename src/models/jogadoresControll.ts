import { Api } from "../providers";
import { get_pontuados_api } from "../pages";
import { IUserDataControll } from "./userDataControll";
import { Inject, Injectable, Component } from "@angular/core";

export interface Jogadores {
    "rodada": string,
    "atletas": {},
    "clubes": {},
    "posicoes": {},
    "total_atletas": {};
}

export interface IJogadoresControll {
    loadJogadores();
    setJogadores(jogadores: {});
    getJogadores(): {};
    getJogador(jogador_id: string);
    jogadoresLoaded(): boolean;
    getParcialJogador(jogador_id: string);
}

@Injectable()
@Component({
    providers: [Api]
})
export class JogadoresControll implements IJogadoresControll {
    private jogadores: Jogadores;

    constructor(private api: Api, @Inject('IUserDataControll') public userDataControll: IUserDataControll) {
        this.loadJogadores();
    };

    loadJogadores() {
        return new Promise((resolve, reject) => {
            this.api.getWithAuth(get_pontuados_api, { GLBID: this.userDataControll.getGLBID() })
                .toPromise()
                .then(
                    res => {
                        console.log("jogadores ok", res.json());
                        this.setJogadores(res.json());
                        resolve(true);
                    }
                );
        });
    }

    setJogadores(jogadores: Jogadores) {
        this.jogadores = jogadores;
    };

    getJogadores() { return this.jogadores };

    getJogador(jogador_id: string) {
        return this.jogadores.atletas[jogador_id];
    };

    getParcialJogador(jogador_id: string) {
        if (!this.jogadores.atletas[jogador_id]) {
            return 0;
        } else {
            return this.jogadores.atletas[jogador_id].pontuacao;
        }
    };

    jogadoresLoaded() {
        return this.getJogadores() ? true : false;
    }
}

@Injectable()
@Component({
    providers: [Api]
})
export class JogadoresControllFake implements IJogadoresControll {
    private jogadores: Jogadores;

    constructor(private api: Api, @Inject('IUserDataControll') public userDataControll: IUserDataControll) {
        this.loadJogadores();
    };

    loadJogadores() {
        this.setJogadores(JSON.parse('{"rodada":6,"atletas":{"37245":{"apelido":"Guto Ferreira","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/03/02/04627b6d62a4bbd729133e9eabd5b593_FORMATO.png","posicao_id":6,"clube_id":265},"37281":{"apelido":"Mano Menezes","pontuacao":1.91,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/05/18/b67ea93f254fb3c5b6517b9f84238c19_FORMATO.png","posicao_id":6,"clube_id":283},"37306":{"apelido":"Gilson Kleina","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/03/02/86350cc46965a483a2b3f7a6e31cf52a_FORMATO.png","posicao_id":6,"clube_id":315},"37319":{"apelido":"Marcelo Chamusca","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/03/15/8575ab3c43af119d65d706a9e1c8e87f_FORMATO.png","posicao_id":6,"clube_id":354},"37656":{"apelido":"Fábio","pontuacao":4,"scout":{"DD":2,"GS":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/18/d4072db4bdda7615aec2517449afe555_FORMATO.png","posicao_id":1,"clube_id":283},"37798":{"apelido":"Rafael Sobis","pontuacao":2.4,"scout":{"FF":3},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/89dec4f38d1a0c8584e115128f412fcf_FORMATO.png","posicao_id":5,"clube_id":283},"38229":{"apelido":"Fábio Santos","pontuacao":7.2,"scout":{"FC":2,"FF":1,"PE":2,"RB":2,"SG":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/98bee57585b8dde8e58e642b147a3a11_FORMATO.png","posicao_id":2,"clube_id":282},"38910":{"apelido":"Ricardo Oliveira","pontuacao":10.6,"scout":{"A":1,"FD":1,"FF":4,"PE":1,"RB":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/b853b7148bc822996c8074255a69a3c4_FORMATO.png","posicao_id":5,"clube_id":282},"39850":{"apelido":"Vagner Mancini","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/03/21/0c565870c992530e8a61a4620fdf8425_FORMATO.png","posicao_id":6,"clube_id":287},"40006":{"apelido":"Abel Braga","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/05/18/56df7a5b666402197bf8a4e66ddbaa18_FORMATO.png","posicao_id":6,"clube_id":266},"41929":{"apelido":"Renato Gaúcho","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2016/10/20/11389b106c935a0e20c5b557a4161683_FORMATO.png","posicao_id":6,"clube_id":284},"50307":{"apelido":"Adilson","pontuacao":1.9,"scout":{"CA":1,"FC":3,"PE":2,"RB":4},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/8d28089e075545ce7ac5d0eacc69563e_FORMATO.png","posicao_id":4,"clube_id":282},"52950":{"apelido":"Victor","pontuacao":11,"scout":{"DD":2,"SG":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/d890df905bbd3bb36a77d0ebf6a7ec0e_FORMATO.png","posicao_id":1,"clube_id":282},"54395":{"apelido":"Elias","pontuacao":0.3,"scout":{"CA":1,"FC":1,"FD":1,"FS":2,"PE":3,"RB":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/9cae85100fc013bc0d503fb2e82577ce_FORMATO.png","posicao_id":4,"clube_id":282},"62104":{"apelido":"Robinho","pontuacao":1.9,"scout":{"FF":1,"FS":1,"PE":3,"RB":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/9ec32acd97931db6852cd1b099fca085_FORMATO.png","posicao_id":4,"clube_id":283},"62137":{"apelido":"Enderson Moreira","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/03/17/4a6e561bbf1123eb516161678dea131e_FORMATO.png","posicao_id":6,"clube_id":327},"63219":{"apelido":"Luan","pontuacao":-0.5,"scout":{"FC":1,"PE":5,"RB":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/c8cafabc87bc7ef4d50c8f18eafa05ce_FORMATO.png","posicao_id":5,"clube_id":282},"68698":{"apelido":"Bruno Silva","pontuacao":1.2,"scout":{"CA":1,"FC":2,"FD":1,"FF":2,"FS":1,"PE":2,"RB":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/18/c5296c34cd5096c635acc7874899ab65_FORMATO.png","posicao_id":4,"clube_id":283},"69014":{"apelido":"Manoel","pontuacao":2.4,"scout":{"PE":2,"RB":2},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/6cf5cf190985e20f0a42a7408e164e10_FORMATO.png","posicao_id":3,"clube_id":283},"70526":{"apelido":"Rogério Micale","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/03/21/b716462900fb6d306d797525d21c94c2_FORMATO.png","posicao_id":6,"clube_id":289},"70696":{"apelido":"Fábio Carille","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/03/20/3e7bfa01fec16848b569ba9368ea13ef_FORMATO.png","posicao_id":6,"clube_id":264},"71066":{"apelido":"Mancuello","pontuacao":-6.6,"scout":{"CV":1,"FC":2,"PE":2},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/0f1aad8b26fa5e7442bde1e17cfc4dfb_FORMATO.png","posicao_id":4,"clube_id":283},"72391":{"apelido":"Fernando Diniz","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/03/01/744e7ddbce3e389aa300edd8ce854afc_FORMATO.png","posicao_id":6,"clube_id":293},"73766":{"apelido":"Diego Aguirre","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/03/26/187f8c6b563aca4a07634274588e2e6a_FORMATO.png","posicao_id":6,"clube_id":276},"79437":{"apelido":"Roger Machado ","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/03/01/212d053449b688cbf5c418199f7d8e8d_FORMATO.png","posicao_id":6,"clube_id":275},"79578":{"apelido":"Sassá","pontuacao":-1,"scout":{"FC":2},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/89b8e9b3d830ff681500c63572397636_FORMATO.png","posicao_id":5,"clube_id":283},"80318":{"apelido":"Ezequiel ","pontuacao":2.2,"scout":{"FC":1,"PE":1,"RB":2},"foto":"https://s.glbimg.com/es/sde/f/2018/05/18/579600b8688378c79b2d26c49843ed6e_FORMATO.png","posicao_id":2,"clube_id":283},"80363":{"apelido":"Ariel Cabral","pontuacao":5.7,"scout":{"FC":1,"FF":1,"PE":2,"RB":4},"foto":"https://s.glbimg.com/es/sde/f/2018/05/18/f33acc95e50fe26abc27ac1d525bb4a4_FORMATO.png","posicao_id":4,"clube_id":283},"81682":{"apelido":"Cazares","pontuacao":0.7,"scout":{"FC":2,"FD":1,"FS":1,"PE":5,"RB":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/2952d9583a363deaf38934dd9c4cd382_FORMATO.png","posicao_id":4,"clube_id":282},"82634":{"apelido":"Matheus Galdezani","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/05/17/2b140006a6546ccb3c5fbb067a9e8b93_FORMATO.png","posicao_id":4,"clube_id":282},"82639":{"apelido":"Marcelo Hermes","pontuacao":3.6,"scout":{"FF":1,"FS":2,"PE":4,"RB":2},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/bedbd7a85b9260c4086c631ade9244cd_FORMATO.png","posicao_id":2,"clube_id":283},"82792":{"apelido":"Maurício Barbieri","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/05/04/7e25588c269efbad7eeebc8cacae8c11_FORMATO.png","posicao_id":6,"clube_id":262},"83004":{"apelido":"Otero","pontuacao":1.7,"scout":{"FD":1,"FF":1,"PE":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/51441cf2ec940cdfbdef8dd0ee853621_FORMATO.png","posicao_id":4,"clube_id":282},"84761":{"apelido":"Claudinei Oliveira","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/04/27/01600179bedbd202493bb520c8123ae3_FORMATO.png","posicao_id":6,"clube_id":292},"84863":{"apelido":"Alberto Valentim","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/03/20/c6b54edc93e180bf641056650be46611_FORMATO.png","posicao_id":6,"clube_id":263},"86797":{"apelido":"Raniel","pontuacao":0.6,"scout":{"FC":4,"FF":2,"FS":2},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/074f3b8960ae6ea7711fa17be1c27cac_FORMATO.png","posicao_id":5,"clube_id":283},"87393":{"apelido":"Gabriel","pontuacao":10.5,"scout":{"FS":2,"RB":3,"SG":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/de5cc9b6be749402b257946886dea075_FORMATO.png","posicao_id":3,"clube_id":282},"87863":{"apelido":"Arrascaeta","pontuacao":1.5,"scout":{"FS":3},"foto":"https://s.glbimg.com/es/sde/f/2018/05/18/78d71d802479a25898817edac97588a9_FORMATO.png","posicao_id":4,"clube_id":283},"89898":{"apelido":"Róger Guedes","pontuacao":10.4,"scout":{"FC":1,"FF":2,"FS":2,"G":1,"PE":4,"RB":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/bb6dbd41ce03bd76bd06730bbedf0ec7_FORMATO.png","posicao_id":5,"clube_id":282},"92180":{"apelido":"Jair Ventura","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/03/21/10609de2a8557beb4ca271f2a8ae1f90_FORMATO.png","posicao_id":6,"clube_id":277},"92273":{"apelido":"Odair Hellmann","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/03/20/e106ae4a3a04464c776be27a72b98b9e_FORMATO.png","posicao_id":6,"clube_id":285},"95780":{"apelido":"Zé Ricardo","pontuacao":0,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2017/08/29/290e1b5521ef67d15a9877e4e2544c0c_FORMATO.png","posicao_id":6,"clube_id":267},"96870":{"apelido":"Emerson","pontuacao":6.6,"scout":{"CA":1,"FC":2,"FS":2,"PE":3,"RB":3,"SG":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/02/e6ac5064048c2847351bacf000cd76bd_FORMATO.png","posicao_id":2,"clube_id":282},"97653":{"apelido":"Murilo","pontuacao":3.1,"scout":{"FC":1,"FD":1,"PE":2,"RB":2},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/e153f69f7bac5d6410218a2a59787c11_FORMATO.png","posicao_id":3,"clube_id":283},"99817":{"apelido":"Bremer","pontuacao":9.1,"scout":{"FS":1,"PE":3,"RB":3,"SG":1},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/0d132ee6d2926d18582bea39d2d52979_FORMATO.png","posicao_id":3,"clube_id":282},"100898":{"apelido":"","pontuacao":0,"scout":{"FS":1},"foto":null,"posicao_id":0,"clube_id":0},"101957":{"apelido":"Thiago Larghi","pontuacao":6.32,"scout":{},"foto":"https://s.glbimg.com/es/sde/f/2018/05/07/881592a84044888fec552539c48ea86d_FORMATO.png","posicao_id":6,"clube_id":282}},"clubes":{"262":{"id":262,"nome":"Flamengo","abreviacao":"FLA","posicao":1,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-30.png"}},"263":{"id":263,"nome":"Botafogo","abreviacao":"BOT","posicao":6,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/botafogo_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/botafogo_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/botafogo_30x30.png"}},"264":{"id":264,"nome":"Corinthians","abreviacao":"COR","posicao":2,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/corinthians_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/corinthians_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/corinthians_30x30.png"}},"265":{"id":265,"nome":"Bahia","abreviacao":"BAH","posicao":13,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/bahia_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/bahia_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/bahia_30x30.png"}},"266":{"id":266,"nome":"Fluminense","abreviacao":"FLU","posicao":11,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/fluminense_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/fluminense_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/Fluminense-escudo.png"}},"267":{"id":267,"nome":"Vasco","abreviacao":"VAS","posicao":9,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2016/07/29/Vasco-65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2016/07/29/Vasco-45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2016/07/29/Vasco-30.png"}},"275":{"id":275,"nome":"Palmeiras","abreviacao":"PAL","posicao":8,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/palmeiras_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/palmeiras_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/palmeiras_30x30.png"}},"276":{"id":276,"nome":"São Paulo","abreviacao":"SAO","posicao":7,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/sao_paulo_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/sao_paulo_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/sao_paulo_30x30.png"}},"277":{"id":277,"nome":"Santos","abreviacao":"SAN","posicao":15,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/santos_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/santos_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/santos_30x30.png"}},"282":{"id":282,"nome":"Atlético-MG","abreviacao":"ATL","posicao":4,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2017/11/23/Atletico-Mineiro-escudo65px.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2017/11/23/Atletico-Mineiro-escudo45px.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2017/11/23/Atletico-Mineiro-escudo30px.png"}},"283":{"id":283,"nome":"Cruzeiro","abreviacao":"CRU","posicao":18,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/04/29/cruzeiro_65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/04/29/cruzeiro_45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/04/29/cruzeiro_30.png"}},"284":{"id":284,"nome":"Grêmio","abreviacao":"GRE","posicao":12,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/gremio_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/gremio_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/gremio_30x30.png"}},"285":{"id":285,"nome":"Internacional","abreviacao":"INT","posicao":10,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2016/05/03/inter65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2016/05/03/inter45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2016/05/03/inter30.png"}},"287":{"id":287,"nome":"Vitória","abreviacao":"VIT","posicao":17,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/vitoria_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/vitoria_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/vitoria_30x30.png"}},"289":{"id":289,"nome":"Paraná","abreviacao":"PAR","posicao":20,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/13/parana_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2014/04/13/parana_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2014/04/13/parana_30x30.png"}},"292":{"id":292,"nome":"Sport","abreviacao":"SPO","posicao":14,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/sport65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/sport45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/07/21/sport30.png"}},"293":{"id":293,"nome":"Atlético-PR","abreviacao":"ATL","posicao":5,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/06/24/atletico-pr_2015_65.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/06/24/atletico-pr_2015_45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/06/24/atletico-pr_2015_30.png"}},"315":{"id":315,"nome":"Chapecoense","abreviacao":"CHA","posicao":16,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2015/08/03/Escudo-Chape-165.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2015/08/03/Escudo-Chape-145.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2015/08/03/Escudo-Chape-130.png"}},"327":{"id":327,"nome":"América-MG","abreviacao":"AME","posicao":3,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/organizacoes/2018/01/24/AmericaMG-65.png","45x45":"https://s.glbimg.com/es/sde/f/organizacoes/2018/01/24/AmericaMG-45.png","30x30":"https://s.glbimg.com/es/sde/f/organizacoes/2018/01/24/AmericaMG-30.png"}},"354":{"id":354,"nome":"Ceará","abreviacao":"CEA","posicao":19,"escudos":{"60x60":"https://s.glbimg.com/es/sde/f/equipes/2014/04/14/ceara_60x60.png","45x45":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/ceara_45x45.png","30x30":"https://s.glbimg.com/es/sde/f/equipes/2013/12/16/ceara_30x30.png"}}},"posicoes":{"1":{"id":1,"nome":"Goleiro","abreviacao":"gol"},"2":{"id":2,"nome":"Lateral","abreviacao":"lat"},"3":{"id":3,"nome":"Zagueiro","abreviacao":"zag"},"4":{"id":4,"nome":"Meia","abreviacao":"mei"},"5":{"id":5,"nome":"Atacante","abreviacao":"ata"},"6":{"id":6,"nome":"Técnico","abreviacao":"tec"}},"total_atletas":47}'))
        console.log("jogadores ok: ", this.jogadores);
    };


    setJogadores(jogadores: Jogadores) {
        this.jogadores = jogadores;
    };

    getJogadores() { return this.jogadores };

    getJogador(jogador_id: string) {
        return this.jogadores.atletas[jogador_id];
    };

    getParcialJogador(jogador_id: string) {
        if (!this.jogadores.atletas[jogador_id]) {
            return 0;
        } else {
            return this.jogadores.atletas[jogador_id].pontuacao;
        }
    };

    jogadoresLoaded() {
        return this.getJogadores() ? true : false;
    }
}