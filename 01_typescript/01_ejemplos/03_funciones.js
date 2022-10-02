"use strict";
function Sumar(a, b) {
    return a + b;
}
function Saludar(nombre) {
    return "Hola " + nombre;
}
function Despedir() {
    console.log("Chau!");
}
let miFuncion = Sumar;
console.log(miFuncion(5, 6));
let miVariable = function () {
    console.log("hola");
};
miVariable();
let varDespedir = Despedir();
let miOtraFuncion = Saludar;
console.log(miOtraFuncion("Juan"));
function NombreApellido(nombre, apellido) {
    if (apellido) {
        return nombre + ' ' + apellido;
    }
    else {
        return nombre;
    }
}
let nombre = NombreApellido("Juan", "Perez");
let otroNombre = NombreApellido("Juan");
console.log(nombre);
console.log(otroNombre);
function GenerarNombreCompleto(nombre, apellido, capitalizado = false) {
    var cadena;
    if (capitalizado)
        cadena = Capitalizar(nombre) + " " + Capitalizar(apellido);
    else
        cadena = nombre + ' ' + apellido;
    return cadena;
}
function Capitalizar(cadena) {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
}
console.log(GenerarNombreCompleto("tony", "stark", true));
function CompletarNombreApellido(nombre, ...losDemasParametros) {
    return nombre + " " + losDemasParametros.join(" ");
}
let superman = CompletarNombreApellido("Clark", "Joseph", "Kent");
let ironman = CompletarNombreApellido("Anthony", "Edward", "Tony", "Stark");
console.log(superman);
console.log(ironman);
function Sobrecargar(a) {
    console.log(typeof (a));
}
Sobrecargar("cadena");
Sobrecargar(123);
Sobrecargar(true);
//# sourceMappingURL=03_funciones.js.map