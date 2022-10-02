var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, dni, sexo) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.dni = dni;
            this.sexo = sexo;
        }
        Object.defineProperty(Persona.prototype, "Apellido", {
            get: function () {
                return this.apellido;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "Nombre", {
            get: function () {
                return this.nombre;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "Dni", {
            get: function () {
                return this.dni;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "Sexo", {
            get: function () {
                return this.sexo;
            },
            enumerable: false,
            configurable: true
        });
        Persona.prototype.ToString = function () {
            return "".concat(this.nombre, " ").concat(this.apellido, ". DNI: ").concat(this.dni, " - Sexo: ").concat(this.sexo);
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
/// <reference path="./persona.ts" />
var Entidades;
(function (Entidades) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, dni, sexo, legajo, sueldo) {
            var _this = _super.call(this, nombre, apellido, dni, sexo) || this;
            _this.legajo = legajo;
            _this.sueldo = sueldo;
            return _this;
        }
        Object.defineProperty(Empleado.prototype, "Legajo", {
            get: function () {
                return this.legajo;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Empleado.prototype, "Sueldo", {
            get: function () {
                return this.sueldo;
            },
            enumerable: false,
            configurable: true
        });
        Empleado.prototype.Hablar = function (idioma) {
            if (idioma === void 0) { idioma = "Español"; }
            return "El empleado habla ".concat(idioma);
        };
        Empleado.prototype.ToString = function () {
            return "".concat(_super.prototype.ToString.call(this), "\nLegajo: ").concat(this.Legajo, " - Sueldo: $").concat(this.Sueldo, "\n").concat(this.Hablar());
        };
        return Empleado;
    }(Entidades.Persona));
    Entidades.Empleado = Empleado;
})(Entidades || (Entidades = {}));
/// <reference path="./empleado.ts" />
var Entidades;
(function (Entidades) {
    var Fabrica = /** @class */ (function () {
        function Fabrica(razonSocial) {
            this.razonSocial = razonSocial;
            this.empleados = new Array;
        }
        Fabrica.prototype.AgregarEmpleado = function (emp) {
            var rta = false;
            if (emp != null && this.IndiceEmpleado(emp.Dni) == -1) {
                this.empleados.push(emp);
                rta = true;
            }
            return rta;
        };
        Fabrica.prototype.IndiceEmpleado = function (dni) {
            var index = -1;
            for (var i = 0; i < this.empleados.length; i++) {
                if (dni === this.empleados[i].Dni) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        Fabrica.prototype.EliminarEmpleado = function (emp) {
            var rta = false;
            if (emp != null) {
                var index = this.IndiceEmpleado(emp.Dni);
                if (index != -1) {
                    this.empleados.splice(index, 1);
                    rta = true;
                }
            }
            return rta;
        };
        Fabrica.prototype.CalcularSueldos = function () {
            var totalSueldos = 0;
            this.empleados.forEach(function (emp) {
                totalSueldos += emp.Sueldo;
            });
            return totalSueldos;
        };
        Fabrica.prototype.ToString = function () {
            var salida = "".concat(this.razonSocial, " - Cantidad Empleados: ").concat(this.empleados.length, " - Salarios: $").concat(this.CalcularSueldos(), "\n");
            this.empleados.forEach(function (emp) {
                salida += emp.ToString();
                salida += "\n";
            });
            return salida;
        };
        return Fabrica;
    }());
    Entidades.Fabrica = Fabrica;
})(Entidades || (Entidades = {}));
/// <reference path="./persona.ts" />
/// <reference path="./empleado.ts" />
/// <reference path="./fabrica.ts" />
var e1 = new Entidades.Empleado("Jorge", "Gomez", 5345096, 'M', 100, 2000);
var e2 = new Entidades.Empleado("Ana", "Perez", 44532123, 'F', 101, 2500);
var e3 = new Entidades.Empleado("Ricardo", "Suarez", 67321746, 'M', 102, 3000);
console.log(e1.ToString());
console.log(e2.ToString());
console.log(e3.ToString());
console.log("\n");
var fabrica = new Entidades.Fabrica("Coca-Cola");
fabrica.AgregarEmpleado(e1);
fabrica.AgregarEmpleado(e2);
fabrica.AgregarEmpleado(e3);
fabrica.AgregarEmpleado(new Entidades.Empleado("Juan", "Gimenez", 67321746, 'M', 102, 3000)); // DNI Repetido
console.log(fabrica.ToString());
console.log("\n");
fabrica.EliminarEmpleado(e1);
console.log(fabrica.ToString());
console.log("\n");
