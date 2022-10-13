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
    var Neumatico = /** @class */ (function () {
        function Neumatico(marca, medidas, precio) {
            this.marca = marca;
            this.medidas = medidas;
            this.precio = precio;
        }
        Neumatico.prototype.ToString = function () {
            return "\"marca\":\"".concat(this.marca, "\",\"medidas\":\"").concat(this.medidas, "\",\"precio\":").concat(this.precio);
        };
        Neumatico.prototype.ToJson = function () {
            return "{".concat(this.ToString(), "}");
        };
        return Neumatico;
    }());
    Entidades.Neumatico = Neumatico;
})(Entidades || (Entidades = {}));
var Entidades;
(function (Entidades) {
    var NeumaticoBD = /** @class */ (function (_super) {
        __extends(NeumaticoBD, _super);
        function NeumaticoBD(marca, medidas, precio, id, pathFoto) {
            if (marca === void 0) { marca = ""; }
            if (medidas === void 0) { medidas = ""; }
            if (precio === void 0) { precio = 0; }
            if (id === void 0) { id = 0; }
            if (pathFoto === void 0) { pathFoto = ""; }
            var _this = _super.call(this, marca, medidas, precio) || this;
            _this.id = id;
            _this.pathFoto = pathFoto;
            return _this;
        }
        NeumaticoBD.prototype.ToJson = function () {
            return "{".concat(this.ToString(), ",\"id\":").concat(this.id, ",\"pathFoto\":\"").concat(this.pathFoto, "\"}");
        };
        return NeumaticoBD;
    }(Entidades.Neumatico));
    Entidades.NeumaticoBD = NeumaticoBD;
})(Entidades || (Entidades = {}));
/// <reference path='./neumatico.ts'/>
/// <reference path='./neumaticoBD.ts'/>
var PrimerParcial;
(function (PrimerParcial) {
    var xhttp = new XMLHttpRequest();
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AltaNeumaticoJSON = function () {
            var marca = document.getElementById('marca').value;
            var medidas = document.getElementById('medidas').value;
            var precio = document.getElementById('precio').value;
            xhttp.open('POST', './BACKEND/altaNeumaticoJSON.php', true);
            var form = new FormData();
            form.append('marca', marca);
            form.append('medidas', medidas);
            form.append('precio', precio);
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        };
        Manejadora.MostrarNeumaticosJSON = function () {
            xhttp.open('GET', './BACKEND/listadoNeumaticosJSON.php', true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var neumaticos = JSON.parse(xhttp.responseText);
                    var response_1 = "<table>\n                    <tr>\n                        <th>Marca</th>\n                        <th>Medidas</th>\n                        <th>Precio</th>\n                    </tr>";
                    neumaticos.forEach(function (n) {
                        response_1 += "<tr>\n                            <td>".concat(n.marca, "</td>\n                            <td>").concat(n.medidas, "</td>\n                            <td>$").concat(n.precio, "</td>\n                            </tr>");
                    });
                    response_1 += "</table>";
                    document.getElementById('divTabla').innerHTML = response_1;
                }
            };
        };
        Manejadora.VerificarNeumaticoJSON = function () {
            var marca = document.getElementById('marca').value;
            var medidas = document.getElementById('medidas').value;
            xhttp.open('POST', './BACKEND/verificarNeumaticoJSON.php', true);
            var form = new FormData();
            form.append('marca', marca);
            form.append('medidas', medidas);
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        };
        Manejadora.AgregarNeumaticoSinFoto = function () {
            var marca = document.getElementById('marca').value;
            var medidas = document.getElementById('medidas').value;
            var precio = parseInt(document.getElementById('precio').value);
            var neumatico = new Entidades.NeumaticoBD(marca, medidas, precio);
            var neumatico_json = JSON.stringify(neumatico);
            xhttp.open('POST', './BACKEND/agregarNeumaticoSinFoto.php', true);
            var form = new FormData();
            form.append('neumatico_json', neumatico_json);
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        };
        Manejadora.MostrarNeumaticosBD = function (foto) {
            if (foto === void 0) { foto = false; }
            xhttp.open('GET', './BACKEND/listadoNeumaticosBD.php?tabla=json', true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var neumaticos = JSON.parse(xhttp.responseText);
                    var response_2 = "<table>\n                    <tr>\n                        <th>ID</th>\n                        <th>Marca</th>\n                        <th>Medidas</th>\n                        <th>Precio</th>\n                        <th>Path Foto</th>\n                        <th>Foto</th>\n                        <th colspan=\"2\">Acciones</th>\n                    </tr>";
                    if (!foto) {
                        neumaticos.forEach(function (n) {
                            var neumatico_json = JSON.stringify(n);
                            response_2 += "<tr>\n                            <td>".concat(n.id, "</td>\n                            <td>").concat(n.marca, "</td>\n                            <td>").concat(n.medidas, "</td>\n                            <td>$").concat(n.precio, "</td>\n                            <td>").concat(n.pathFoto, "</td>\n                            <td>\n                                <img src='./BACKEND/").concat(n.pathFoto, "' alt='Nope' width='50px' height='50px'></td>\n                            </td>\n                            <td> \n                                <input type='button' value='Modificar' onclick=PrimerParcial.Manejadora.ModificarNeumaticoBD(").concat(neumatico_json, ")>\n                            </td>\n                            <td> \n                                <input type='button' value='Eliminar' onclick=PrimerParcial.Manejadora.EliminarNeumaticoBD(").concat(neumatico_json, ")>\n                            </td>\n                            </tr>");
                        });
                    }
                    else {
                        neumaticos.forEach(function (n) {
                            var neumatico_json = JSON.stringify(n);
                            response_2 += "<tr>\n                            <td>".concat(n.id, "</td>\n                            <td>").concat(n.marca, "</td>\n                            <td>").concat(n.medidas, "</td>\n                            <td>$").concat(n.precio, "</td>\n                            <td>").concat(n.pathFoto, "</td>\n                            <td>\n                                <img src='./BACKEND/").concat(n.pathFoto, "' alt='Nope' width='50px' height='50px'></td>\n                            </td>\n                            <td> \n                                <input type='button' value='Modificar' onclick=PrimerParcial.Manejadora.ModificarNeumaticoBDFoto(").concat(neumatico_json, ")>\n                            </td>\n                            <td> \n                                <input type='button' value='Eliminar' onclick=PrimerParcial.Manejadora.EliminarNeumaticoBDFoto(").concat(neumatico_json, ")>\n                            </td>\n                            </tr>");
                        });
                    }
                    response_2 += "</table>";
                    document.getElementById('divTabla').innerHTML = response_2;
                }
            };
        };
        Manejadora.ModificarNeumaticoBD = function (obj_json) {
            document.getElementById("id").value = obj_json.id;
            document.getElementById("marca").value = obj_json.marca;
            document.getElementById("medidas").value = obj_json.medidas;
            document.getElementById("precio").value = obj_json.precio;
            document.getElementById("id").disabled = true;
        };
        Manejadora.Modificar = function () {
            var id = parseInt(document.getElementById("id").value);
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var precio = parseInt(document.getElementById("precio").value);
            var neumatico = new Entidades.NeumaticoBD(marca, medidas, precio, id);
            var neumatico_json = JSON.stringify(neumatico);
            xhttp.open('POST', './BACKEND/modificarNeumaticoBD.php', true);
            var form = new FormData();
            form.append('neumatico_json', neumatico_json);
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var json = xhttp.responseText;
                    var response = JSON.parse(json);
                    if (response.exito) {
                        Manejadora.MostrarNeumaticosBD();
                    }
                    else {
                        console.log(xhttp.responseText);
                        alert(xhttp.response);
                    }
                }
            };
        };
        Manejadora.EliminarNeumaticoBD = function (obj_json) {
            var respuesta = confirm("\u00BFConfirma eliminar a neumatico ".concat(obj_json.marca, ", medidas: ").concat(obj_json.medidas));
            if (respuesta) {
                xhttp.open('POST', './BACKEND/eliminarNeumaticoBD.php', true);
                var form = new FormData();
                var neumatico_json = JSON.stringify(obj_json);
                form.append('neumatico_json', neumatico_json);
                xhttp.send(form);
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        var json = xhttp.responseText;
                        var response = JSON.parse(json);
                        console.log(response);
                        if (response.exito) {
                            Manejadora.MostrarNeumaticosBD();
                        }
                    }
                };
            }
            else {
                console.log('Eliminar cancelado');
            }
        };
        Manejadora.VerificarNeumaticoBD = function () {
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var neumatico = new Entidades.NeumaticoBD(marca, medidas);
            var obj_neumatico = JSON.stringify(neumatico);
            xhttp.open('POST', './BACKEND/verificarNeumaticoBD.php', true);
            var form = new FormData();
            form.append('obj_neumatico', obj_neumatico);
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                    document.getElementById('divTabla').innerHTML = xhttp.responseText;
                }
            };
        };
        Manejadora.AgregarNeumaticoBD = function () {
            var marca = document.getElementById('marca').value;
            var medidas = document.getElementById('medidas').value;
            var precio = document.getElementById('precio').value;
            var foto = document.getElementById("foto");
            xhttp.open('POST', './BACKEND/agregarNeumaticoBD.php', true);
            var form = new FormData();
            form.append('marca', marca);
            form.append('medidas', medidas);
            form.append('precio', precio);
            form.append('foto', foto.files[0]);
            xhttp.setRequestHeader('enctype', 'multipart/form-data');
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                    Manejadora.MostrarNeumaticosBD(true);
                }
            };
        };
        Manejadora.EliminarNeumaticoBDFoto = function (obj_json) {
            var respuesta = confirm("\u00BFConfirma eliminar a neumatico ".concat(obj_json.marca, ", medidas: ").concat(obj_json.medidas));
            if (respuesta) {
                xhttp.open('POST', './BACKEND/eliminarNeumaticoBDFoto.php', true);
                var form = new FormData();
                form.append('neumatico_json', JSON.stringify(obj_json));
                xhttp.send(form);
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        var json = xhttp.responseText;
                        console.log(json);
                        var response = JSON.parse(json);
                        if (response.exito) {
                            Manejadora.MostrarNeumaticosBD(true);
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
        Manejadora.ModificarNeumaticoBDFoto = function (obj_json) {
            document.getElementById("id").value = obj_json.id;
            document.getElementById("marca").value = obj_json.marca;
            document.getElementById("medidas").value = obj_json.medidas;
            document.getElementById("precio").value = obj_json.precio;
            var path = './BACKEND' + obj_json.pathFoto;
            document.getElementById('imgFoto').src = path;
            document.getElementById("id").disabled = true;
        };
        Manejadora.ModificarNeumaticoFoto = function () {
            var id = parseInt(document.getElementById("id").value);
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var precio = parseInt(document.getElementById("precio").value);
            var foto = document.getElementById("foto");
            var neumatico = new Entidades.NeumaticoBD(marca, medidas, precio, id);
            var neumatico_json = JSON.stringify(neumatico);
            xhttp.open('POST', './BACKEND/modificarNeumaticoBDFoto.php', true);
            var form = new FormData();
            form.append('neumatico_json', neumatico_json);
            form.append('foto', foto.files[0]);
            xhttp.setRequestHeader('enctype', 'multipart/form-data');
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var response = JSON.parse(xhttp.responseText);
                    if (response.exito) {
                        Manejadora.MostrarNeumaticosBD(true);
                    }
                    else {
                        alert(xhttp.responseText);
                        console.log(xhttp.responseText);
                    }
                }
            };
        };
        Manejadora.MostrarBorradosJSON = function () {
            xhttp.open('GET', './BACKEND/mostrarBorradosJSON.php', true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    document.getElementById('divInfo').innerHTML = xhttp.responseText;
                }
            };
        };
        Manejadora.MostrarFotosModificados = function () {
            xhttp.open('GET', './BACKEND/mostrarFotosDeModificados.php', true);
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
})(PrimerParcial || (PrimerParcial = {}));
