"use strict";
mostrarNumerosPrimos();
function mostrarNumerosPrimos() {
    let cont = 0;
    for (let i = 1; cont < 20; i++) {
        if (contarDivisores(i) == 2) {
            cont++;
            console.log(`${cont}: ${i}`);
        }
    }
}
function contarDivisores(numero) {
    let contDivisores = 0;
    for (let i = 0; i <= numero; i++) {
        if (numero % i == 0) {
            contDivisores++;
        }
    }
    return contDivisores;
}
//# sourceMappingURL=07_ejercicio.js.map