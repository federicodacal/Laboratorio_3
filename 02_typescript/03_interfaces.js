"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = void 0;
class Auto {
    constructor(color, precio) {
        this.precio = precio;
        this.color = color;
        this.patente = "sin patente";
    }
    get Precio() {
        return this.precio;
    }
    GetColor() {
        return this.color;
    }
    SetColor(color) {
        this.color = color;
    }
}
exports.Auto = Auto;
//# sourceMappingURL=03_interfaces.js.map