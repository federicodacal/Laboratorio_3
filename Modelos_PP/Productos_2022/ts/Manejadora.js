"use strict";
/// <reference path='./Producto.ts'/>
/// <reference path='./ProductoEnvasado.ts'/>
/// <reference path='Iparte2.ts'/>
/// <reference path='Iparte3.ts'/>
var PrimerParcial;
(function (PrimerParcial) {
    let xhttp = new XMLHttpRequest();
    class Manejadora {
        static AgregarProductoJSON() {
            let nombre = document.getElementById('nombre').value;
            let origen = document.getElementById('cboOrigen').value;
            xhttp.open('POST', './BACKEND/AltaProductoJSON.php', true);
            let form = new FormData();
            form.append('nombre', nombre);
            form.append('origen', origen);
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }
        static MostrarProductosJSON() {
            xhttp.open('GET', './BACKEND/ListadoProductosJSON.php', true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let productos = JSON.parse(xhttp.responseText);
                    let response = `<table>
                    <tr>
                        <th>Nombre</th>
                        <th>Origen</th>
                    </tr>`;
                    productos.forEach((producto) => {
                        response += `<tr>
                            <td>${producto.nombre}</td>
                            <td>${producto.origen}</td>
                            </tr>`;
                    });
                    response += `</table>`;
                    document.getElementById('divTabla').innerHTML = response;
                }
            };
        }
        static VerificarProductoJSON() {
            let nombre = document.getElementById('nombre').value;
            let origen = document.getElementById('cboOrigen').value;
            xhttp.open('POST', './BACKEND/VerificarProductoJSON.php', true);
            let form = new FormData();
            form.append('nombre', nombre);
            form.append('origen', origen);
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }
        static MostrarInfoCookie() {
            let nombre = document.getElementById('nombre').value;
            let origen = document.getElementById('cboOrigen').value;
            xhttp.open('GET', `./BACKEND/MostrarCookie.php?nombre=${nombre}&origen=${origen}`, true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    document.getElementById('divInfo').innerHTML = xhttp.responseText;
                }
            };
        }
        static AgregarProductoSinFoto() {
            let nombre = document.getElementById('nombre').value;
            let origen = document.getElementById('cboOrigen').value;
            let codigoBarra = document.getElementById('codigoBarra').value;
            let producto = new Entidades.ProductoEnvasado(nombre, origen, codigoBarra);
            let producto_json = JSON.stringify(producto);
            xhttp.open('POST', './BACKEND/AgregarProductoSinFoto.php', true);
            let form = new FormData();
            form.append('producto_json', producto_json);
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }
        static MostrarProductosEnvasados(modif_foto) {
            xhttp.open('GET', './BACKEND/ListadoProductosEnvasados.php?tabla=json', true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let productos = JSON.parse(xhttp.responseText);
                    let response = `<table>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Origen</th>
                        <th>Codigo Barra</th>
                        <th>Precio</th>
                        <th>Path Foto</th>
                        <th>Foto</th>
                        <th colspan="2">Acciones</th>
                    </tr>`;
                    productos.forEach((producto) => {
                        let producto_json = JSON.stringify(producto);
                        if (modif_foto) {
                            response += `<tr>
                            <td>${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.origen}</td>
                            <td>${producto.codigoBarra}</td>
                            <td>$${producto.precio}</td>
                            <td>${producto.pathFoto}</td>
                            <td>
                                <img src='./BACKEND/${producto.pathFoto}' alt='Nope' width='50px' height='50px'></td>
                            </td>
                            <td> 
                                <input type='button' value='Modificar' onclick=PrimerParcial.Manejadora.ModificarProductoFoto(${producto_json})>
                            </td>
                            <td> 
                                <input type='button' value='Eliminar' onclick=PrimerParcial.Manejadora.BorrarProductoFoto(${producto_json})>
                            </td>
                            </tr>`;
                        }
                        else {
                            response += `<tr>
                            <td>${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.origen}</td>
                            <td>${producto.codigoBarra}</td>
                            <td>$${producto.precio}</td>
                            <td>${producto.pathFoto}</td>
                            <td>
                                <img src='./BACKEND/${producto.pathFoto}' alt='Nope' width='50px' height='50px'></td>
                            </td>
                            <td> 
                                <input type='button' value='Modificar' onclick=PrimerParcial.Manejadora.Modificar(${producto_json})>
                            </td>
                            <td> 
                                <input type='button' value='Eliminar' onclick=PrimerParcial.Manejadora.Eliminar(${producto_json})>
                            </td>
                            </tr>`;
                        }
                    });
                    response += `</table>`;
                    document.getElementById('divTabla').innerHTML = response;
                }
            };
        }
        static Eliminar(obj_json) {
            let manejadora = new Manejadora();
            manejadora.EliminarProducto(obj_json);
        }
        static Modificar(obj_json) {
            let manejadora = new Manejadora();
            manejadora.ModificarProducto(obj_json);
        }
        EliminarProducto(obj_json) {
            let respuesta = confirm(`¿Confirma eliminar a producto ${obj_json.nombre}, origen: ${obj_json.origen}?`);
            if (respuesta) {
                xhttp.open('POST', './BACKEND/EliminarProductoEnvasado.php', true);
                let form = new FormData();
                form.append('producto_json', JSON.stringify(obj_json));
                xhttp.send(form);
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        let json = xhttp.responseText;
                        let response = JSON.parse(json);
                        console.log(response);
                        if (response.exito) {
                            Manejadora.MostrarProductosEnvasados(false);
                        }
                    }
                };
            }
            else {
                console.log('Eliminar cancelado');
            }
        }
        ModificarProducto(obj_json) {
            document.getElementById("idProducto").value = obj_json.id;
            document.getElementById("nombre").value = obj_json.nombre;
            document.getElementById("codigoBarra").value = obj_json.codigoBarra;
            document.getElementById("cboOrigen").value = obj_json.origen;
            document.getElementById("precio").value = obj_json.precio;
            document.getElementById("idProducto").disabled = true;
        }
        static ModificarProd() {
            let id = parseInt(document.getElementById("idProducto").value);
            let nombre = document.getElementById("nombre").value;
            let precio = parseFloat(document.getElementById("precio").value);
            let codigoBarra = document.getElementById("codigoBarra").value;
            let origen = document.getElementById("cboOrigen").value;
            let producto = new Entidades.ProductoEnvasado(nombre, origen, codigoBarra, precio, "", id);
            let producto_json = JSON.stringify(producto);
            xhttp.open('POST', './BACKEND/ModificarProductoEnvasado.php', true);
            let form = new FormData();
            form.append('producto_json', producto_json);
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let response = JSON.parse(xhttp.responseText);
                    if (response.exito) {
                        Manejadora.MostrarProductosEnvasados(false);
                    }
                    else {
                        alert(xhttp.responseText);
                        console.log(xhttp.responseText);
                    }
                }
            };
        }
        static VerificarProductoEnvasado() {
            let nombre = document.getElementById('nombre').value;
            let origen = document.getElementById('cboOrigen').value;
            xhttp.open('POST', './BACKEND/VerificarProductoEnvasado.php', true);
            let producto = new Entidades.ProductoEnvasado(nombre, origen);
            let producto_json = JSON.stringify(producto);
            let form = new FormData();
            form.append('obj_producto', producto_json);
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }
        static AgregarProductoFoto() {
            let nombre = document.getElementById("nombre").value;
            let precio = parseFloat(document.getElementById("precio").value);
            let codigoBarra = document.getElementById("codigoBarra").value;
            let origen = document.getElementById("cboOrigen").value;
            let foto = document.getElementById("foto");
            xhttp.open('POST', './BACKEND/AgregarProductoEnvasado.php', true);
            let form = new FormData();
            form.append('nombre', nombre);
            form.append('origen', origen);
            form.append('codigoBarra', codigoBarra);
            form.append('precio', precio.toString());
            form.append('foto', foto.files[0]);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                    Manejadora.MostrarProductosEnvasados(true);
                }
            };
        }
        static BorrarProductoFoto(obj_json) {
            let respuesta = confirm(`¿Confirma eliminar a producto ${obj_json.nombre}, codigo: ${obj_json.codigoBarra}`);
            if (respuesta) {
                xhttp.open('POST', './BACKEND/BorrarProductoEnvasado.php', true);
                let form = new FormData();
                form.append('producto_json', JSON.stringify(obj_json));
                xhttp.send(form);
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        let json = xhttp.responseText;
                        console.log(json);
                        let response = JSON.parse(json);
                        if (response.exito) {
                            Manejadora.MostrarProductosEnvasados(true);
                        }
                        else {
                            console.log(json);
                            alert(json);
                        }
                    }
                };
            }
            else {
                console.log("Eliminar cancelado");
            }
        }
        static ModificarProductoFoto(obj_json) {
            document.getElementById("idProducto").value = obj_json.id;
            document.getElementById("nombre").value = obj_json.nombre;
            document.getElementById("codigoBarra").value = obj_json.codigoBarra;
            document.getElementById("precio").value = obj_json.precio;
            document.getElementById("cboOrigen").value = obj_json.origen;
            let path = './BACKEND' + obj_json.pathFoto;
            document.getElementById('imgFoto').src = path;
            document.getElementById("idProducto").disabled = true;
        }
        static ModificarProdFoto() {
            let id = parseInt(document.getElementById("idProducto").value);
            let nombre = document.getElementById("nombre").value;
            let codigoBarra = document.getElementById("codigoBarra").value;
            let origen = document.getElementById("cboOrigen").value;
            let precio = parseFloat(document.getElementById("precio").value);
            let foto = document.getElementById("foto");
            let producto = new Entidades.ProductoEnvasado(nombre, origen, codigoBarra, precio, "", id);
            let producto_json = JSON.stringify(producto);
            xhttp.open('POST', './BACKEND/ModificarProductoEnvasadoFoto.php', true);
            let form = new FormData();
            form.append('producto_json', producto_json);
            form.append("foto", foto.files[0]);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let response = JSON.parse(xhttp.responseText);
                    if (response.exito) {
                        Manejadora.MostrarProductosEnvasados(true);
                        alert(xhttp.responseText);
                    }
                    else {
                        alert(xhttp.responseText);
                        console.log(xhttp.responseText);
                    }
                }
            };
        }
        static MostrarBorradosJSON() {
            xhttp.open('GET', './BACKEND/MostrarBorradosJSON.php', true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    document.getElementById('divInfo').innerHTML = xhttp.responseText;
                }
            };
        }
        static MostrarFotosModificados() {
            xhttp.open('GET', './BACKEND/MostrarFotosDeModificados.php', true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    document.getElementById('divInfo').innerHTML = xhttp.responseText;
                }
            };
        }
    }
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {})); //
//# sourceMappingURL=Manejadora.js.map