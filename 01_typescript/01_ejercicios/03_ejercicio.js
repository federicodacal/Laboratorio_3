"use strict";
Mostrar(3);
Mostrar(2, "Hola");
function Mostrar(numero, cadena) {
    if (cadena != null) {
        for (let i = 0; i < numero; i++) {
            console.log(cadena);
        }
    }
    else {
        console.log(-numero);
    }
}
//# sourceMappingURL=03_ejercicio.js.map