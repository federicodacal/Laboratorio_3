"use strict";
AnalizarCadena("2022");
AnalizarCadena("Hola Mundo!");
AnalizarCadena("!!!");
AnalizarCadena("typescript");
AnalizarCadena("JAVASCRIPT");
function AnalizarCadena(cadena) {
    if (cadena != null) {
        cadena = cadena.trim();
        if (TieneMayusculas(cadena) && TieneMinusculas(cadena)) {
            console.log("La cadena está formada por una mezcla de mayúsculas y minúsculas");
        }
        else if (TieneMayusculas(cadena) && !TieneMinusculas(cadena)) {
            console.log("La cadena está formada sólo por mayúsculas");
        }
        else if (!TieneMayusculas(cadena) && TieneMinusculas(cadena)) {
            console.log("La cadena está formada sólo por minúsculas");
        }
        else {
            console.log("La cadena no tiene mayúsculas ó minúsculas");
        }
    }
}
function TieneMayusculas(cadena) {
    let rta = false;
    for (let i = 0; i < cadena.length; i++) {
        if (cadena.charCodeAt(i) >= 65 && cadena.charCodeAt(i) <= 90) {
            rta = true;
            break;
        }
    }
    return rta;
}
function TieneMinusculas(cadena) {
    let rta = false;
    for (let i = 0; i < cadena.length; i++) {
        if (cadena.charCodeAt(i) >= 97 && cadena.charCodeAt(i) <= 122) {
            rta = true;
            break;
        }
    }
    return rta;
}
//# sourceMappingURL=10_ejercicio.js.map