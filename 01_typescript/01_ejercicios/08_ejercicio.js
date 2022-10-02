"use strict";
console.log(CalcularFactorial(1));
console.log(CalcularFactorial(2));
console.log(CalcularFactorial(3));
console.log(CalcularFactorial(5));
console.log(CalcularFactorial(-5));
function CalcularFactorial(numero) {
    if (numero < 0) {
        numero = -numero;
    }
    if (numero == 0) {
        return 1;
    }
    else {
        return numero * CalcularFactorial(numero - 1);
    }
}
//# sourceMappingURL=08_ejercicio.js.map