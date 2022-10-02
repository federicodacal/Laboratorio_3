"use strict";
var vec1 = [1, true, "hola"];
var vec2 = [1, true, "hola"];
var numeros = [1, 2, 3];
var otrosNumeros = [1, 2, 3];
var eliminado = numeros.pop();
numeros.push(5);
console.log(numeros);
var Ejemplo;
(function (Ejemplo) {
    Ejemplo[Ejemplo["Basico"] = 0] = "Basico";
    Ejemplo[Ejemplo["Intermedio"] = 1] = "Intermedio";
    Ejemplo[Ejemplo["Avanzado"] = 2] = "Avanzado";
})(Ejemplo || (Ejemplo = {}));
console.log(Ejemplo.Basico);
var e = Ejemplo.Intermedio;
console.log(e);
var foo = 123;
if (true) {
    var foo = 456;
}
console.log(foo);
let foo2 = 123;
if (true) {
    let foo2 = 456;
}
console.log(foo2);
//# sourceMappingURL=02_datos.js.map