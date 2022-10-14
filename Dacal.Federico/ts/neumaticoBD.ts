namespace Entidades 
{
    export class NeumaticoBD extends Neumatico 
    {
        public id : number;
        public pathFoto : string;

        public constructor(marca:string="", medidas:string="", precio:number=0, id:number=0, pathFoto:string="")
        {
            super(marca,medidas,precio);
            this.id = id;
            this.pathFoto = pathFoto;
        }

        public ToJson() : string 
        {
            return `{${this.ToString()},"id":${this.id},"pathFoto":"${this.pathFoto}"}`;
        }
    }
}