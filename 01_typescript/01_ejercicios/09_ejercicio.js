"use strict";
console.log(OperacionNumero(0));
console.log(OperacionNumero(3));
console.log(OperacionNumero(4));
console.log(OperacionNumero(-2));
console.log(OperacionNumero(-3));
function OperacionNumero(numero) {
    let resultado;
    if (numero > 0) {
        resultado = Factorial(numero);
    }
    else if (numero < 0) {
        resultado = Cubo(numero);
    }
    else {
        resultado = numero;
    }
    return resultado;
}
function Factorial(numero) {
    if (numero < 0) {
        numero = -numero;
    }
    if (numero == 0) {
        return 1;
    }
    else {
        return numero * Factorial(numero - 1);
    }
}
function Cubo(numero) {
    return numero * numero * numero;
}
//# sourceMappingURL=09_ejercicio.js.map