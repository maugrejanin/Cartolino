import { Injectable } from "@angular/core";
import { Atleta } from "../models/jogadoresControll";

@Injectable()
export class Scout {
    scout = {
        RB: {
            acao: 'Roubada de bola',
            acao_plural: 'Roubadas de bola',
            pontos: 1.7
        },
        DD: {
            acao: "Defesa difícil",
            acao_plural: "Defesas difíceis",
            pontos: 3.0
        },
        GS: {
            acao: "Gol sofrido",
            acao_plural: "Gols sofridos",
            pontos: -2.0
        },
        FC: {
            acao: "Falta cometida",
            acao_plural: "Faltas cometidas",
            pontos: -0.5
        },
        GC: {
            acao: "Gol contra",
            acao_plural: "Gols contra",
            pontos: -6.0
        },
        CA: {
            acao: "Cartão amarelo",
            acao_plural: "Cartões amarelos",
            pontos: -2.0
        },
        CV: {
            acao: "Cartão vermelho",
            acao_plural: "Cartões vermelhos",
            pontos: -5.0
        },
        FS: {
            acao: "Falta sofrida",
            acao_plural: "Faltas sofridas",
            pontos: 0.5
        },
        PE: {
            acao: "Passe errado",
            acao_plural: "Passes errados",
            pontos: -0.3
        },
        FT: {
            acao: "Finalização na trave",
            acao_plural: "Finalizações na trave",
            pontos: 3.5
        },
        FD: {
            acao: "Finalização defendida",
            acao_plural: "Finalizações defendidas",
            pontos: 1.0
        },
        FF: {
            acao: "Finalização para fora",
            acao_plural: "Finalizações para fora",
            pontos: 0.7
        },
        G: {
            acao: "Gol",
            acao_plural: "Gols",
            pontos: 8.0
        },
        I: {
            acao: "Impedimento",
            acao_plural: "Impedimentos",
            pontos: -0.5
        },
        PP: {
            acao: "Penalti perdido",
            acao_plural: "Penaltis perdidos",
            pontos: -3.5
        },
        A: {
            acao: "Assistência",
            acao_plural: "Assistências",
            pontos: 5.0
        },
        SG: {
            acao: "Jogo sem sofrer gol",
            pontos: 5.0
        },
        DP: {
            acao: "Defesa de penalti",
            acao_plural: "Defesas de penalti",
            pontos: 7.0
        }
    };

    getScout(atletas:Atleta[]) {
        return new Promise(resolve => {
            let atletasCount = Object.keys(atletas);
            for (let i in atletas) {
                if (atletas[i].scout != null && Object.keys(atletas[i].scout).length && atletas[i].posicao_id != 6) {
                    if (typeof atletas[i].scout[0] == 'undefined') {
                        let atletaScout = [];
                        atletas[i].scoutAbreviado = [];
                        let scout;                        
                        for (let x in atletas[i].scout) {
                            scout = {
                                acao: (atletas[i].scout[x] == 1 ? this.scout[x].acao : this.scout[x].acao_plural),
                                quantidade: atletas[i].scout[x],
                                pontos: (this.scout[x].pontos * atletas[i].scout[x]).toFixed(2),
                                abreviacao: x
                            };                            
                            atletaScout.push(scout);
                            atletaScout.length == Object.keys(atletas[i].scout).length ? (atletas[i].scout = atletaScout) : '';
                            atletas[i].scoutAbreviado.push({ acao: scout.quantidade + scout.abreviacao, color: scout.pontos < 0 ? 'red' : 'green' });
                        }
                    }
                } else {
                    atletas[i].scout = false;
                }
            }
            resolve(atletas);
        })
    }
}