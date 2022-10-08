var Manejador;
(function (Manejador) {
    function MostrarDatos() {
        var nombre = document.getElementById("nombre").value;
        var dni = parseInt(document.getElementById("dni").value);
        var cv = document.getElementById("curriculum").value;
        var respuesta = "Nombre: ".concat(nombre, " \nDNI: ").concat(dni, "\nCurriculum Vitae:\n").concat(cv);
        console.log(respuesta);
    }
    Manejador.MostrarDatos = MostrarDatos;
})(Manejador || (Manejador = {}));
