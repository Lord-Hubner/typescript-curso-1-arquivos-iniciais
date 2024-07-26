export class Negociacao {
    constructor(data, quantidade, valor) {
        this._data = data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    get volume() {
        return this.valor * this.quantidade;
    }
    get data() {
        return new Date(this._data.getTime());
    }
    static criaDe(dataString, quantidadeString, valorString) {
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }
}
