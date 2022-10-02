"use strict";
var Entidades;
(function (Entidades) {
    class Fabrica {
        constructor(razonSocial) {
            this.razonSocial = razonSocial;
            this.empleados = new Array;
        }
        AgregarEmpleado(emp) {
            let rta = false;
            if (emp != null && this.IndiceEmpleado(emp.Dni) == -1) {
                this.empleados.push(emp);
                rta = true;
            }
            return rta;
        }
        IndiceEmpleado(dni) {
            let index = -1;
            for (let i = 0; i < this.empleados.length; i++) {
                if (dni === this.empleados[i].Dni) {
                    index = i;
                    break;
                }
            }
            return index;
        }
        EliminarEmpleado(emp) {
            let rta = false;
            if (emp != null) {
                let index = this.IndiceEmpleado(emp.Dni);
                if (index != -1) {
                    this.empleados.splice(index, 1);
                    rta = true;
                }
            }
            return rta;
        }
        CalcularSueldos() {
            let totalSueldos = 0;
            this.empleados.forEach(emp => {
                totalSueldos += emp.Sueldo;
            });
            return totalSueldos;
        }
        ToString() {
            let salida = `${this.razonSocial} - Cantidad Empleados: ${this.empleados.length} - Salarios: $${this.CalcularSueldos()}\n`;
            this.empleados.forEach(emp => {
                salida += emp.ToString();
                salida += "\n";
            });
            return salida;
        }
    }
    Entidades.Fabrica = Fabrica;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=fabrica.js.map