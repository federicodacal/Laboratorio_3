"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _01_clases_1 = require("./01_clases");
let a1 = new _01_clases_1.Auto("ROJO", 120500);
console.log(a1.color);
console.log(a1.Precio);
a1.SetColor("AZUL");
console.log(a1.GetColor());
a1.Precio = 666;
console.log(a1.Precio);
_01_clases_1.Auto.MetodoEstatico();
console.log("fin...!!");
//# sourceMappingURL=06_main.js.map