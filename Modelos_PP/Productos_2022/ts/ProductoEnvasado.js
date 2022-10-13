"use strict";
var Entidades;
(function (Entidades) {
    class ProductoEnvasado extends Entidades.Producto {
        constructor(nombre = "", origen = "", codigoBarra = "", precio = 0, pathFoto = "", id = 0) {
            super(nombre, origen);
            this.codigoBarra = codigoBarra;
            this.precio = precio;
            ;
            this.pathFoto = pathFoto;
            this.id = id;
        }
        ToJSON() {
            return `{${super.ToString},"codigoBarra":"${this.codigoBarra}","precio":${this.precio},"pathFoto":"${this.pathFoto}","id":${this.id}}`;
        }
    }
    Entidades.ProductoEnvasado = ProductoEnvasado;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=ProductoEnvasado.js.map