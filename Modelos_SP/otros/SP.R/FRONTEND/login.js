/// <reference path="../node_modules/@types/jquery/index.d.ts" />
//tsc --outfile ./FRONTEND/login.js ./FRONTEND/login.ts
$(document).ready(function () {
    $('#limpiar').click(function (event) {
        $("#alerta").removeClass("visible");
        $("#alerta").addClass("invisible");
    });
});
var Manejadora;
(function (Manejadora) {
    var Login = /** @class */ (function () {
        function Login() {
        }
        Login.Verificar = function (e) {
            e.preventDefault();
            var correo = $('#correo').val();
            var clave = $('#clave').val();
            var dato = {};
            dato.correo = correo;
            dato.clave = clave;
            $.ajax({
                type: 'POST',
                url: "./BACKEND/login",
                dataType: 'json',
                data: { 'user': JSON.stringify(dato) },
                async: true
            })
                .done(function (resultado) {
                localStorage.setItem('jwt', resultado.jwt);
                window.location.replace("./principal.php");
            })
                .fail(function (resultado) {
                $("#alerta").removeClass("invisible");
                $("#alerta").addClass("visible");
                $('#error_message').text(resultado.responseJSON.mensaje);
                $('#error_message').show();
            });
        };
        return Login;
    }());
    Manejadora.Login = Login;
})(Manejadora || (Manejadora = {}));
