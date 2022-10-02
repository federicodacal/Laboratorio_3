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
    GetPrecio() {
        return this.precio;
    }
    Acelerar() {
        console.log("Acelerando...");
    }
    get Marca() {
        return this.marca;
    }
    set Marca(value) {
        this.marca = value;
    }
    Mostrar() {
        return super.Mostrar() + this.precio + this.color;
    }
}
exports.Auto = Auto;
//# sourceMappingURL=04_claseAbstracta.js.map