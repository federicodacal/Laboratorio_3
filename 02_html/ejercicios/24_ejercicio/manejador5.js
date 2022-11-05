"use strict";
var Manejador5;
(function (Manejador5) {
    function ValidarDatos() {
        let mensaje = "";
        let camposIncompletos = true;
        let formatoSexo = false;
        let dni = parseInt(document.getElementById("dni").value);
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let sexo = document.querySelector('input[name="sexo"]:checked').value;
        if (isNaN(dni) || nombre == "" || apellido == "" || sexo == "") {
            mensaje = "Campos incompletos. ";
        }
        else {
            camposIncompletos = false;
        }
        if (sexo != 'm' && sexo != 'f' && sexo != "nb") {
            mensaje += "Formato de campo 'sexo' no es valido";
        }
        else {
            formatoSexo = true;
        }
        if (!camposIncompletos && formatoSexo) {
            mensaje = "Validado!";
        }
        console.log(mensaje);
    }
    Manejador5.ValidarDatos = ValidarDatos;
})(Manejador5 || (Manejador5 = {}));
//# sourceMappingURL=manejador5.js.map