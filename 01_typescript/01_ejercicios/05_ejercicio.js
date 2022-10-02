"use strict";
let nombre1 = "Juan";
let apellido1 = "Perez";
let nombre2 = "marta";
let apellido2 = "gomez";
let nombre3 = "aNa";
let apellido3 = "FERNANDEZ";
MostrarNombreApellido(nombre1, apellido1);
MostrarNombreApellido(nombre2, apellido2);
MostrarNombreApellido(nombre3, apellido3);
var sinApellido;
function MostrarNombreApellido(nombre, apellido) {
    if (nombre != null && apellido != null) {
        apellido = apellido.toUpperCase();
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
        console.log(`${apellido}, ${nombre}`);
    }
}
//# sourceMappingURL=05_ejercicio.js.map