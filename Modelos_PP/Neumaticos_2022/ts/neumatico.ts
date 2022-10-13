namespace Entidades 
{
    export class Neumatico 
    {
        public marca : string;
        public medidas : string;
        public precio : number;

        public constructor(marca:string, medidas:string, precio:number)
        {
            this.marca = marca;
            this.medidas = medidas;
            this.precio = precio;
        }

        public ToString() : string 
        {
            return `"marca":"${this.marca}","medidas":"${this.medidas}","precio":${this.precio}`;
        }

        public ToJson() : string 
        {
            return `{${this.ToString()}}`;
        }
    }
}