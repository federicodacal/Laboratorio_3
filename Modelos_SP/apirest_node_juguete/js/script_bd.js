"use strict";
$(function () {
    VerificarJWT();
    AdministrarVerificarJWT();
    AdministrarListarJuguetes();
    AdministrarListarUsuarios();
    AdministrarAgregar();
});
function VerificarJWT() {
    var jwt = localStorage.getItem("jwt");
    $.ajax({
        type: 'GET',
        url: URL_API + "login",
        dataType: "json",
        data: {},
        headers: { 'Authorization': 'Bearer ' + jwt },
        async: true
    })
        .done(function (obj_rta) {
        console.log(obj_rta);
        if (obj_rta.exito) {
            var usuario = obj_rta.payload.usuario;
            var alerta = ArmarAlert("<br>" + JSON.stringify(usuario));
            $("#divResultado").html(alerta).toggle(2000);
        }
        else {
            var alerta = ArmarAlert(obj_rta.mensaje, "danger");
            $("#divResultado").html(alerta).toggle(2000);
            setTimeout(function () {
                $(location).attr('href', URL_BASE + "login.html");
            }, 1000);
        }
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        var retorno = JSON.parse(jqXHR.responseText);
        var alerta = ArmarAlert(retorno.mensaje, "danger");
        $("#divResultado").html(alerta).show(2000);
    });
}
function AdministrarVerificarJWT() {
    $("#verificarJWT").on("click", function () {
        VerificarJWT();
    });
}
function AdministrarListarJuguetes() {
    $("#listar_juguetes").on("click", function () {
        ObtenerListadoJuguetes();
    });
}
function AdministrarListarUsuarios() {
    $("#listar_usuarios").on("click", function () {
        ObtenerListadoUsuarios();
    });
}
function AdministrarAgregar() {
    $("#alta_juguete").on("click", function () {
        ArmarFormularioAlta();
    });
}
function ObtenerListadoJuguetes() {
    $("#divTablaIzq").html("");
    var jwt = localStorage.getItem("jwt");
    $.ajax({
        type: 'GET',
        url: URL_API + "listarJuguetesBD",
        dataType: "json",
        data: {},
        headers: { 'Authorization': 'Bearer ' + jwt },
        async: true
    })
        .done(function (resultado) {
        console.log(resultado);
        var tabla = ArmarTablaJuguetes(JSON.parse(resultado.dato));
        $("#divTablaIzq").html(tabla).show(1000);
        $('[data-action="modificar"]').on('click', function (e) {
            var obj_prod_string = $(this).attr("data-obj_prod");
            var obj_prod = JSON.parse(obj_prod_string);
            var formulario = MostrarForm("modificacion", obj_prod);
            $("#cuerpo_modal_prod").html(formulario);
        });
        $('[data-action="eliminar"]').on('click', function (e) {
            var obj_prod_string = $(this).attr("data-obj_prod");
            var obj_prod = JSON.parse(obj_prod_string);
            var formulario = MostrarForm("baja", obj_prod);
            $("#cuerpo_modal_prod").html(formulario);
        });
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        var retorno = JSON.parse(jqXHR.responseText);
        var alerta = ArmarAlert(retorno.mensaje, "danger");
        $("#divTablaIzq").html(alerta).show(2000);
    });
}
function ArmarTablaJuguetes(juguetes) {
    var tabla = '<table class="table table-striped">';
    tabla += '<tr><th>ID</th><th>MARCA</th><th>PRECIO</th><th>FOTO</th><th style="width:110px">ACCIONES</th></tr>';
    if (juguetes.length == 0) {
        tabla += '<tr><td>---</td><td>---</td><td>---</td><td>---</td><th>---</td></tr>';
    }
    else {
        juguetes.forEach(function (prod) {
            var path_foto = URL_API + "juguetes/" + prod.path_foto;
            tabla += "<tr><td>" + prod.id + "</td><td>" + prod.marca + "</td><td>" + prod.precio + "</td>" +
                "<td><img src='" + path_foto + "' width='50px' height='50px'></td><th>" +
                "<a href='#' class='btn' data-action='modificar' data-obj_prod='" + JSON.stringify(prod) + "' title='Modificar'" +
                " data-toggle='modal' data-target='#ventana_modal_prod' ><span class='fas fa-edit'></span></a>" +
                "<a href='#' class='btn' data-action='eliminar' data-obj_prod='" + JSON.stringify(prod) + "' title='Eliminar'" +
                " data-toggle='modal' data-target='#ventana_modal_prod' ><span class='fas fa-times'></span></a>" +
                "</td></tr>";
        });
    }
    tabla += "</table>";
    return tabla;
}
function ObtenerListadoUsuarios() {
    $("#divTablaDer").html("");
    var jwt = localStorage.getItem("jwt");
    $.ajax({
        type: 'GET',
        url: URL_API + "listarUsuariosBD",
        dataType: "json",
        data: {},
        headers: { 'Authorization': 'Bearer ' + jwt },
        async: true
    })
        .done(function (resultado) {
        console.log(resultado);
        var tabla = ArmarTablaUsuarios(JSON.parse(resultado.dato));
        $("#divTablaDer").html(tabla).show(1000);
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        var retorno = JSON.parse(jqXHR.responseText);
        var alerta = ArmarAlert(retorno.mensaje, "danger");
        $("#divTablaDer").html(alerta).show(2000);
    });
}
function ArmarTablaUsuarios(usuarios) {
    var tabla = '<table class="table table-striped">';
    tabla += '<tr><th>ID</th><th>NOMBRE</th><th>APELLIDO</th><th>CORREO</th><th>PERFIL</th><th>FOTO</th></tr>';
    if (usuarios.length == 0) {
        tabla += '<tr><td>---</td><td>---</td><td>---</td><td>---</td><th>---</td></tr>';
    }
    else {
        usuarios.forEach(function (user) {
            tabla += "<tr><td>" + user.id + "</td><td>" + user.nombre + "</td><td>" + user.apellido + "</td>" + "<td>" + user.correo + "</td>" + "<td>" + user.perfil + "</td>" +
                "<td><img src='' alt='Nope' width='50px' height='50px'></td><th>" +
                "</span></a>" +
                "</td></tr>";
        });
    }
    tabla += "</table>";
    return tabla;
}
function ArmarFormularioAlta() {
    $("#divTablaIzq").html("");
    var formulario = MostrarForm("alta");
    $("#divTablaIzq").html(formulario).show(1000);
}
function MostrarForm(accion, obj_prod) {
    if (obj_prod === void 0) { obj_prod = null; }
    var funcion = "";
    var encabezado = "";
    var solo_lectura = "";
    var solo_lectura_pk = "";
    switch (accion) {
        case "alta":
            funcion = 'Agregar(event)';
            encabezado = 'AGREGAR JUGUETE';
            solo_lectura_pk = "readonly";
            break;
        case "baja":
            funcion = 'Eliminar(event)';
            encabezado = 'ELIMINAR JUGUETE';
            solo_lectura = "readonly";
            solo_lectura_pk = "readonly";
            break;
        case "modificacion":
            funcion = 'Modificar(event)';
            encabezado = 'MODIFICAR JUGUETE';
            solo_lectura_pk = "readonly";
            break;
    }
    var id = "";
    var marca = "";
    var precio = "";
    var path_foto = URL_BASE + "/img/usr_default.jpg";
    if (obj_prod !== null) {
        id = obj_prod.id;
        marca = obj_prod.marca;
        precio = obj_prod.precio;
        path_foto = URL_API + "juguetes/" + obj_prod.path_foto;
    }
    var form = '<h3 style="padding-top:1em;">' + encabezado + '</h3>\
                        <div class="row justify-content-center">\
                            <div class="col-md-8">\
                                <form class="was-validated">\
                                    <div class="form-group">\
                                        <label for="id">ID:</label>\
                                        <input type="text" class="form-control " id="id" value="' + id + '" ' + solo_lectura_pk + ' required>\
                                    </div>\
                                    <div class="form-group">\
                                        <label for="marca">Marca:</label>\
                                        <input type="text" class="form-control" id="marca" placeholder="Ingresar marca"\
                                            name="marca" value="' + marca + '" ' + solo_lectura + ' required>\
                                        <div class="valid-feedback">OK.</div>\
                                        <div class="invalid-feedback">Valor requerido.</div>\
                                    </div>\
                                    <div class="form-group">\
                                        <label for="precio">Precio:</label>\
                                        <input type="number" class="form-control" id="precio" placeholder="Ingresar precio" name="precio"\
                                            value="' + precio + '" ' + solo_lectura + ' required>\
                                        <div class="valid-feedback">OK.</div>\
                                        <div class="invalid-feedback">Valor requerido.</div>\
                                    </div>\
                                    <div class="form-group">\
                                        <label for="foto">Foto:</label>\
                                        <input type="file" class="form-control" id="foto" name="foto" ' + solo_lectura + ' required>\
                                        <div class="valid-feedback">OK.</div>\
                                        <div class="invalid-feedback">Valor requerido.</div>\
                                    </div>\
                                    <div class="row justify-content-between"><img id="img_prod" src="' + path_foto + '" width="400px" height="200px"></div><br>\
                                    <div class="row justify-content-between">\
                                        <input type="button" class="btn btn-danger" data-dismiss="modal" value="Cerrar">\
                                        <button type="submit" class="btn btn-primary" data-dismiss="modal" onclick="' + funcion + '">Aceptar</button>\
                                    </div>\
                                </form>\
                            </div>\
                        </div>';
    return form;
}
function Agregar(e) {
    e.preventDefault();
    var jwt = localStorage.getItem("jwt");
    var id = $("#id").val();
    var marca = $("#marca").val();
    var precio = $("#precio").val();
    var foto = document.getElementById("foto");
    var form = new FormData();
    form.append("juguete_json", JSON.stringify({ "id": id, "marca": marca, "precio": precio }));
    form.append("foto", foto.files[0]);
    $.ajax({
        type: 'POST',
        url: URL_API + "agregarJugueteBD",
        dataType: "text",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        headers: { 'Authorization': 'Bearer ' + jwt },
        async: true
    })
        .done(function (resultado) {
        console.log(resultado);
        var alerta = ArmarAlert(resultado);
        $("#divTablaIzq").html(alerta);
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        var retorno = JSON.parse(jqXHR.responseText);
        var alerta = ArmarAlert(retorno.mensaje, "danger");
        $("#divTablaIzq").html(alerta);
    });
}
//# sourceMappingURL=script_bd.js.map