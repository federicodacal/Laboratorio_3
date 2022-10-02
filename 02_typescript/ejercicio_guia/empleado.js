"use strict";
var Entidades;
(function (Entidades) {
    class Empleado extends Entidades.Persona {
        constructor(nombre, apellido, dni, sexo, legajo, sueldo) {
            super(nombre, apellido, dni, sexo);
            this.legajo = legajo;
            this.sueldo = sueldo;
        }
        get Legajo() {
            return this.legajo;
        }
        get Sueldo() {
            return this.sueldo;
        }
        Hablar(idioma = "Español") {
            return `El empleado habla ${idioma}`;
        }
        ToString() {
            return `${super.ToString()}\nLegajo: ${this.Legajo} - Sueldo: $${this.Sueldo}\n${this.Hablar()}`;
        }
    }
    Entidades.Empleado = Empleado;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=empleado.js.map