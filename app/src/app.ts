import { NegociacaoController } from "./controllers/negociacao-controller.js";

const controller = new NegociacaoController
const form = document.querySelector('.form');

if(!form){
    throw Error("Não foi possível obter o formulário!");
}

form.addEventListener('submit', (event) => 
    {
        event.preventDefault()
        controller.adicionar()
    })

const botaoImportar = document.querySelector("#botao-importa");
if(botaoImportar){
    botaoImportar.addEventListener("click", () => {
        controller.importaDados();
    })
}
else{
    throw Error("Botão importa não foi encontrado");
}