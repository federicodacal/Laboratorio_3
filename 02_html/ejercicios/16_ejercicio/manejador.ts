namespace Manejador
{
    export function MostrarDatos() : void 
    {
        let nombre : string = (<HTMLInputElement>document.getElementById("nombre")).value;
        let dni : number = parseInt((<HTMLInputElement>document.getElementById("dni")).value);
        let cv : string = (<HTMLInputElement>document.getElementById("curriculum")).value;

        let respuesta = `Nombre: ${nombre} \nDNI: ${dni}\nCurriculum Vitae:\n${cv}`;

        console.log(respuesta);
    }
}