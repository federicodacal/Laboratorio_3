"use strict";
var Test;
(function (Test) {
    class Vehiculo {
        constructor(marca) {
            this.marca = marca;
        }
        Mostrar() {
            return this.marca;
        }
    }
    Test.Vehiculo = Vehiculo;
})(Test || (Test = {}));
//# sourceMappingURL=01_vehiculo.js.map