"use strict";
var Entidades;
(function (Entidades) {
    class Producto {
        constructor(nombre, origen) {
            this.nombre = nombre;
            this.origen = origen;
        }
        ToString() {
            return `"nombre":"${this.nombre}","origen":"${this.origen}"`;
        }
        ToJSON() {
            return `{${this.ToString()}}`;
        }
    }
    Entidades.Producto = Producto;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Producto.js.map