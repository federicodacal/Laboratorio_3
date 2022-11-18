/// <reference path="../node_modules/@types/jquery/index.d.ts" />
//tsc --outfile ./FRONTEND/login.js ./FRONTEND/login.ts
$(document).ready(function()
{
    $('#limpiar').click(function(event)
    {
        $("#alerta").removeClass("visible");
        $("#alerta").addClass("invisible");
    })
});

namespace Manejadora
{
    export class Login
    {
        public static Verificar(e) : void
        {
            e.preventDefault();
            
            let correo = $('#correo').val();
            let clave = $('#clave').val();
            let dato : any = {};
            dato.correo = correo;
            dato.clave = clave;

            $.ajax
            ({
                type: 'POST',
                url: "./BACKEND/login",
                dataType: 'json',
                data: {'user':JSON.stringify(dato)},
                async: true
            })
            .done(function (resultado)
            {
                localStorage.setItem('jwt',resultado.jwt);
                window.location.replace("./principal.php");
            })
            .fail(function (resultado)
            {
                $("#alerta").removeClass("invisible");
                $("#alerta").addClass("visible");
                $('#error_message').text(resultado.responseJSON.mensaje);
                $('#error_message').show();
            })
            
        }
    }
}