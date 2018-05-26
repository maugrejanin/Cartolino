import { Injectable } from "@angular/core";

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

    getScout(atletaScout) {
        return new Promise(resolve => {
            var treatedScout = [];
            let scout;
            let scoutSize = Object.keys(atletaScout);
            for (let i in atletaScout) {
                scout = {
                    acao: (atletaScout[i] == 1 ? this.scout[i].acao : this.scout[i].acao_plural),
                    quantidade: atletaScout[i],
                    pontos: (this.scout[i].pontos * atletaScout[i])
                };
                treatedScout.push(scout);
                treatedScout.length == scoutSize.length?resolve(treatedScout):'';
            }
        })

    }
}