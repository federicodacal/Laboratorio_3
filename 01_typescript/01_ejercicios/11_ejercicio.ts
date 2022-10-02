/*
11. Definir una función que determine si la cadena de texto que se le pasa como parámetro
es un palíndromo, es decir, si se lee de la misma forma desde la izquierda y desde la
derecha. Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural".
*/

console.log(EsPolindromo("La ruta nos aporto otro paso natural"));
console.log(EsPolindromo("Hola Mundo"));
console.log(EsPolindromo("Anna"));

function EsPolindromo(cadena : string) : boolean
{
    let rta = false;
    if(cadena != null)
    {
        cadena = cadena.trim().toLowerCase().replace(/\s/g, "");

        let cadenaInvertida = cadena.split("").reverse().join("");

        console.log(cadena);
        console.log(cadenaInvertida);
        if(cadena == cadenaInvertida)
        {
            rta = true;
        }
    }
    return rta;
}