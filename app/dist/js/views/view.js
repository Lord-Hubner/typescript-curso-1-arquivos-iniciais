export class View {
    constructor(seletor, escapar) {
        this.escapar = false;
        const element = document.querySelector(seletor);
        if (!element)
            throw Error(`Seletor ${seletor} não encontrado no DOM.`);
        this.elemento = element;
        if (escapar)
            this.escapar = escapar;
    }
    update(model) {
        let template = this.template(model);
        if (this.escapar) {
            template = template.replace('/<script>[\s\S]*?<script>/', '');
        }
    }
}
