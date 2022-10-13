var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Producto = /** @class */ (function () {
        function Producto(nombre, origen) {
            this.nombre = nombre;
            this.origen = origen;
        }
        Producto.prototype.ToString = function () {
            return "\"nombre\":\"".concat(this.nombre, "\",\"origen\":\"").concat(this.origen, "\"");
        };
        Producto.prototype.ToJSON = function () {
            return "{".concat(this.ToString(), "}");
        };
        return Producto;
    }());
    Entidades.Producto = Producto;
})(Entidades || (Entidades = {}));
var Entidades;
(function (Entidades) {
    var ProductoEnvasado = /** @class */ (function (_super) {
        __extends(ProductoEnvasado, _super);
        function ProductoEnvasado(nombre, origen, codigoBarra, precio, pathFoto, id) {
            if (nombre === void 0) { nombre = ""; }
            if (origen === void 0) { origen = ""; }
            if (codigoBarra === void 0) { codigoBarra = ""; }
            if (precio === void 0) { precio = 0; }
            if (pathFoto === void 0) { pathFoto = ""; }
            if (id === void 0) { id = 0; }
            var _this = _super.call(this, nombre, origen) || this;
            _this.codigoBarra = codigoBarra;
            _this.precio = precio;
            ;
            _this.pathFoto = pathFoto;
            _this.id = id;
            return _this;
        }
        ProductoEnvasado.prototype.ToJSON = function () {
            return "{".concat(_super.prototype.ToString, ",\"codigoBarra\":\"").concat(this.codigoBarra, "\",\"precio\":").concat(this.precio, ",\"pathFoto\":\"").concat(this.pathFoto, "\",\"id\":").concat(this.id, "}");
        };
        return ProductoEnvasado;
    }(Entidades.Producto));
    Entidades.ProductoEnvasado = ProductoEnvasado;
})(Entidades || (Entidades = {}));
/// <reference path='./Producto.ts'/>
/// <reference path='./ProductoEnvasado.ts'/>
/// <reference path='Iparte2.ts'/>
/// <reference path='Iparte3.ts'/>
var PrimerParcial;
(function (PrimerParcial) {
    var xhttp = new XMLHttpRequest();
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarProductoJSON = function () {
            var nombre = document.getElementById('nombre').value;
            var origen = document.getElementById('cboOrigen').value;
            xhttp.open('POST', './BACKEND/AltaProductoJSON.php', true);
            var form = new FormData();
            form.append('nombre', nombre);
            form.append('origen', origen);
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        };
        Manejadora.MostrarProductosJSON = function () {
            xhttp.open('GET', './BACKEND/ListadoProductosJSON.php', true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var productos = JSON.parse(xhttp.responseText);
                    var response_1 = "<table>\n                    <tr>\n                        <th>Nombre</th>\n                        <th>Origen</th>\n                    </tr>";
                    productos.forEach(function (producto) {
                        response_1 += "<tr>\n                            <td>".concat(producto.nombre, "</td>\n                            <td>").concat(producto.origen, "</td>\n                            </tr>");
                    });
                    response_1 += "</table>";
                    document.getElementById('divTabla').innerHTML = response_1;
                }
            };
        };
        Manejadora.VerificarProductoJSON = function () {
            var nombre = document.getElementById('nombre').value;
            var origen = document.getElementById('cboOrigen').value;
            xhttp.open('POST', './BACKEND/VerificarProductoJSON.php', true);
            var form = new FormData();
            form.append('nombre', nombre);
            form.append('origen', origen);
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        };
        Manejadora.MostrarInfoCookie = function () {
            var nombre = document.getElementById('nombre').value;
            var origen = document.getElementById('cboOrigen').value;
            xhttp.open('GET', "./BACKEND/MostrarCookie.php?nombre=".concat(nombre, "&origen=").concat(origen), true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    document.getElementById('divInfo').innerHTML = xhttp.responseText;
                }
            };
        };
        Manejadora.AgregarProductoSinFoto = function () {
            var nombre = document.getElementById('nombre').value;
            var origen = document.getElementById('cboOrigen').value;
            var codigoBarra = document.getElementById('codigoBarra').value;
            var producto = new Entidades.ProductoEnvasado(nombre, origen, codigoBarra);
            var producto_json = JSON.stringify(producto);
            xhttp.open('POST', './BACKEND/AgregarProductoSinFoto.php', true);
            var form = new FormData();
            form.append('producto_json', producto_json);
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        };
        Manejadora.MostrarProductosEnvasados = function (modif_foto) {
            xhttp.open('GET', './BACKEND/ListadoProductosEnvasados.php?tabla=json', true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var productos = JSON.parse(xhttp.responseText);
                    var response_2 = "<table>\n                    <tr>\n                        <th>ID</th>\n                        <th>Nombre</th>\n                        <th>Origen</th>\n                        <th>Codigo Barra</th>\n                        <th>Precio</th>\n                        <th>Path Foto</th>\n                        <th>Foto</th>\n                        <th colspan=\"2\">Acciones</th>\n                    </tr>";
                    productos.forEach(function (producto) {
                        var producto_json = JSON.stringify(producto);
                        if (modif_foto) {
                            response_2 += "<tr>\n                            <td>".concat(producto.id, "</td>\n                            <td>").concat(producto.nombre, "</td>\n                            <td>").concat(producto.origen, "</td>\n                            <td>").concat(producto.codigoBarra, "</td>\n                            <td>$").concat(producto.precio, "</td>\n                            <td>").concat(producto.pathFoto, "</td>\n                            <td>\n                                <img src='./BACKEND/").concat(producto.pathFoto, "' alt='Nope' width='50px' height='50px'></td>\n                            </td>\n                            <td> \n                                <input type='button' value='Modificar' onclick=PrimerParcial.Manejadora.ModificarProductoFoto(").concat(producto_json, ")>\n                            </td>\n                            <td> \n                                <input type='button' value='Eliminar' onclick=PrimerParcial.Manejadora.BorrarProductoFoto(").concat(producto_json, ")>\n                            </td>\n                            </tr>");
                        }
                        else {
                            response_2 += "<tr>\n                            <td>".concat(producto.id, "</td>\n                            <td>").concat(producto.nombre, "</td>\n                            <td>").concat(producto.origen, "</td>\n                            <td>").concat(producto.codigoBarra, "</td>\n                            <td>$").concat(producto.precio, "</td>\n                            <td>").concat(producto.pathFoto, "</td>\n                            <td>\n                                <img src='./BACKEND/").concat(producto.pathFoto, "' alt='Nope' width='50px' height='50px'></td>\n                            </td>\n                            <td> \n                                <input type='button' value='Modificar' onclick=PrimerParcial.Manejadora.Modificar(").concat(producto_json, ")>\n                            </td>\n                            <td> \n                                <input type='button' value='Eliminar' onclick=PrimerParcial.Manejadora.Eliminar(").concat(producto_json, ")>\n                            </td>\n                            </tr>");
                        }
                    });
                    response_2 += "</table>";
                    document.getElementById('divTabla').innerHTML = response_2;
                }
            };
        };
        Manejadora.Eliminar = function (obj_json) {
            var manejadora = new Manejadora();
            manejadora.EliminarProducto(obj_json);
        };
        Manejadora.Modificar = function (obj_json) {
            var manejadora = new Manejadora();
            manejadora.ModificarProducto(obj_json);
        };
        Manejadora.prototype.EliminarProducto = function (obj_json) {
            var respuesta = confirm("\u00BFConfirma eliminar a producto ".concat(obj_json.nombre, ", origen: ").concat(obj_json.origen, "?"));
            if (respuesta) {
                xhttp.open('POST', './BACKEND/EliminarProductoEnvasado.php', true);
                var form = new FormData();
                form.append('producto_json', JSON.stringify(obj_json));
                xhttp.send(form);
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        var json = xhttp.responseText;
                        var response = JSON.parse(json);
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
        };
        Manejadora.prototype.ModificarProducto = function (obj_json) {
            document.getElementById("idProducto").value = obj_json.id;
            document.getElementById("nombre").value = obj_json.nombre;
            document.getElementById("codigoBarra").value = obj_json.codigoBarra;
            document.getElementById("cboOrigen").value = obj_json.origen;
            document.getElementById("precio").value = obj_json.precio;
            document.getElementById("idProducto").disabled = true;
        };
        Manejadora.ModificarProd = function () {
            var id = parseInt(document.getElementById("idProducto").value);
            var nombre = document.getElementById("nombre").value;
            var precio = parseFloat(document.getElementById("precio").value);
            var codigoBarra = document.getElementById("codigoBarra").value;
            var origen = document.getElementById("cboOrigen").value;
            var producto = new Entidades.ProductoEnvasado(nombre, origen, codigoBarra, precio, "", id);
            var producto_json = JSON.stringify(producto);
            xhttp.open('POST', './BACKEND/ModificarProductoEnvasado.php', true);
            var form = new FormData();
            form.append('producto_json', producto_json);
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var response = JSON.parse(xhttp.responseText);
                    if (response.exito) {
                        Manejadora.MostrarProductosEnvasados(false);
                    }
                    else {
                        alert(xhttp.responseText);
                        console.log(xhttp.responseText);
                    }
                }
            };
        };
        Manejadora.VerificarProductoEnvasado = function () {
            var nombre = document.getElementById('nombre').value;
            var origen = document.getElementById('cboOrigen').value;
            xhttp.open('POST', './BACKEND/VerificarProductoEnvasado.php', true);
            var producto = new Entidades.ProductoEnvasado(nombre, origen);
            var producto_json = JSON.stringify(producto);
            var form = new FormData();
            form.append('obj_producto', producto_json);
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        };
        Manejadora.AgregarProductoFoto = function () {
            var nombre = document.getElementById("nombre").value;
            var precio = parseFloat(document.getElementById("precio").value);
            var codigoBarra = document.getElementById("codigoBarra").value;
            var origen = document.getElementById("cboOrigen").value;
            var foto = document.getElementById("foto");
            xhttp.open('POST', './BACKEND/AgregarProductoEnvasado.php', true);
            var form = new FormData();
            form.append('nombre', nombre);
            form.append('origen', origen);
            form.append('codigoBarra', codigoBarra);
            form.append('precio', precio.toString());
            form.append('foto', foto.files[0]);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                    Manejadora.MostrarProductosEnvasados(true);
                }
            };
        };
        Manejadora.BorrarProductoFoto = function (obj_json) {
            var respuesta = confirm("\u00BFConfirma eliminar a producto ".concat(obj_json.nombre, ", codigo: ").concat(obj_json.codigoBarra));
            if (respuesta) {
                xhttp.open('POST', './BACKEND/BorrarProductoEnvasado.php', true);
                var form = new FormData();
                form.append('producto_json', JSON.stringify(obj_json));
                xhttp.send(form);
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        var json = xhttp.responseText;
                        console.log(json);
                        var response = JSON.parse(json);
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
        };
        Manejadora.ModificarProductoFoto = function (obj_json) {
            document.getElementById("idProducto").value = obj_json.id;
            document.getElementById("nombre").value = obj_json.nombre;
            document.getElementById("codigoBarra").value = obj_json.codigoBarra;
            document.getElementById("precio").value = obj_json.precio;
            document.getElementById("cboOrigen").value = obj_json.origen;
            var path = './BACKEND' + obj_json.pathFoto;
            document.getElementById('imgFoto').src = path;
            document.getElementById("idProducto").disabled = true;
        };
        Manejadora.ModificarProdFoto = function () {
            var id = parseInt(document.getElementById("idProducto").value);
            var nombre = document.getElementById("nombre").value;
            var codigoBarra = document.getElementById("codigoBarra").value;
            var origen = document.getElementById("cboOrigen").value;
            var precio = parseFloat(document.getElementById("precio").value);
            var foto = document.getElementById("foto");
            var producto = new Entidades.ProductoEnvasado(nombre, origen, codigoBarra, precio, "", id);
            var producto_json = JSON.stringify(producto);
            xhttp.open('POST', './BACKEND/ModificarProductoEnvasadoFoto.php', true);
            var form = new FormData();
            form.append('producto_json', producto_json);
            form.append("foto", foto.files[0]);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var response = JSON.parse(xhttp.responseText);
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
        };
        Manejadora.MostrarBorradosJSON = function () {
            xhttp.open('GET', './BACKEND/MostrarBorradosJSON.php', true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    document.getElementById('divInfo').innerHTML = xhttp.responseText;
                }
            };
        };
        Manejadora.MostrarFotosModificados = function () {
            xhttp.open('GET', './BACKEND/MostrarFotosDeModificados.php', true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    document.getElementById('divInfo').innerHTML = xhttp.responseText;
                }
            };
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {})); //
