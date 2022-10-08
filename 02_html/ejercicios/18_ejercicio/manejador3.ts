namespace Manejador3
{
    export function MostrarDatos()
    {
        let nombre : string = (<HTMLInputElement>document.getElementById("nombre")).value;
        
        let radio = document.getElementsByTagName("input");

        let opinion : string = ""; 

        for(let i = 0; i < radio.length; i++)
        {
            if(radio[i].type == "radio")
            {
                if(radio[i].checked)
                {
                    opinion = radio[i].value;
                    break;
                }
            }
        }

        console.clear();
        console.log(`${nombre} envió su opinión: ${opinion}`);
    }
}