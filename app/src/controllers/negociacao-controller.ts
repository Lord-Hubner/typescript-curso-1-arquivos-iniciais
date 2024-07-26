import { Negociacoes } from "../models/Negociacoes.js";
import { Negociacao } from "../models/Negociacao.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { MensagemView } from "../views/mensagem-view.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-execução.js";
import { inspect } from "../decorators/inspect.js";
import { domInjector } from "../decorators/domInjector.js";

export class NegociacaoController{
    @domInjector("#data")
    private inputData: HTMLInputElement;
    @domInjector("#quantidade")
    private inputQuantidade: HTMLInputElement;
    @domInjector("#valor")
    private inputValor: HTMLInputElement;
    private negociacoes: Negociacoes = new Negociacoes;
    private negociacoesView = new NegociacoesView("#negociacoesView", true);
    private mensagemView = new MensagemView("#mensagemView", true);

    constructor(){
        this.negociacoesView.update(this.negociacoes);
    }

    @logarTempoDeExecucao(true)
    @inspect
    public adicionar(): void{      
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value)
        if(this.ehDiaUtil(negociacao.data))
        {
            this.negociacoes.adicionar(negociacao);
            console.log(this.negociacoes.listar());  
            this.atualizaView();   
            this.limpaForm();
        }
        else{
            this.mensagemView.update('Negociações só são permitidas em dias da semana!');
        }

        
    }

    importaDados(): void{
        fetch("http://localhost:8080/dados")
        .then(res => res.json())
        .then((dados: any[]) => {         
            let data = dados.map(dado => {
                return new Negociacao(
                new Date(),
                dado.vezes,
                dado.montante
                )
            })

            for(let negociacao of data){
                this.negociacoes.adicionar(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        })
        // .then(a => 
        //     {
        //         for(let negociacao of a){
        //             this.negociacoes.adicionar(negociacao);
        //         }
                
        //     });
        
        
    }

    private criaNegociacao(): Negociacao{
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);

        return new Negociacao(
            date,
            quantidade,
            valor
        );
    }

    private limpaForm(): void{
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }

    private atualizaView(): void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('negociação adicionada com sucesso!');
    }

    private ehDiaUtil(data: Date){
        const diaDaSemana = data.getDay()

        return diaDaSemana > DiasDaSemana.DOMINGO
               && diaDaSemana < DiasDaSemana.SABADO
    }

    
}