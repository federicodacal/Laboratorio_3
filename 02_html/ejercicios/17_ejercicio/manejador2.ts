namespace Manejador2 
{
    export function MostrarDatos() : void 
    {
        let checkboxes = document.getElementsByTagName("input");

        let peliculas = new Array();

        for(let i = 0; i < checkboxes.length; i++)
        {
            if(checkboxes[i].type == "checkbox")
            {
                if(checkboxes[i].checked)
                {
                    peliculas.push(checkboxes[i].value);
                }
            }
        }

        console.clear();
        peliculas.forEach(peli => {
            console.log(peli);
        });
    }
}