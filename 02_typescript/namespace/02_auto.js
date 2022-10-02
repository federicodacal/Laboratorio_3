"use strict";
var Test;
(function (Test) {
    class Auto extends Test.Vehiculo {
        constructor(color, precio, marca) {
            super(marca);
            this.precio = precio;
            this.color = color;
        }
        GetPrecio() {
            return this.precio;
        }
        Mostrar() {
            return super.Mostrar() + this.precio + this.color;
        }
        Acelerar() {
            console.log("Acelerando...");
        }
    }
    Test.Auto = Auto;
})(Test || (Test = {}));
//# sourceMappingURL=02_auto.js.map