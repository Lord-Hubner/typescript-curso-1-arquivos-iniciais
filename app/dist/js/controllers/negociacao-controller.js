var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Negociacoes } from "../models/Negociacoes.js";
import { Negociacao } from "../models/Negociacao.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { MensagemView } from "../views/mensagem-view.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-execução.js";
import { inspect } from "../decorators/inspect.js";
import { domInjector } from "../decorators/domInjector.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes;
        this.negociacoesView = new NegociacoesView("#negociacoesView", true);
        this.mensagemView = new MensagemView("#mensagemView", true);
        this.negociacoesView.update(this.negociacoes);
    }
    adicionar() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (this.ehDiaUtil(negociacao.data)) {
            this.negociacoes.adicionar(negociacao);
            console.log(this.negociacoes.listar());
            this.atualizaView();
            this.limpaForm();
        }
        else {
            this.mensagemView.update('Negociações só são permitidas em dias da semana!');
        }
    }
    importaDados() {
        fetch("http://localhost:8080/dados")
            .then(res => res.json())
            .then((dados) => {
            let data = dados.map(dado => {
                return new Negociacao(new Date(), dado.vezes, dado.montante);
            });
            for (let negociacao of data) {
                this.negociacoes.adicionar(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        });
    }
    criaNegociacao() {
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }
    limpaForm() {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('negociação adicionada com sucesso!');
    }
    ehDiaUtil(data) {
        const diaDaSemana = data.getDay();
        return diaDaSemana > DiasDaSemana.DOMINGO
            && diaDaSemana < DiasDaSemana.SABADO;
    }
}
__decorate([
    domInjector("#data"),
    __metadata("design:type", HTMLInputElement)
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInjector("#quantidade"),
    __metadata("design:type", HTMLInputElement)
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInjector("#valor"),
    __metadata("design:type", HTMLInputElement)
], NegociacaoController.prototype, "inputValor", void 0);
__decorate([
    logarTempoDeExecucao(true),
    inspect,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NegociacaoController.prototype, "adicionar", null);
