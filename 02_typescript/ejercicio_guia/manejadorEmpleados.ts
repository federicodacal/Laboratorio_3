/// <reference path="./persona.ts" />
/// <reference path="./empleado.ts" />
/// <reference path="./fabrica.ts" />

namespace ManejadorEmpleados 
{
    let fabrica = new Entidades.Fabrica("Coca-Cola");

    export function RealizarAccion():void{
        let accion : string = (<HTMLSelectElement>document.getElementById("accion")).value;

        let nombre : string = (<HTMLInputElement>document.getElementById("nombre")).value;
        let apellido : string = (<HTMLInputElement>document.getElementById("apellido")).value;
        let dni : number = parseInt((<HTMLInputElement>document.getElementById("dni")).value);
        let sexo : string = (<HTMLSelectElement>document.getElementById("sexo")).value;
        let sueldo : number = parseFloat((<HTMLInputElement>document.getElementById("sueldo")).value);
        let legajo : number = parseInt((<HTMLInputElement>document.getElementById("legajo")).value);

        let emp = new Entidades.Empleado(nombre, apellido, dni, sexo, legajo, sueldo);

        if(accion == "agregar")
        {
            AgregarEmpleado(emp);
        }
        if(accion == "eliminar")
        {
            EliminarEmpleado(emp);
        }
        if(accion == "mostrar")
        {
            console.log(fabrica.ToString());
        }
    }

    function AgregarEmpleado(emp : Entidades.Empleado):void{

        if(fabrica.AgregarEmpleado(emp))
        {
            console.log(emp.ToString());
            alert(emp.ToString());
        }
        else 
        {
            console.log("No se agregó");
        }

    }

    function EliminarEmpleado(emp : Entidades.Empleado){
        let dni : number = parseInt((<HTMLInputElement>document.getElementById("dni")).value);

        if(fabrica.EliminarEmpleado(emp))
        {
            console.log("Eliminado");
        }
        else 
        {
            console.log("No se eliminó");
        }
    }
}
