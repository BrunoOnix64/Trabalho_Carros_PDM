export class Carro{
    constructor(){

    }

    public id: number;
    public marca_modelo: string;
    public combustivel: string;
    public municipio: string;

    toString(){
        return this.id + '' + this.marca_modelo + '' + this.combustivel + '' + this.municipio;
    }
}