/// <reference path="../node_modules/@types/jquery/index.d.ts" />
//tsc --outfile ./FRONTEND/principal.js ./FRONTEND/principal.ts

namespace Manejadora
{
    export class Principal
    {
        public static ArmarAlert(mensaje:string, tipo:string = "success"):string
        {
            let alerta:string = '<div id="alert_' + tipo + '" class="alert alert-' + tipo + ' alert-dismissable">';
            alerta += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
            alerta += '<span class="d-inline-block text-truncate" style="max-width: 450px;">' + mensaje + ' </span></div>';

            return alerta;
        }

        public static ArmarTablaUsuarios(usuario):string 
        {
            let tabla:string = '<table class="table table-hover" style="background-color: rgb(47, 153, 47)">';
            tabla += '<br><tr><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th><th>FOTO</th></tr>';
        
            usuario.tabla.forEach(element => 
            {
                console.log(element);
                tabla += '<tr><td>'+element.correo+'</td><td>'+element.nombre+'</td><td>'+element.apellido+'</td><td>'+element.perfil+'</td><th><img src="./BACKEND/fotos/'+element.foto+'" height=50 width=50 ></img></td></tr>';
            });
        
            tabla += "</table>";
        
            return tabla;
        }

        public static ArmarFormAuto(accion : string, auto ?) : void
        {
            $("#divResultado").html("");
            
            let marca = "";
            let color = "";
            let modelo = "";
            let precio = "";
            let funcion = "";
            let titulo = "";
            
            switch(accion)
            {
                case "modificar":
                    let objJson = JSON.parse(auto);
                    funcion = "Manejadora.Principal.ModificarAuto("+ objJson.id +")";
                    titulo = "Modificar";
                    marca = objJson.marca;
                    color = objJson.color;
                    modelo = objJson.modelo;
                    precio = objJson.precio;
                    break;
                case "agregar":
                    funcion =  "Manejadora.Principal.AgregarAuto(event)";
                    titulo = "Agregar";
                    break;
            }

            let form:string = '<br>\
                                <div class="row justify-content-center">\
                                    <div class="col-md-8">\
                                        <form style="background-color: darkcyan" class="well col-md-10">\
                                            <br>\
                                            <div class="form-group">\
                                                <div class="input-group">\
                                                    <span class="input-group-addon"><i class="fa fa-trademark"></i></span>\
                                                    <input type="text" class="form-control" id="marca" placeholder="Marca" value="'+marca+'">\
                                                </div>\
                                            </div>\
                                            <div class="form-group">\
                                                <div class="input-group">\
                                                    <span class="input-group-addon"><i class="fa fa-paint-brush"></i></span>\
                                                    <input type="text" class="form-control" id="color" placeholder="Color" value="'+color+'">\
                                                </div>\
                                            </div>\
                                            <div class="form-group">\
                                                <div class="input-group">\
                                                    <span class="input-group-addon"><i class="fa fa-car"></i></span>\
                                                    <input type="text" class="form-control" id="modelo" placeholder="Modelo" value="'+modelo+'">\
                                                </div>\
                                            </div>\
                                            <div class="form-group">\
                                                <div class="input-group">\
                                                    <span class="input-group-addon"><i class="fa fa-usd"></i></span>\
                                                    <input type="number" class="form-control" id="precio" placeholder="Precio" value="'+precio+'">\
                                                </div>\
                                            </div>\
                                            <div class="row">\
                                                <div class="col-sm-6 col-xs-12">\
                                                    <button type="submit" class="btn btn-block btn-success" id="btnModificar" onclick='+ funcion +'>'+ titulo +'</button>\
                                                </div>\
                                                <div class="col-sm-6 col-xs-12">\
                                                    <button type="reset" class="btn btn-block btn-warning">Limpiar</button>\
                                                </div>\
                                            </div>\
                                            <br>\
                                        </form>\
                                    </div>\
                                </div><br>';

            $("#divAutos").html(form);
        }

        public static ArmarTablaAutos(auto):string 
        {
            let tabla:string = '<table class="table table-hover" style="background-color: rgb(223, 71, 71)">';
            tabla += '<br><tr><th>MARCA</th><th>COLOR</th><th>MODELO</th><th>PRECIO</th><th colspan="2">ACCIONES</th></tr>';
            let accion = "modificar";

            auto.tabla.forEach(element => 
            {
                tabla += '<tr><td>'+element.marca+'</td><td>'+element.color+'</td><td>'+element.modelo+'</td><td>'+element.precio+'</td>';
                tabla += '<td><button type="button" class="btn btn-danger" id="btnEliminar" onclick="Manejadora.Principal.EliminarAuto('+ element.id +')">Eliminar</button></td>';
                tabla += '<td><button type="button" class="btn btn-info" id="btnModificar" onclick=Manejadora.Principal.ArmarFormAuto(\''+accion+'\',\''+ JSON.stringify(element) +'\')>Modificar</button></td>';                                                    
            });
        
            tabla += "</table>";
        
            return tabla;
        }

        public static ListadoUsuarios():void 
        {
            //LIMPIO EL CONTENIDO DEL DIV    
            $("#divResultado").html("");
        
            $.ajax
            ({
                type: 'GET',
                url: "./BACKEND/",
                dataType: "json",
                data: {},
                async: true
            })
            .done(function (resultado) 
            {
                //MUESTRO EL RESULTADO DE LA PETICION
                console.log(resultado);
                let tabla:string = Principal.ArmarTablaUsuarios(resultado);
                $("#divUsuario").html(tabla);
            })
            .fail(function (resultado) 
            {
                let alerta:string = Principal.ArmarAlert(resultado.responseJSON.mensaje, "danger");
                $("#divResultado").html(alerta);
            });    
        }

        public static ListadoAutos():void 
        {
            //LIMPIO EL CONTENIDO DEL DIV    
            $("#divResultado").html("");
        
            $.ajax
            ({
                type: 'GET',
                url: "./BACKEND/autos",
                dataType: "json",
                data: {},
                async: true
            })
            .done(function (resultado) 
            {
                //MUESTRO EL RESULTADO DE LA PETICION
                let tabla:string = Principal.ArmarTablaAutos(resultado);
                $("#divAutos").html(tabla);
            })
            .fail(function (resultado) 
            {
                let alerta:string = Principal.ArmarAlert(resultado.responseJSON.mensaje, "danger");
                $("#divResultado").html(alerta);
            });    
        }

        public static AgregarAuto(e) : void
        {
            e.preventDefault();

            let marca = $("#marca").val();
            let color = $("#color").val();
            let modelo = $("#modelo").val();
            let precio = $("#precio").val();

            let dato : any = {
                color : color,
                marca : marca,
                precio : precio,
                modelo : modelo
            }

            $.ajax({
                type: 'POST',
                url: "./BACKEND/",
                dataType: "json",
                data: {"json":JSON.stringify(dato)},
                async: true
            })
            .done(function(resultado)
            {
                let alerta:string = Principal.ArmarAlert(resultado.mensaje);
                $("#divResultado").html(alerta);
            })
            .fail(function (resultado:any) 
            {
                let alerta:string = Principal.ArmarAlert(resultado.responseJSON.mensaje, "danger");
                $("#divResultado").html(alerta);
            })  
        }

        public static EliminarAuto(id) : void
        {
            let jwt = localStorage.getItem("jwt");

            if (confirm("¿Desea eliminar el auto?"))
            {
                $.ajax
                ({
                    type: 'DELETE',
                    url: "./BACKEND/",
                    dataType: "json",
                    data: {"id":id},
                    headers : {"token":jwt},
                    async: true
                })
                .done(function(resultado)
                {
                    Principal.ListadoAutos();
                })
                .fail(function(resultado)
                {
                    if(resultado.responseJSON.mensaje == "Expired token")
                    {
                        window.location.replace("./login.html");
                    }

                    else
                    {
                        let alerta:string = Principal.ArmarAlert(resultado.responseJSON.mensaje, "danger");
                        $("#divResultado").html(alerta);
                    }
                })
            }
        }

        public static ModificarAuto(id) : void
        {
            let jwt = localStorage.getItem("jwt");
            let marca = $("#marca").val();
            let color = $("#color").val();
            let modelo = $("#modelo").val();
            let precio = $("#precio").val();

            let dato : any = {
                id : id,
                marca : marca,
                color : color,
                modelo : modelo,
                precio : precio
            }

            $.ajax({
                type: 'PUT',
                url: "./BACKEND/",
                dataType: "json",
                data: {"json":JSON.stringify(dato)},
                headers : {"token":jwt},
                async: true
            })
            .done(function(resultado)
            {
                let alerta:string = Principal.ArmarAlert(resultado.mensaje);
                $("#divResultado").html(alerta);
            })
            .fail(function (resultado:any) 
            {
                if(resultado.responseJSON.mensaje == "Expired token")
                {
                    window.location.replace("./login.html");
                }

                else
                {
                    let alerta:string = Principal.ArmarAlert(resultado.responseJSON.mensaje, "danger");
                    $("#divResultado").html(alerta);
                }
            })  
        }

        public static ObtenerAutosFiltrados():void 
        {
            $.ajax
            ({
                type: 'GET',
                url: "./BACKEND/autos",
                dataType: "json",
                data: {},
                async: true
            })
            .done(function (resultado) 
            {
                let objFiltrado = resultado.tabla.filter((auto, index, array) => auto.precio > 250888);
                let autos : any ={tabla : objFiltrado}
                let tabla:string = Principal.ArmarTablaAutos(autos);
                $("#divAutos").html(tabla);
            })
            .fail(function (resultado) 
            {
                let alerta:string = Principal.ArmarAlert(resultado.responseJSON.mensaje, "danger");
                $("#divResultado").html(alerta);
            });
        }

        public static ObtenerPreciosPromedio():void 
        {
            $.ajax
            ({
                type: 'GET',
                url: "./BACKEND/autos",
                dataType: "json",
                data: {},
                async: true
            })
            .done(function (resultado) 
            {
                let promedioPrecio = resultado.tabla.reduce((anterior, actual, index, array) => {
                    return anterior + parseFloat(actual.precio);
                }, 0) / resultado.tabla.length;
                let alerta:string = Principal.ArmarAlert("El promedio de todos los autos es: " + promedioPrecio, "info");
                $("#divResultado").html(alerta);
            })
            .fail(function (resultado) 
            {
                let alerta:string = Principal.ArmarAlert(resultado.responseJSON.mensaje, "danger");
                $("#divResultado").html(alerta);
            });
        }

        public static ObtenerEmpleados():void
        {
            $.ajax
            ({
                type: 'GET',
                url: "./BACKEND/",
                dataType: "json",
                data: {},
                async: true
            })
            .done(function (resultado) 
            {
                let objFiltrado = resultado.tabla.map((empleado, index, array) => {
                    let data : any = {nombre : empleado.nombre,foto : empleado.foto}
                    return data;
                });

                let tabla:string = '<table class="table table-hover" style="background-color: rgb(47, 153, 47)">';
                tabla += '<br><tr><th>NOMBRE</th><th>FOTO</th></tr>';
            
                objFiltrado.forEach(element => {
                    tabla += '<tr><td>'+element.nombre+'</td><th><img src="./BACKEND/fotos/'+element.foto+'" height=50 width=50 ></img></td></tr>';
                });
            
                tabla += "</table>";
               
                $("#divUsuario").html(tabla);
            })
            .fail(function (resultado) 
            {
                let alerta:string = Principal.ArmarAlert(resultado.responseJSON.mensaje, "danger");
                $("#divResultado").html(alerta);
            }); 
        }
    }
}