namespace Entidades 
{
    export class Producto
    {
        public nombre : string;
        public origen : string;

        public constructor(nombre:string, origen:string)
        {
            this.nombre = nombre;
            this.origen = origen;
        }

        public ToString() : string
        {
            return `"nombre":"${this.nombre}","origen":"${this.origen}"`;
        }

        public ToJSON() : string 
        {
            return `{${this.ToString()}}`;
        }
    }
}