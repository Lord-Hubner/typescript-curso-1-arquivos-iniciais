export class NegociacoesView {
    constructor(template) {
        this.element = document.querySelector(template);
    }
    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </tr>
            </thead>
            <tbody>
            ${model.listar().map(negociacao => {
            return `<tr>
                            <td>${new Intl.DateTimeFormat().format(negociacao.data)}</td>
                            <td>${negociacao.quantidade}</td>
                            <td>${negociacao.valor}</td>
                        </tr>                     
                        `;
        }).join('')}
            </tbody>
        `;
    }
    update(model) {
        this.element.innerHTML = this.template(model);
    }
}
