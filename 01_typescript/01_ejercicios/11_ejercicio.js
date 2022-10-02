"use strict";
console.log(EsPolindromo("La ruta nos aporto otro paso natural"));
console.log(EsPolindromo("Hola Mundo"));
console.log(EsPolindromo("Anna"));
function EsPolindromo(cadena) {
    let rta = false;
    if (cadena != null) {
        cadena = cadena.trim().toLowerCase().replace(/\s/g, "");
        let cadenaInvertida = cadena.split("").reverse().join("");
        console.log(cadena);
        console.log(cadenaInvertida);
        if (cadena == cadenaInvertida) {
            rta = true;
        }
    }
    return rta;
}
//# sourceMappingURL=11_ejercicio.js.map