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
    var Persona = /** @class */ (function () {
        function Persona(nombre, correo, clave) {
            this.nombre = nombre;
            this.correo = correo;
            this.clave = clave;
        }
        Persona.prototype.ToString = function () {
            return "\"nombre\":\"".concat(this.nombre, "\",\"correo\":\"").concat(this.correo, "\",\"clave\":\"").concat(this.clave, "\"");
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
var Entidades;
(function (Entidades) {
    var Usuario = /** @class */ (function (_super) {
        __extends(Usuario, _super);
        function Usuario(nombre, correo, clave, id, id_perfil, perfil) {
            if (perfil === void 0) { perfil = ""; }
            var _this = _super.call(this, nombre, correo, clave) || this;
            _this.id = id;
            _this.id_perfil = id_perfil;
            _this.perfil = perfil;
            return _this;
        }
        Usuario.prototype.ToJSON = function () {
            return _super.prototype.ToString.call(this) + ",\"id\":".concat(this.id, ",\"id_perfil\":").concat(this.id_perfil, ",\"perfil\":\"").concat(this.perfil, "\"");
        };
        return Usuario;
    }(Entidades.Persona));
    Entidades.Usuario = Usuario;
})(Entidades || (Entidades = {}));
var Entidades;
(function (Entidades) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, correo, clave, id, id_perfil, perfil, sueldo, foto) {
            var _this = _super.call(this, nombre, correo, clave, id, id_perfil, perfil) || this;
            _this.sueldo = sueldo;
            _this.foto = foto;
            return _this;
        }
        return Empleado;
    }(Entidades.Usuario));
    Entidades.Empleado = Empleado;
})(Entidades || (Entidades = {}));
/// <reference path='./usuario.ts'/>
/// <reference path='./empleado.ts'/>
var ModeloParcial;
(function (ModeloParcial) {
    var xhttp = new XMLHttpRequest();
    /*****************************************************************************************************
    USUARIOS
    ******************************************************************************************************/
    function AgregarUsuarioJSON() {
        var nombre = document.getElementById('nombre').value;
        var correo = document.getElementById('correo').value;
        var clave = document.getElementById('clave').value;
        xhttp.open('POST', '../backend/AltaUsuarioJSON.php', true);
        var form = new FormData();
        form.append('nombre', nombre);
        form.append('correo', correo);
        form.append('clave', clave);
        xhttp.send(form);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
                alert(xhttp.responseText);
            }
        };
    }
    ModeloParcial.AgregarUsuarioJSON = AgregarUsuarioJSON;
    function MostrarUsuariosJSON() {
        xhttp.open('GET', '../backend/ListadoUsuariosJSON.php', true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var usuarios = JSON.parse(xhttp.responseText);
                var response_1 = "<table>\n                <tr>\n                    <th>Nombre</th>\n                    <th>Correo</th>\n                    <th>Clave</th>\n                </tr>";
                usuarios.forEach(function (usuario) {
                    response_1 += "<tr>\n                        <td>".concat(usuario.nombre, "</td>\n                        <td>").concat(usuario.correo, "</td>\n                        <td>").concat(usuario.clave, "</td>\n                        </tr>");
                });
                response_1 += "</table>";
                document.getElementById('divTabla').innerHTML = response_1;
            }
        };
    }
    ModeloParcial.MostrarUsuariosJSON = MostrarUsuariosJSON;
    function VerificarUsuarioJSON() {
        var correo = document.getElementById('correo').value;
        var clave = document.getElementById('clave').value;
        var usuario_json = "{\"correo\":\"".concat(correo, "\", \"clave\":\"").concat(clave, "\"}");
        xhttp.open('POST', '../backend/VerificarUsuarioJSON.php', true);
        var form = new FormData();
        form.append('usuario_json', usuario_json);
        xhttp.send(form);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
                alert(xhttp.responseText);
            }
        };
    }
    ModeloParcial.VerificarUsuarioJSON = VerificarUsuarioJSON;
    function AgregarUsuario() {
        var nombre = document.getElementById('nombre').value;
        var correo = document.getElementById('correo').value;
        var clave = document.getElementById('clave').value;
        var cboPerfil = parseInt(document.getElementById("cboPerfiles").value);
        xhttp.open('POST', '../backend/AltaUsuario.php', true);
        var form = new FormData();
        form.append('nombre', nombre);
        form.append('correo', correo);
        form.append('clave', clave);
        form.append('id_perfil', cboPerfil.toString());
        xhttp.send(form);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
                alert(xhttp.responseText);
            }
        };
    }
    ModeloParcial.AgregarUsuario = AgregarUsuario;
    function MostrarUsuarios() {
        xhttp.open('GET', '../backend/ListadoUsuarios.php?tabla=mostrar', true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var response = xhttp.responseText;
                console.log(response);
                alert(response);
                document.getElementById('divTabla').innerHTML = response;
            }
        };
    }
    ModeloParcial.MostrarUsuarios = MostrarUsuarios;
    function ModificarUsuario(obj_json) {
        document.getElementById("id").value = obj_json.id;
        document.getElementById("nombre").value = obj_json.nombre;
        document.getElementById("correo").value = obj_json.correo;
        document.getElementById("clave").value = obj_json.clave;
        document.getElementById("cboPerfiles").value = obj_json.id_perfil;
        document.getElementById("id").disabled = true;
    }
    ModeloParcial.ModificarUsuario = ModificarUsuario;
    function Modificar() {
        var id = parseInt(document.getElementById("id").value);
        var nombre = document.getElementById("nombre").value;
        var correo = document.getElementById("correo").value;
        var clave = document.getElementById("clave").value;
        var cboPerfil = parseInt(document.getElementById("cboPerfiles").value);
        var usuario = new Entidades.Usuario(nombre, correo, clave, id, cboPerfil);
        var usuario_json = JSON.stringify(usuario);
        xhttp.open('POST', '../backend/ModificarUsuario.php', true);
        var form = new FormData();
        form.append('usuario_json', usuario_json);
        xhttp.send(form);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var json = xhttp.responseText;
                var response = JSON.parse(json);
                if (response.exito) {
                    MostrarUsuarios();
                }
                else {
                    console.log(xhttp.responseText);
                    alert(xhttp.response);
                }
            }
        };
    }
    ModeloParcial.Modificar = Modificar;
    function EliminarUsuario(obj_json) {
        var respuesta = confirm("\u00BFConfirma eliminar a usuario ".concat(obj_json.nombre, ", correo: ").concat(obj_json.correo));
        if (respuesta) {
            xhttp.open('POST', '../backend/EliminarUsuario.php', true);
            var form = new FormData();
            form.append('accion', 'borrar');
            form.append('id', obj_json.id);
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var json = xhttp.responseText;
                    var response = JSON.parse(json);
                    console.log(response);
                    if (response.exito) {
                        MostrarUsuarios();
                    }
                }
            };
        }
        else {
            console.log('Eliminar cancelado');
        }
    }
    ModeloParcial.EliminarUsuario = EliminarUsuario;
    /*****************************************************************************************************
    EMPLEADOS
    ******************************************************************************************************/
    function AgregarEmpleado() {
        var nombre = document.getElementById('nombre').value;
        var correo = document.getElementById('correo').value;
        var clave = document.getElementById('clave').value;
        var cboPerfil = parseInt(document.getElementById('cboPerfiles').value);
        var sueldo = parseInt(document.getElementById("sueldo").value);
        var foto = document.getElementById("foto");
        xhttp.open('POST', '../backend/AltaEmpleado.php', true);
        var form = new FormData();
        form.append('nombre', nombre);
        form.append('correo', correo);
        form.append('clave', clave);
        form.append('id_perfil', cboPerfil.toString());
        form.append('sueldo', sueldo.toString());
        form.append('foto', foto.files[0]);
        xhttp.setRequestHeader("enctype", "multipart/form-data");
        xhttp.send(form);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
                alert(xhttp.responseText);
                MostrarEmpleado();
            }
        };
    }
    ModeloParcial.AgregarEmpleado = AgregarEmpleado;
    function MostrarEmpleado() {
        xhttp.open('GET', '../backend/ListadoEmpleados.php?tabla=mostrar', true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var response = xhttp.responseText;
                console.log(response);
                alert(response);
                document.getElementById('divTablaEmpleados').innerHTML = response;
            }
        };
    }
    ModeloParcial.MostrarEmpleado = MostrarEmpleado;
    function EliminarEmpleado(obj_json) {
        var respuesta = confirm("\u00BFConfirma eliminar a usuario ".concat(obj_json.nombre, ", sueldo: ").concat(obj_json.sueldo));
        if (respuesta) {
            xhttp.open('POST', '../backend/EliminarEmpleado.php', true);
            var form = new FormData();
            form.append('accion', 'borrar');
            form.append('id', obj_json.id);
            xhttp.send(form);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var json = xhttp.responseText;
                    var response = JSON.parse(json);
                    console.log(response);
                    if (response.exito) {
                        MostrarEmpleado();
                    }
                }
            };
        }
        else {
            console.log("Eliminar cancelado");
        }
    }
    ModeloParcial.EliminarEmpleado = EliminarEmpleado;
    function ModificarEmpleado(obj_json) {
        document.getElementById("id").value = obj_json.id;
        document.getElementById("nombre").value = obj_json.nombre;
        document.getElementById("correo").value = obj_json.correo;
        document.getElementById("clave").value = obj_json.clave;
        document.getElementById("cboPerfiles").value = obj_json.id_perfil;
        document.getElementById("sueldo").value = obj_json.sueldo;
        document.getElementById('imgFoto').src = "." + obj_json.foto;
        document.getElementById("id").disabled = true;
    }
    ModeloParcial.ModificarEmpleado = ModificarEmpleado;
    function ModificarEmp() {
        var id = parseInt(document.getElementById("id").value);
        var nombre = document.getElementById("nombre").value;
        var correo = document.getElementById("correo").value;
        var clave = document.getElementById("clave").value;
        var cboPerfil = parseInt(document.getElementById("cboPerfiles").value);
        var sueldo = parseInt(document.getElementById("sueldo").value);
        var foto = document.getElementById("foto");
        var empleado = new Entidades.Empleado(nombre, correo, clave, id, cboPerfil, "", sueldo, "");
        var empleado_json = JSON.stringify(empleado);
        xhttp.open('POST', '../backend/ModificarEmpleado.php', true);
        var form = new FormData();
        form.append('empleado_json', empleado_json);
        form.append("foto", foto.files[0]);
        xhttp.setRequestHeader("enctype", "multipart/form-data");
        xhttp.send(form);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var response = JSON.parse(xhttp.responseText);
                if (response.exito) {
                    MostrarEmpleado();
                }
                else {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            }
        };
    }
    ModeloParcial.ModificarEmp = ModificarEmp;
})(ModeloParcial || (ModeloParcial = {})); // 
