export abstract class View<T>{
    protected elemento: HTMLElement
    protected escapar = false;

    constructor(seletor: string, escapar?: boolean){
        const element = document.querySelector(seletor);
        if(!element)
            throw Error(`Seletor ${seletor} não encontrado no DOM.`)
        this.elemento = element as HTMLElement;
        if(escapar)
            this.escapar = escapar;
    }

    protected abstract template(model: T): string;

    update(model: T): void{
        let template = this.template(model);
        if(this.escapar){
            template = template.replace('/<script>[\s\S]*?<script>/', '')
        }
    }

}