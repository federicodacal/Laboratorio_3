namespace Manejador5 
{
    export function ValidarDatos() : void
    {
        let mensaje : string = "";

        let camposIncompletos : boolean = true;
        let formatoSexo : boolean = false;

        let dni : number = parseInt((<HTMLInputElement>document.getElementById("dni")).value);
        let nombre : string = (<HTMLInputElement>document.getElementById("nombre")).value;
        let apellido : string = (<HTMLInputElement>document.getElementById("apellido")).value;
        let sexo : string = (<HTMLInputElement>document.querySelector('input[name="sexo"]:checked')).value;
        
        if(isNaN(dni) || nombre == "" || apellido == "" || sexo == "")
        {
            mensaje = "Campos incompletos. ";
        }
        else 
        {
            camposIncompletos = false;
        }

        if(sexo != 'm' && sexo != 'f' && sexo != "nb")
        {
            mensaje += "Formato de campo 'sexo' no es valido";
        }
        else 
        {
            formatoSexo = true;
        }

        if(!camposIncompletos && formatoSexo)
        {
            mensaje = "Validado!";
        }

        console.log(mensaje);
    }
}