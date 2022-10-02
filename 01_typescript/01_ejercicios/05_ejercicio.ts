/*
5. Guardar su nombre y apellido en dos variables distintas. Dichas variables serán pasadas
como parámetro de la función MostrarNombreApellido, que mostrará el apellido en
mayúscula y el nombre solo con la primera letra en mayúsculas y el resto en minúsculas.
El apellido y el nombre se mostrarán separados por una coma (,).
Nota: Utilizar console.log()
*/

let nombre1:string = "Juan";
let apellido1:string = "Perez";

let nombre2:string = "marta";
let apellido2:string = "gomez";

let nombre3:string = "aNa";
let apellido3:string = "FERNANDEZ";

MostrarNombreApellido(nombre1, apellido1);
MostrarNombreApellido(nombre2, apellido2);
MostrarNombreApellido(nombre3, apellido3);

var sinApellido:string;
//MostrarNombreApellido(nombre3, sinApellido);

function MostrarNombreApellido(nombre:string, apellido:string):void
{
    if(nombre != null && apellido != null)
    {
        apellido = apellido.toUpperCase();
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();

        console.log(`${apellido}, ${nombre}`);
    }
}