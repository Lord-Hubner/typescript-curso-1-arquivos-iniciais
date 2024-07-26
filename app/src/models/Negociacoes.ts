import { Negociacao } from "./Negociacao.js";

export class Negociacoes{
    private readonly negociacoes: Array<Negociacao> = []

    adicionar(negociacao: Negociacao){
        this.negociacoes.push(negociacao);
    }

    listar(): ReadonlyArray<Negociacao>{
        return this.negociacoes;
    }
}

