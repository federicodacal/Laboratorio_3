"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = exports.Vehiculo = void 0;
class Vehiculo {
    constructor(marca) {
        this.marca = marca;
    }
    Mostrar() {
        return this.marca;
    }
}
exports.Vehiculo = Vehiculo;
class Auto extends Vehiculo {
    constructor(color, precio, marca) {
        super(marca);
        this.precio = precio;
        this.color = color;
    }
    get Precio() {
        return this.precio;
    }
    set Precio(value) {
        this.precio = value;
    }
    Mostrar() {
        return super.Mostrar() + this.precio + this.color;
    }
}
exports.Auto = Auto;
//# sourceMappingURL=02_herencia.js.map