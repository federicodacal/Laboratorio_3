/// <reference path="../node_modules/@types/jquery/index.d.ts" />

$(() => {

    VerificarJWT();

    AdministrarVerificarJWT();

    //AdministrarLogout();

    AdministrarListarJuguetes();

    AdministrarListarUsuarios();

    AdministrarAgregar();

});

function VerificarJWT() {
    
    let jwt = localStorage.getItem("jwt");

    $.ajax({
        type: 'GET',
        url: URL_API + "login",
        dataType: "json",
        data: {},
        headers : {'Authorization': 'Bearer ' + jwt},
        async: true
    })
    .done(function (obj_rta:any) {

        console.log(obj_rta);

        if(obj_rta.exito){

            let usuario = obj_rta.payload.usuario;

            let alerta:string = ArmarAlert("<br>" + JSON.stringify(usuario));

            $("#divResultado").html(alerta).toggle(2000);
        }
        else{

            let alerta:string = ArmarAlert(obj_rta.mensaje, "danger");

            $("#divResultado").html(alerta).toggle(2000);

            setTimeout(() => {
                $(location).attr('href', URL_BASE + "login.html");
            }, 1000);
        }
    })
    .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {

        let retorno = JSON.parse(jqXHR.responseText);

        let alerta:string = ArmarAlert(retorno.mensaje, "danger");

        $("#divResultado").html(alerta).show(2000);
    });    
}

function AdministrarVerificarJWT() {
    
    $("#verificarJWT").on("click", ()=>{

        VerificarJWT();
    });
}

/*
function AdministrarLogout() {

    $("#logout").on("click", ()=>{

        localStorage.removeItem("jwt");

        let alerta:string = ArmarAlert('Usuario deslogueado!');
    
        $("#divResultado").html(alerta).show(2000);

        setTimeout(() => {
            $(location).attr('href', URL_BASE + "index.html");
        }, 1500);

    });
}
*/

function AdministrarListarJuguetes() {

    $("#listar_juguetes").on("click", ()=>{
        ObtenerListadoJuguetes();
    });
}

function AdministrarListarUsuarios() {

    $("#listar_usuarios").on("click", () => {
        ObtenerListadoUsuarios();
    });

}

function AdministrarAgregar() {

    $("#alta_juguete").on("click", ()=>{
        ArmarFormularioAlta();
    });
}

function ObtenerListadoJuguetes() {
   
    $("#divTablaIzq").html("");

    let jwt = localStorage.getItem("jwt");

    $.ajax({
        type: 'GET',
        url: URL_API + "listarJuguetesBD",
        dataType: "json",
        data: {},
        headers : {'Authorization': 'Bearer ' + jwt},
        async: true
    })
    .done(function (resultado:any) {

        console.log(resultado);

        let tabla : string = ArmarTablaJuguetes(JSON.parse(resultado.dato));

        $("#divTablaIzq").html(tabla).show(1000);

        $('[data-action="modificar"]').on('click', function (e) {
            
            let obj_prod_string : any = $(this).attr("data-obj_prod");
            let obj_prod = JSON.parse(obj_prod_string);

            let formulario = MostrarForm("modificacion", obj_prod);
        
            $("#cuerpo_modal_prod").html(formulario);           
        });
   
        $('[data-action="eliminar"]').on('click', function (e) {

            let obj_prod_string : any = $(this).attr("data-obj_prod");
            let obj_prod = JSON.parse(obj_prod_string);

            let formulario = MostrarForm("baja", obj_prod);
        
            $("#cuerpo_modal_prod").html(formulario);
        });
    })
    .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {

        let retorno = JSON.parse(jqXHR.responseText);

        let alerta:string = ArmarAlert(retorno.mensaje, "danger");

        $("#divTablaIzq").html(alerta).show(2000);
    });    
}

function ArmarTablaJuguetes(juguetes:Array<any>) : string 
{   
    let tabla:string = '<table class="table table-striped">';
    tabla += '<tr><th>ID</th><th>MARCA</th><th>PRECIO</th><th>FOTO</th><th style="width:110px">ACCIONES</th></tr>';

    if(juguetes.length == 0)
    {
        tabla += '<tr><td>---</td><td>---</td><td>---</td><td>---</td><th>---</td></tr>';
    }
    else
    {

        juguetes.forEach((prod : any) => {

            let path_foto = URL_API + "juguetes/" + prod.path_foto;
            //alert(path_foto);
            
            tabla += "<tr><td>"+prod.id+"</td><td>"+prod.marca+"</td><td>"+prod.precio+"</td>"+
            "<td><img src='"+path_foto+"' width='50px' height='50px'></td><th>"+
            "<a href='#' class='btn' data-action='modificar' data-obj_prod='"+JSON.stringify(prod)+"' title='Modificar'"+
            " data-toggle='modal' data-target='#ventana_modal_prod' ><span class='fas fa-edit'></span></a>"+
            "<a href='#' class='btn' data-action='eliminar' data-obj_prod='"+JSON.stringify(prod)+"' title='Eliminar'"+
            " data-toggle='modal' data-target='#ventana_modal_prod' ><span class='fas fa-times'></span></a>"+
            "</td></tr>";
        });
    }

    tabla += "</table>";

    return tabla;
}

function ObtenerListadoUsuarios() {
   
    $("#divTablaDer").html("");

    let jwt = localStorage.getItem("jwt");

    $.ajax({
        type: 'GET',
        url: URL_API + "listarUsuariosBD",
        dataType: "json",
        data: {},
        headers : {'Authorization': 'Bearer ' + jwt},
        async: true
    })
    .done(function (resultado:any) {

        console.log(resultado);

        let tabla : string = ArmarTablaUsuarios(JSON.parse(resultado.dato));

        $("#divTablaDer").html(tabla).show(1000);

        /*
        $('[data-action="modificar"]').on('click', function (e) {
            
            let obj_user_string : any = $(this).attr("data-obj_user");
            let obj_user = JSON.parse(obj_user_string);

            let formulario = MostrarForm("modificacion", obj_user);
        
            $("#cuerpo_modal_user").html(formulario);           
        });
   
        $('[data-action="eliminar"]').on('click', function (e) {

            let obj_user_string : any = $(this).attr("data-obj_user");
            let obj_user = JSON.parse(obj_user_string);

            let formulario = MostrarForm("baja", obj_user);
        
            $("#cuerpo_modal_user").html(formulario);
        });
        */
    })
    .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {

        let retorno = JSON.parse(jqXHR.responseText);

        let alerta : string = ArmarAlert(retorno.mensaje, "danger");

        $("#divTablaDer").html(alerta).show(2000);
    });    
}

function ArmarTablaUsuarios(usuarios:Array<any>) : string 
{   
    let tabla:string = '<table class="table table-striped">';
    tabla += '<tr><th>ID</th><th>NOMBRE</th><th>APELLIDO</th><th>CORREO</th><th>PERFIL</th><th>FOTO</th></tr>';

    if(usuarios.length == 0)
    {
        tabla += '<tr><td>---</td><td>---</td><td>---</td><td>---</td><th>---</td></tr>';
    }
    else
    {

        usuarios.forEach((user : any) => {

            //let path_foto = URL_API + "usuarios/" + user.path_foto;
            //alert(path_foto);
            
            tabla += "<tr><td>"+user.id+"</td><td>"+user.nombre+"</td><td>"+user.apellido+"</td>"+"<td>"+user.correo+"</td>"+"<td>"+user.perfil+"</td>"+
            "<td><img src='' alt='Nope' width='50px' height='50px'></td><th>"+
            "</span></a>"+
            "</td></tr>";
        });
    }

    tabla += "</table>";

    return tabla;
}

function ArmarFormularioAlta()
{
    $("#divTablaIzq").html("");

    let formulario = MostrarForm("alta");

    $("#divTablaIzq").html(formulario).show(1000);
}

function MostrarForm(accion:string, obj_prod:any=null) : string 
{
    let funcion = "";
    let encabezado = "";
    let solo_lectura = "";
    let solo_lectura_pk = "";

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

    let id = "";
    let marca = "";
    let precio = "";
    let path_foto = URL_BASE+"/img/usr_default.jpg";

    if (obj_prod !== null) 
    {
        id = obj_prod.id;
        marca = obj_prod.marca;
        precio = obj_prod.precio;
        path_foto = URL_API + "juguetes/" + obj_prod.path_foto;
    }

    let form:string = '<h3 style="padding-top:1em;">'+encabezado+'</h3>\
                        <div class="row justify-content-center">\
                            <div class="col-md-8">\
                                <form class="was-validated">\
                                    <div class="form-group">\
                                        <label for="id">ID:</label>\
                                        <input type="text" class="form-control " id="id" value="'+id+'" '+solo_lectura_pk+' required>\
                                    </div>\
                                    <div class="form-group">\
                                        <label for="marca">Marca:</label>\
                                        <input type="text" class="form-control" id="marca" placeholder="Ingresar marca"\
                                            name="marca" value="'+marca+'" '+solo_lectura+' required>\
                                        <div class="valid-feedback">OK.</div>\
                                        <div class="invalid-feedback">Valor requerido.</div>\
                                    </div>\
                                    <div class="form-group">\
                                        <label for="precio">Precio:</label>\
                                        <input type="number" class="form-control" id="precio" placeholder="Ingresar precio" name="precio"\
                                            value="'+precio+'" '+solo_lectura+' required>\
                                        <div class="valid-feedback">OK.</div>\
                                        <div class="invalid-feedback">Valor requerido.</div>\
                                    </div>\
                                    <div class="form-group">\
                                        <label for="foto">Foto:</label>\
                                        <input type="file" class="form-control" id="foto" name="foto" '+solo_lectura+' required>\
                                        <div class="valid-feedback">OK.</div>\
                                        <div class="invalid-feedback">Valor requerido.</div>\
                                    </div>\
                                    <div class="row justify-content-between"><img id="img_prod" src="'+path_foto+'" width="400px" height="200px"></div><br>\
                                    <div class="row justify-content-between">\
                                        <input type="button" class="btn btn-danger" data-dismiss="modal" value="Cerrar">\
                                        <button type="submit" class="btn btn-primary" data-dismiss="modal" onclick="'+funcion+'">Aceptar</button>\
                                    </div>\
                                </form>\
                            </div>\
                        </div>';

    return form;
}

function Agregar(e:any):void 
{  
    e.preventDefault();

    let jwt = localStorage.getItem("jwt");

    let id = $("#id").val();
    let marca = $("#marca").val();
    let precio = $("#precio").val();
    let foto: any = (<HTMLInputElement>document.getElementById("foto"));

    let form = new FormData();
    form.append("juguete_json", JSON.stringify({"id":id, "marca":marca, "precio":precio}));
    form.append("foto", foto.files[0]);

    $.ajax({
        type: 'POST',
        url: URL_API + "agregarJugueteBD",
        dataType: "text",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        headers : {'Authorization': 'Bearer ' + jwt},
        async: true
    })
    .done(function (resultado:any) {

        console.log(resultado);

        let alerta:string = ArmarAlert(resultado.mensaje);

        $("#divTablaIzq").html(alerta);
        
    })
    .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {

        let retorno = JSON.parse(jqXHR.responseText);

        let alerta:string = ArmarAlert(retorno.mensaje, "danger");

        $("#divTablaIzq").html(alerta);

    });    
}