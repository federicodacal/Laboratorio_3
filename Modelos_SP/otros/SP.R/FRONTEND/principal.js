/// <reference path="../node_modules/@types/jquery/index.d.ts" />
//tsc --outfile ./FRONTEND/principal.js ./FRONTEND/principal.ts
var Manejadora;
(function (Manejadora) {
    var Principal = /** @class */ (function () {
        function Principal() {
        }
        Principal.ArmarAlert = function (mensaje, tipo) {
            if (tipo === void 0) { tipo = "success"; }
            var alerta = '<div id="alert_' + tipo + '" class="alert alert-' + tipo + ' alert-dismissable">';
            alerta += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
            alerta += '<span class="d-inline-block text-truncate" style="max-width: 450px;">' + mensaje + ' </span></div>';
            return alerta;
        };
        Principal.ArmarFormBarbijo = function (accion, barbijo) {
            $("#divResultado").html("");
            var color = "";
            var tipo = "";
            var precio = "";
            var funcion = "";
            var titulo = "";
            switch (accion) {
                case "modificar":
                    var objJson = JSON.parse(barbijo);
                    funcion = "Manejadora.Principal.ModificarBarbijo(" + objJson.id + ")";
                    titulo = "Modificar";
                    color = objJson.color;
                    tipo = objJson.tipo;
                    precio = objJson.precio;
                    break;
                case "agregar":
                    funcion = "Manejadora.Principal.AgregarBarbijo(event)";
                    titulo = "Agregar";
                    break;
            }
            var form = '<br>\
                                <div class="row justify-content-center">\
                                    <div class="col-md-8">\
                                        <form style="background-color: darkcyan" class="well col-md-10">\
                                            <br>\
                                            <div class="form-group">\
                                                <div class="input-group">\
                                                    <span class="input-group-addon"><i class="fa fa-paint-brush"></i></span>\
                                                    <input type="text" class="form-control" id="color" placeholder="Color" value="' + color + '">\
                                                </div>\
                                            </div>\
                                            <div class="form-group">\
                                                <div class="input-group">\
                                                    <span class="input-group-addon"><i class="fa fa-list"></i></span>\
                                                    <input type="text" class="form-control" id="tipo" placeholder="Tipo" value="' + tipo + '">\
                                                </div>\
                                            </div>\
                                            <div class="form-group">\
                                                <div class="input-group">\
                                                    <span class="input-group-addon"><i class="fa fa-usd"></i></span>\
                                                    <input type="number" class="form-control" id="precio" placeholder="Precio" value="' + precio + '">\
                                                </div>\
                                            </div>\
                                            <div class="row">\
                                                <div class="col-sm-6 col-xs-12">\
                                                    <button type="submit" class="btn btn-block btn-success" id="btnModificar" onclick=' + funcion + '>' + titulo + '</button>\
                                                </div>\
                                                <div class="col-sm-6 col-xs-12">\
                                                    <button type="reset" class="btn btn-block btn-warning">Limpiar</button>\
                                                </div>\
                                            </div>\
                                            <br>\
                                        </form>\
                                    </div>\
                                </div><br>';
            $("#divUsuario").html(form);
        };
        Principal.ArmarTablaUsuarios = function (usuario) {
            var tabla = '<table class="table table-hover" style="background-color: rgb(47, 153, 47)">';
            tabla += '<br><tr><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th><th>FOTO</th></tr>';
            usuario.tabla.forEach(function (element) {
                var foto = element.foto.split("/");
                tabla += '<tr><td>' + element.correo + '</td><td>' + element.nombre + '</td><td>' + element.apellido + '</td><td>' + element.perfil + '</td><th><img src="./BACKEND/fotos/' + foto[2] + '" height=50 width=50 ></img></td></tr>';
            });
            tabla += "</table>";
            return tabla;
        };
        Principal.ArmarTablaBarbijos = function (barbijo) {
            var tabla = '<table class="table table-hover" style="background-color: rgb(223, 71, 71)">';
            tabla += '<br><tr><th>COLOR</th><th>TIPO</th><th>PRECIO</th><th colspan="2">ACCIONES</th></tr>';
            var accion = "modificar";
            barbijo.tabla.forEach(function (element) {
                tabla += '<tr><td>' + element.color + '</td><td>' + element.tipo + '</td><td>' + element.precio + '</td>';
                tabla += '<td><button type="button" class="btn btn-danger" id="btnEliminar" onclick="Manejadora.Principal.EliminarBarbijo(' + element.id + ')">Eliminar</button></td>';
                tabla += '<td><button type="button" class="btn btn-info" id="btnModificar" onclick=Manejadora.Principal.ArmarFormBarbijo(\'' + accion + '\',\'' + JSON.stringify(element) + '\')>Modificar</button></td>';
            });
            tabla += "</table>";
            return tabla;
        };
        Principal.ListadoUsuarios = function () {
            var jwt = localStorage.getItem("jwt");
            $("#divResultado").html("");
            $.ajax({
                type: 'GET',
                url: "./BACKEND/login",
                dataType: "json",
                headers: { "token": jwt },
                data: {},
                async: true
            })
                .done(function (resultado) {
                $.ajax({
                    type: 'GET',
                    url: "./BACKEND/",
                    dataType: "json",
                    data: {},
                    async: true
                })
                    .done(function (resultado) {
                    var tabla = Principal.ArmarTablaUsuarios(resultado);
                    $("#divUsuario").html(tabla);
                })
                    .fail(function (resultado) {
                    var alerta = Principal.ArmarAlert(resultado.responseJSON.mensaje, "danger");
                    $("#divResultado").html(alerta);
                });
            })
                .fail(function (resultado) {
                window.location.replace("./login.html");
            });
        };
        Principal.ListadoBarbijos = function () {
            var jwt = localStorage.getItem("jwt");
            $("#divResultado").html("");
            $.ajax({
                type: 'GET',
                url: "./BACKEND/login",
                dataType: "json",
                headers: { "token": jwt },
                data: {},
                async: true
            })
                .done(function (resultado) {
                $.ajax({
                    type: 'GET',
                    url: "./BACKEND/barbijos",
                    dataType: "json",
                    data: {},
                    async: true
                })
                    .done(function (resultado) {
                    var tabla = Principal.ArmarTablaBarbijos(resultado);
                    $("#divBarbijo").html(tabla);
                })
                    .fail(function (resultado) {
                    var alerta = Principal.ArmarAlert(resultado.responseJSON.mensaje, "danger");
                    $("#divResultado").html(alerta);
                });
            })
                .fail(function (resultado) {
                window.location.replace("./login.html");
            });
        };
        Principal.AgregarBarbijo = function (e) {
            e.preventDefault();
            var color = $("#color").val();
            var tipo = $("#tipo").val();
            var precio = $("#precio").val();
            var dato = {
                color: color,
                tipo: tipo,
                precio: precio
            };
            var jwt = localStorage.getItem("jwt");
            $("#divResultado").html("");
            $.ajax({
                type: 'GET',
                url: "./BACKEND/login",
                dataType: "json",
                headers: { "token": jwt },
                data: {},
                async: true
            })
                .done(function (resultado) {
                $.ajax({
                    type: 'POST',
                    url: "./BACKEND/",
                    dataType: "json",
                    data: { "barbijo": JSON.stringify(dato) },
                    async: true
                })
                    .done(function (resultado) {
                    Principal.ListadoBarbijos();
                })
                    .fail(function (resultado) {
                    var alerta = Principal.ArmarAlert(resultado.responseJSON.mensaje, "danger");
                    $("#divResultado").html(alerta);
                });
            })
                .fail(function (resultado) {
                window.location.replace("./login.html");
            });
        };
        Principal.EliminarBarbijo = function (id) {
            var jwt = localStorage.getItem("jwt");
            $("#divResultado").html("");
            $.ajax({
                type: 'GET',
                url: "./BACKEND/login",
                dataType: "json",
                headers: { "token": jwt },
                data: {},
                async: true
            })
                .done(function (resultado) {
                if (confirm("¿Desea eliminar el barbijo?")) {
                    $.ajax({
                        type: 'DELETE',
                        url: "./BACKEND/",
                        dataType: "json",
                        data: { "id_barbijo": id },
                        headers: { "token": jwt },
                        async: true
                    })
                        .done(function (resultado) {
                        Principal.ListadoBarbijos();
                    })
                        .fail(function (resultado) {
                        var alerta = Principal.ArmarAlert(resultado.responseJSON.mensaje, "danger");
                        $("#divResultado").html(alerta);
                    });
                }
            })
                .fail(function (resultado) {
                window.location.replace("./login.html");
            });
        };
        Principal.ModificarBarbijo = function (id) {
            $("#divResultado").html("");
            var jwt = localStorage.getItem("jwt");
            var color = $("#color").val();
            var tipo = $("#tipo").val();
            var precio = $("#precio").val();
            var dato = {
                id: id,
                color: color,
                tipo: tipo,
                precio: precio
            };
            $.ajax({
                type: 'GET',
                url: "./BACKEND/login",
                dataType: "json",
                headers: { "token": jwt },
                data: {},
                async: true
            })
                .done(function (resultado) {
                $.ajax({
                    type: 'PUT',
                    url: "./BACKEND/",
                    dataType: "json",
                    data: { "barbijo": JSON.stringify(dato) },
                    headers: { "token": jwt },
                    async: true
                })
                    .done(function (resultado) {
                    Principal.ListadoBarbijos();
                })
                    .fail(function (resultado) {
                    var alerta = Principal.ArmarAlert(resultado.responseJSON.mensaje, "danger");
                    $("#divResultado").html(alerta);
                });
            })
                .fail(function (resultado) {
                window.location.replace("./login.html");
            });
        };
        return Principal;
    }());
    Manejadora.Principal = Principal;
})(Manejadora || (Manejadora = {}));
