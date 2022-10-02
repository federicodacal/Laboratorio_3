"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = void 0;
class Auto {
    constructor(color, precio) {
        this.precio = precio;
        this.color = color;
    }
    GetColor() {
        return this.color;
    }
    SetColor(color) {
        this.color = color;
    }
    get Precio() {
        return this.precio;
    }
    set Precio(value) {
        this.precio = value;
    }
    static MetodoEstatico() {
        console.log("Método esático");
    }
}
exports.Auto = Auto;
//# sourceMappingURL=01_clases.js.map