/*
3.
Realizar una función que reciba un parámetro requerido de tipo numérico y otro opcional
de tipo cadena. Si el segundo parámetro es recibido, se mostrará tantas veces por
consola, como lo indique el primer parámetro. En caso de no recibir el segundo
parámetro, se mostrará el valor inverso del primer parámetro.
*/

Mostrar(3);
Mostrar(2, "Hola");

function Mostrar(numero:number, cadena?:string):void 
{
    if(cadena != null)
    {
        for (let i = 0; i < numero; i++) 
        {
            console.log(cadena);
        }
    }
    else
    {
        console.log(-numero);
    }
}