export function domInjector(seletor: string){
    return function(target: any, propertyKey: string){

        let elemento: HTMLElement;

        const getter = function(){
            if(!elemento){
                elemento = <HTMLElement>document.querySelector(seletor);
                console.log(`buscando elemnento do DOM com o selector ${seletor} para injetar em ${propertyKey}`);
            }          

            return elemento;
        }

        Object.defineProperty(target, 
            propertyKey, 
            {get: getter});
    }
}