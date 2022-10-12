var Manejador5;
(function (Manejador5) {
    function ValidarDatos() {
        var mensaje = "";
        var camposIncompletos = true;
        var formatoSexo = false;
        var dni = parseInt(document.getElementById("dni").value);
        var nombre = document.getElementById("nombre").value;
        var apellido = document.getElementById("apellido").value;
        var sexo = document.querySelector('input[name="sexo"]:checked').value;
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
