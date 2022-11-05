"use strict";
var Manejador;
(function (Manejador) {
    function MostrarDatos() {
        let nombre = document.getElementById("nombre").value;
        let dni = parseInt(document.getElementById("dni").value);
        let cv = document.getElementById("curriculum").value;
        let respuesta = `Nombre: ${nombre} \nDNI: ${dni}\nCurriculum Vitae:\n${cv}`;
        console.log(respuesta);
    }
    Manejador.MostrarDatos = MostrarDatos;
})(Manejador || (Manejador = {}));
//# sourceMappingURL=manejador.js.map