/*
10. Definir una función que muestre información sobre una cadena de texto que se le pasa
como argumento. A partir de la cadena que se le pasa, la función determina si esa cadena
está formada sólo por mayúsculas, sólo por minúsculas o por una mezcla de ambas.
*/

AnalizarCadena("2022");
AnalizarCadena("Hola Mundo!");
AnalizarCadena("!!!");
AnalizarCadena("typescript");
AnalizarCadena("JAVASCRIPT");

function AnalizarCadena(cadena : string) : void   
{
    if(cadena != null)
    {
        cadena = cadena.trim();

        if(TieneMayusculas(cadena) && TieneMinusculas(cadena))
        {
            console.log("La cadena está formada por una mezcla de mayúsculas y minúsculas");
        }
        else if(TieneMayusculas(cadena) && !TieneMinusculas(cadena))
        {
            console.log("La cadena está formada sólo por mayúsculas");
        }
        else if(!TieneMayusculas(cadena) && TieneMinusculas(cadena))
        {
            console.log("La cadena está formada sólo por minúsculas");
        }
        else
        {
            console.log("La cadena no tiene mayúsculas ó minúsculas");
        }
    }    
} 

function TieneMayusculas(cadena : string) : boolean
{
    let rta = false;
    for(let i = 0; i < cadena.length; i++)
    {
        if(cadena.charCodeAt(i) >= 65 && cadena.charCodeAt(i) <= 90)
        {
            rta = true;
            break;
        }
    }
    return rta;
}

function TieneMinusculas(cadena : string) : boolean
{
    let rta = false;
    for(let i = 0; i < cadena.length; i++)
    {
        if(cadena.charCodeAt(i) >= 97 && cadena.charCodeAt(i) <= 122)
        {
            rta = true;
            break;
        }
    }
    return rta;
}