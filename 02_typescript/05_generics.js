"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _02_herencia_1 = require("./02_herencia");
function Generica(param) {
    console.log("El tipo es: " + typeof (param));
    return param;
}
let retStrring = Generica("hola");
console.log(retStrring);
retStrring = Generica("mundo");
console.log(retStrring);
console.log("---------------------------");
let autito = new _02_herencia_1.Auto("ROJO", 125000, "FERRARI");
let retAuto = Generica(autito);
console.log(retAuto.Mostrar());
retAuto = Generica(new _02_herencia_1.Auto("AMARILLO", 200000, "SEAT"));
console.log(retAuto.Mostrar());
console.log("---------------------------");
class ClaseGenerica {
    constructor(uno, dos) {
        this.paramUno = uno;
        this.paramDos = dos;
    }
    Mostrar() {
        console.log(this.paramUno + " - " + this.paramDos);
    }
}
let obj = new ClaseGenerica("cadena", 10);
let obj2 = new ClaseGenerica(true, "otra cadena");
obj.Mostrar();
obj2.Mostrar();
console.log("---------------------------");
//# sourceMappingURL=05_generics.js.map