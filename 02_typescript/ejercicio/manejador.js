"use strict";
var Manejador;
(function (Manejador) {
    function CrearAlumno() {
        let nombre = document.getElementById("txtNombre").value;
        let apellido = document.getElementById("txtApellido").value;
        let legajo = parseInt(document.getElementById("txtLegajo").value);
        let nuevoAlumno = new Prueba.Alumno(apellido, nombre, legajo);
        console.log(nuevoAlumno.ToString());
        alert(nuevoAlumno.ToString());
    }
    Manejador.CrearAlumno = CrearAlumno;
})(Manejador || (Manejador = {}));
//# sourceMappingURL=manejador.js.map