namespace Entidades
{
    export class ProductoEnvasado extends Producto
    {
        public id : number;
        public codigoBarra : string;
        public precio : number;
        public pathFoto : string;

        public constructor(nombre:string="", origen:string="",codigoBarra:string="",precio:number=0,pathFoto:string="", id:number=0)
        {
            super(nombre,origen);
            this.codigoBarra = codigoBarra;
            this.precio = precio;;
            this.pathFoto = pathFoto;
            this.id = id;
        }

        public ToJSON() : string 
        {
            return `{${super.ToString},"codigoBarra":"${this.codigoBarra}","precio":${this.precio},"pathFoto":"${this.pathFoto}","id":${this.id}}`;
        }
    }
}