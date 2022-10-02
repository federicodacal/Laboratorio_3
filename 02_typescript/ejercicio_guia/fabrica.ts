/// <reference path="./empleado.ts" />

namespace Entidades 
{
    export class Fabrica
    {
        protected razonSocial : string;
        protected empleados : Empleado[];
    
        public constructor(razonSocial : string)
        {
            this.razonSocial = razonSocial;
            this.empleados = new Array<Empleado>;
        }
    
        public AgregarEmpleado(emp : Empleado) : boolean 
        {
            let rta = false;
            if(emp != null && this.IndiceEmpleado(emp.Dni) == -1)
            {
                this.empleados.push(emp);
                rta = true;
            }
            return rta;
        }
    
        public IndiceEmpleado(dni : number) : number
        {
            let index = -1;
            for(let i=0; i < this.empleados.length; i++)
            {
                if(dni === this.empleados[i].Dni)
                {
                    index = i;
                    break;
                }
            }
            return index;
        }
    
        public EliminarEmpleado(emp : Empleado) : boolean
        {
            let rta = false;
            if(emp != null)
            {
                let index = this.IndiceEmpleado(emp.Dni);
                if(index != -1)
                {
                    this.empleados.splice(index, 1);
                    rta = true;
                }           
            }
            return rta;
        }
    
        public CalcularSueldos() : number
        {
            let totalSueldos = 0;
            this.empleados.forEach(emp => {
                totalSueldos += emp.Sueldo;
            });
            return totalSueldos;
        }
    
        public ToString() : string 
        {
            let salida = `${this.razonSocial} - Cantidad Empleados: ${this.empleados.length} - Salarios: $${this.CalcularSueldos()}\n`;
            this.empleados.forEach(emp => {
                salida += emp.ToString();
                salida += "\n";
            });
            return salida;
        }
        
    }
}

