"use strict";
/// <reference path='./usuario.ts'/>
/// <reference path='./empleado.ts'/>
var ModeloParcial;
(function (ModeloParcial) {
    let xhttp = new XMLHttpRequest();
    /*****************************************************************************************************
    USUARIOS
    ******************************************************************************************************/
    function AgregarUsuarioJSON() {
        let nombre = document.getElementById('nombre').value;
        let correo = document.getElementById('correo').value;
        let clave = document.getElementById('clave').value;
        xhttp.open('POST', '../backend/AltaUsuarioJSON.php', true);
        let form = new FormData();
        form.append('nombre', nombre);
        form.append('correo', correo);
        form.append('clave', clave);
        xhttp.send(form);
        xhttp.onreadystatechange = () => {
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
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let usuarios = JSON.parse(xhttp.responseText);
                let response = `<table>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Clave</th>
                </tr>`;
                usuarios.forEach((usuario) => {
                    response += `<tr>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.correo}</td>
                        <td>${usuario.clave}</td>
                        </tr>`;
                });
                response += `</table>`;
                document.getElementById('divTabla').innerHTML = response;
            }
        };
    }
    ModeloParcial.MostrarUsuariosJSON = MostrarUsuariosJSON;
    function VerificarUsuarioJSON() {
        let correo = document.getElementById('correo').value;
        let clave = document.getElementById('clave').value;
        let usuario_json = `{"correo":"${correo}", "clave":"${clave}"}`;
        xhttp.open('POST', '../backend/VerificarUsuarioJSON.php', true);
        let form = new FormData();
        form.append('usuario_json', usuario_json);
        xhttp.send(form);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
                alert(xhttp.responseText);
            }
        };
    }
    ModeloParcial.VerificarUsuarioJSON = VerificarUsuarioJSON;
    function AgregarUsuario() {
        let nombre = document.getElementById('nombre').value;
        let correo = document.getElementById('correo').value;
        let clave = document.getElementById('clave').value;
        let cboPerfil = parseInt(document.getElementById("cboPerfiles").value);
        xhttp.open('POST', '../backend/AltaUsuario.php', true);
        let form = new FormData();
        form.append('nombre', nombre);
        form.append('correo', correo);
        form.append('clave', clave);
        form.append('id_perfil', cboPerfil.toString());
        xhttp.send(form);
        xhttp.onreadystatechange = () => {
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
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let response = xhttp.responseText;
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
        let id = parseInt(document.getElementById("id").value);
        let nombre = document.getElementById("nombre").value;
        let correo = document.getElementById("correo").value;
        let clave = document.getElementById("clave").value;
        let cboPerfil = parseInt(document.getElementById("cboPerfiles").value);
        let usuario = new Entidades.Usuario(nombre, correo, clave, id, cboPerfil);
        let usuario_json = JSON.stringify(usuario);
        xhttp.open('POST', '../backend/ModificarUsuario.php', true);
        let form = new FormData();
        form.append('usuario_json', usuario_json);
        xhttp.send(form);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let json = xhttp.responseText;
                let response = JSON.parse(json);
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
        let respuesta = confirm(`¿Confirma eliminar a usuario ${obj_json.nombre}, correo: ${obj_json.correo}`);
        if (respuesta) {
            xhttp.open('POST', '../backend/EliminarUsuario.php', true);
            let form = new FormData();
            form.append('accion', 'borrar');
            form.append('id', obj_json.id);
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let json = xhttp.responseText;
                    let response = JSON.parse(json);
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
        let nombre = document.getElementById('nombre').value;
        let correo = document.getElementById('correo').value;
        let clave = document.getElementById('clave').value;
        let cboPerfil = parseInt(document.getElementById('cboPerfiles').value);
        let sueldo = parseInt(document.getElementById("sueldo").value);
        let foto = document.getElementById("foto");
        xhttp.open('POST', '../backend/AltaEmpleado.php', true);
        let form = new FormData();
        form.append('nombre', nombre);
        form.append('correo', correo);
        form.append('clave', clave);
        form.append('id_perfil', cboPerfil.toString());
        form.append('sueldo', sueldo.toString());
        form.append('foto', foto.files[0]);
        xhttp.setRequestHeader("enctype", "multipart/form-data");
        xhttp.send(form);
        xhttp.onreadystatechange = () => {
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
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let response = xhttp.responseText;
                console.log(response);
                alert(response);
                document.getElementById('divTablaEmpleados').innerHTML = response;
            }
        };
    }
    ModeloParcial.MostrarEmpleado = MostrarEmpleado;
    function EliminarEmpleado(obj_json) {
        let respuesta = confirm(`¿Confirma eliminar a usuario ${obj_json.nombre}, sueldo: ${obj_json.sueldo}`);
        if (respuesta) {
            xhttp.open('POST', '../backend/EliminarEmpleado.php', true);
            let form = new FormData();
            form.append('accion', 'borrar');
            form.append('id', obj_json.id);
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let json = xhttp.responseText;
                    let response = JSON.parse(json);
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
        let id = parseInt(document.getElementById("id").value);
        let nombre = document.getElementById("nombre").value;
        let correo = document.getElementById("correo").value;
        let clave = document.getElementById("clave").value;
        let cboPerfil = parseInt(document.getElementById("cboPerfiles").value);
        let sueldo = parseInt(document.getElementById("sueldo").value);
        let foto = document.getElementById("foto");
        let empleado = new Entidades.Empleado(nombre, correo, clave, id, cboPerfil, "", sueldo, "");
        let empleado_json = JSON.stringify(empleado);
        xhttp.open('POST', '../backend/ModificarEmpleado.php', true);
        let form = new FormData();
        form.append('empleado_json', empleado_json);
        form.append("foto", foto.files[0]);
        xhttp.setRequestHeader("enctype", "multipart/form-data");
        xhttp.send(form);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let response = JSON.parse(xhttp.responseText);
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
//# sourceMappingURL=manejadora.js.map