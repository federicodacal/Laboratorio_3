"use strict";
var ManejadorEmpleados;
(function (ManejadorEmpleados) {
    let fabrica = new Entidades.Fabrica("Coca-Cola");
    function RealizarAccion() {
        let accion = document.getElementById("accion").value;
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let dni = parseInt(document.getElementById("dni").value);
        let sexo = document.getElementById("sexo").value;
        let sueldo = parseFloat(document.getElementById("sueldo").value);
        let legajo = parseInt(document.getElementById("legajo").value);
        let emp = new Entidades.Empleado(nombre, apellido, dni, sexo, legajo, sueldo);
        if (accion == "agregar") {
            AgregarEmpleado(emp);
        }
        if (accion == "eliminar") {
            EliminarEmpleado(emp);
        }
        if (accion == "mostrar") {
            console.log(fabrica.ToString());
        }
    }
    ManejadorEmpleados.RealizarAccion = RealizarAccion;
    function AgregarEmpleado(emp) {
        if (fabrica.AgregarEmpleado(emp)) {
            console.log(emp.ToString());
            alert(emp.ToString());
        }
        else {
            console.log("No se agregó");
        }
    }
    function EliminarEmpleado(emp) {
        let dni = parseInt(document.getElementById("dni").value);
        if (fabrica.EliminarEmpleado(emp)) {
            console.log("Eliminado");
        }
        else {
            console.log("No se eliminó");
        }
    }
})(ManejadorEmpleados || (ManejadorEmpleados = {}));
//# sourceMappingURL=manejadorEmpleados.js.map