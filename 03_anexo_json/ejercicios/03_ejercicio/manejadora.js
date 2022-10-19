"use strict";
var Ejercicios;
(function (Ejercicios) {
    var xhttp = new XMLHttpRequest();
    function Enviar() {
        var producto = { "codigoBarra": 100, "nombre": "Alfajor", "precio": 50 };
        var pagina = './mostrarJson.php';
        xhttp.open('POST', pagina, true);
        var form = new FormData();
        form.append('producto_json', JSON.stringify(producto));
        xhttp.send(form);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var response = xhttp.responseText;
                console.log(response);
                //window.location.href = pagina;
            }
        };
    }
    Ejercicios.Enviar = Enviar;
})(Ejercicios || (Ejercicios = {}));
//# sourceMappingURL=manejadora.js.map