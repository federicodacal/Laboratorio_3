"use strict";
window.onload = () => {
    let btnEnviar = document.getElementById("btnEnviar");
    btnEnviar.onclick = () => {
        let cboAccion = document.getElementById("cboAccion");
        switch (cboAccion.value) {
            case "listar":
                ObtenerListado();
                break;
            case "verificar":
                Verificar();
                break;
            case "agregar":
                Agregar();
                break;
            case "modificar":
                Modificar();
                break;
            case "borrar":
                Borrar();
                break;
            case "obtener":
                Obtener();
                break;
            case "redirigir":
                Redirigir();
                break;
        }
    };
};
let xhttp = new XMLHttpRequest();
function ObtenerListado() {
    xhttp.open("GET", "./BACKEND/nexo_poo_foto.php?accion=listar", true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            document.getElementById("divAlumnos").innerHTML = xhttp.responseText;
        }
    };
}
function Agregar() {
    let legajo = parseInt(document.getElementById("legajo").value);
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let foto = document.getElementById("foto");
    xhttp.open("POST", "./BACKEND/nexo_poo_foto.php", true);
    let form = new FormData();
    form.append('accion', 'agregar');
    form.append('legajo', legajo.toString());
    form.append('nombre', nombre);
    form.append('apellido', apellido);
    form.append('foto', foto.files[0]);
    xhttp.send(form);
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            document.getElementById("divAlumnos").innerHTML = xhttp.responseText;
        }
    };
}
function Verificar() {
    let legajo = parseInt(document.getElementById("legajo").value);
    xhttp.open("POST", "./BACKEND/nexo_poo_foto.php", true);
    let form = new FormData();
    form.append('accion', 'verificar');
    form.append('legajo', legajo.toString());
    xhttp.send(form);
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            document.getElementById("divAlumnos").innerHTML = xhttp.responseText;
        }
    };
}
function Modificar() {
    let legajo = parseInt(document.getElementById("legajo").value);
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let foto = document.getElementById("foto");
    xhttp.open("POST", "./BACKEND/nexo_poo_foto.php", true);
    let form = new FormData();
    form.append('accion', 'modificar');
    form.append('legajo', legajo.toString());
    form.append('nombre', nombre);
    form.append('apellido', apellido);
    form.append('foto', foto.files[0]);
    xhttp.send(form);
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            document.getElementById("divAlumnos").innerHTML = xhttp.responseText;
        }
    };
}
function Borrar() {
    let legajo = parseInt(document.getElementById("legajo").value);
    xhttp.open("POST", "./BACKEND/nexo_poo_foto.php", true);
    let form = new FormData();
    form.append('accion', 'borrar');
    form.append('legajo', legajo.toString());
    xhttp.send(form);
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            document.getElementById("divAlumnos").innerHTML = xhttp.responseText;
        }
    };
}
function Obtener() {
    let legajo = parseInt(document.getElementById("legajo").value);
    xhttp.open("POST", "./BACKEND/nexo_poo_foto.php", true);
    let form = new FormData();
    form.append('accion', 'obtener');
    form.append('legajo', legajo.toString());
    xhttp.send(form);
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            document.getElementById("divAlumnos").innerHTML = xhttp.responseText;
        }
    };
}
function Redirigir() {
    let legajo = parseInt(document.getElementById("legajo").value);
    xhttp.open("POST", "./BACKEND/nexo_poo_foto.php", true);
    let form = new FormData();
    form.append('accion', 'redirigir');
    form.append('legajo', legajo.toString());
    xhttp.send(form);
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
        }
    };
}
//# sourceMappingURL=front.js.map