export class Negociacao {
    private _data: Date;
    public readonly quantidade: number;
    public readonly valor: number;

    constructor(data: Date, quantidade: number, valor: number)
    {
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

    public static criaDe(dataString: string, quantidadeString: string, valorString: string): Negociacao{
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);

        return new Negociacao(
            date,
            quantidade,
            valor
        );
    }
}