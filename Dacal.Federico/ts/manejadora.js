"use strict";
/// <reference path='./neumatico.ts'/>
/// <reference path='./neumaticoBD.ts'/>
var PrimerParcial;
(function (PrimerParcial) {
    let xhttp = new XMLHttpRequest();
    class Manejadora {
        static AgregarNeumaticoJSON() {
            let marca = document.getElementById('marca').value;
            let medidas = document.getElementById('medidas').value;
            let precio = parseFloat(document.getElementById('precio').value);
            xhttp.open('POST', './BACKEND/altaNeumaticoJSON.php', true);
            let form = new FormData();
            form.append('marca', marca);
            form.append('medidas', medidas);
            form.append('precio', precio.toString());
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }
        static MostrarNeumaticosJSON() {
            xhttp.open('GET', './BACKEND/listadoNeumaticosJSON.php', true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let neumaticos = JSON.parse(xhttp.responseText);
                    let response = `<table>
                    <tr>
                        <th>Marca</th>
                        <th>Medidas</th>
                        <th>Precio</th>
                    </tr>`;
                    neumaticos.forEach((n) => {
                        response += `<tr>
                            <td>${n.marca}</td>
                            <td>${n.medidas}</td>
                            <td>$${n.precio}</td>
                            </tr>`;
                    });
                    response += `</table>`;
                    document.getElementById('divTabla').innerHTML = response;
                }
            };
        }
        static VerificarNeumaticoJSON() {
            let marca = document.getElementById('marca').value;
            let medidas = document.getElementById('medidas').value;
            xhttp.open('POST', './BACKEND/verificarNeumaticoJSON.php', true);
            let form = new FormData();
            form.append('marca', marca);
            form.append('medidas', medidas);
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }
        static AgregarNeumaticoSinFoto() {
            let marca = document.getElementById('marca').value;
            let medidas = document.getElementById('medidas').value;
            let precio = parseFloat(document.getElementById('precio').value);
            let neumatico = new Entidades.NeumaticoBD(marca, medidas, precio);
            let neumatico_json = JSON.stringify(neumatico);
            xhttp.open('POST', './BACKEND/agregarNeumaticoSinFoto.php', true);
            let form = new FormData();
            form.append('neumatico_json', neumatico_json);
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }
        static MostrarNeumaticosBD(foto = false) {
            xhttp.open('GET', './BACKEND/listadoNeumaticosBD.php?tabla=json', true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let neumaticos = JSON.parse(xhttp.responseText);
                    let response = `<table>
                    <tr>
                        <th>ID</th>
                        <th>Marca</th>
                        <th>Medidas</th>
                        <th>Precio</th>
                        <th>Path Foto</th>
                        <th>Foto</th>
                        <th colspan="2">Acciones</th>
                    </tr>`;
                    if (!foto) {
                        neumaticos.forEach((n) => {
                            let neumatico_json = JSON.stringify(n);
                            response += `<tr>
                            <td>${n.id}</td>
                            <td>${n.marca}</td>
                            <td>${n.medidas}</td>
                            <td>$${n.precio}</td>
                            <td>${n.pathFoto}</td>
                            <td>
                                <img src='./BACKEND/${n.pathFoto}' alt='Nope' width='50px' height='50px'></td>
                            </td>
                            <td> 
                                <input type='button' value='Modificar' onclick=PrimerParcial.Manejadora.ModificarNeumatico(${neumatico_json})>
                            </td>
                            <td> 
                                <input type='button' value='Eliminar' onclick=PrimerParcial.Manejadora.EliminarNeumatico(${neumatico_json})>
                            </td>
                            </tr>`;
                        });
                    }
                    else {
                        neumaticos.forEach((n) => {
                            let neumatico_json = JSON.stringify(n);
                            response += `<tr>
                            <td>${n.id}</td>
                            <td>${n.marca}</td>
                            <td>${n.medidas}</td>
                            <td>$${n.precio}</td>
                            <td>${n.pathFoto}</td>
                            <td>
                                <img src='./BACKEND/${n.pathFoto}' alt='Nope' width='50px' height='50px'></td>
                            </td>
                            <td> 
                                <input type='button' value='Modificar' onclick=PrimerParcial.Manejadora.ModificarNeumaticoBDFoto(${neumatico_json})>
                            </td>
                            <td> 
                                <input type='button' value='Eliminar' onclick=PrimerParcial.Manejadora.BorrarNeumaticoFoto(${neumatico_json})>
                            </td>
                            </tr>`;
                        });
                    }
                    response += `</table>`;
                    document.getElementById('divTabla').innerHTML = response;
                }
            };
        }
        static EliminarNeumatico(obj_json) {
            let respuesta = confirm(`¿Confirma eliminar a neumatico ${obj_json.marca}, medidas: ${obj_json.medidas}`);
            if (respuesta) {
                xhttp.open('POST', './BACKEND/eliminarNeumaticoBD.php', true);
                let form = new FormData();
                let neumatico_json = JSON.stringify(obj_json);
                form.append('neumatico_json', neumatico_json);
                xhttp.send(form);
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        let json = xhttp.responseText;
                        let response = JSON.parse(json);
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
        }
        static ModificarNeumatico(obj_json) {
            document.getElementById("idNeumatico").value = obj_json.id;
            document.getElementById("marca").value = obj_json.marca;
            document.getElementById("medidas").value = obj_json.medidas;
            document.getElementById("precio").value = obj_json.precio;
            document.getElementById("idNeumatico").disabled = true;
            if (obj_json.pathFoto != "") {
                let path = './BACKEND' + obj_json.pathFoto;
                document.getElementById('imgFoto').src = path;
            }
        }
        static Modificar() {
            let id = parseInt(document.getElementById("idNeumatico").value);
            let marca = document.getElementById("marca").value;
            let medidas = document.getElementById("medidas").value;
            let precio = parseFloat(document.getElementById("precio").value);
            let neumatico = new Entidades.NeumaticoBD(marca, medidas, precio, id);
            let neumatico_json = JSON.stringify(neumatico);
            xhttp.open('POST', './BACKEND/modificarNeumaticoBD.php', true);
            let form = new FormData();
            form.append('neumatico_json', neumatico_json);
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let json = xhttp.responseText;
                    let response = JSON.parse(json);
                    if (response.exito) {
                        Manejadora.MostrarNeumaticosBD();
                    }
                    else {
                        console.log(xhttp.responseText);
                        alert(xhttp.response);
                    }
                }
            };
        }
        static VerificarNeumaticoBD() {
            let marca = document.getElementById("marca").value;
            let medidas = document.getElementById("medidas").value;
            let neumatico = new Entidades.NeumaticoBD(marca, medidas);
            let obj_neumatico = JSON.stringify(neumatico);
            xhttp.open('POST', './BACKEND/verificarNeumaticoBD.php', true);
            let form = new FormData();
            form.append('obj_neumatico', obj_neumatico);
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                    document.getElementById('divInfo').innerHTML = xhttp.responseText;
                }
            };
        }
        static AgregarNeumaticoFoto() {
            let marca = document.getElementById('marca').value;
            let medidas = document.getElementById('medidas').value;
            let precio = parseFloat(document.getElementById('precio').value);
            let foto = document.getElementById("foto");
            xhttp.open('POST', './BACKEND/agregarNeumaticoBD.php', true);
            let form = new FormData();
            form.append('marca', marca);
            form.append('medidas', medidas);
            form.append('precio', precio.toString());
            form.append('foto', foto.files[0]);
            xhttp.setRequestHeader('enctype', 'multipart/form-data');
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                    Manejadora.MostrarNeumaticosBD(true);
                }
            };
        }
        static BorrarNeumaticoFoto(obj_json) {
            let respuesta = confirm(`¿Confirma eliminar a neumatico ${obj_json.marca}, medidas: ${obj_json.medidas}`);
            if (respuesta) {
                xhttp.open('POST', './BACKEND/eliminarNeumaticoBDFoto.php', true);
                let form = new FormData();
                form.append('neumatico_json', JSON.stringify(obj_json));
                xhttp.send(form);
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        let json = xhttp.responseText;
                        console.log(json);
                        let response = JSON.parse(json);
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
        }
        static ModificarNeumaticoBDFoto(obj_json) {
            document.getElementById("idNeumatico").value = obj_json.id;
            document.getElementById("marca").value = obj_json.marca;
            document.getElementById("medidas").value = obj_json.medidas;
            document.getElementById("precio").value = obj_json.precio;
            let path = './BACKEND' + obj_json.pathFoto;
            document.getElementById('imgFoto').src = path;
            document.getElementById("idNeumatico").disabled = true;
        }
        static ModificarNeumaticoFoto() {
            let id = parseInt(document.getElementById("idNeumatico").value);
            let marca = document.getElementById("marca").value;
            let medidas = document.getElementById("medidas").value;
            let precio = parseFloat(document.getElementById("precio").value);
            let foto = document.getElementById("foto");
            let neumatico = new Entidades.NeumaticoBD(marca, medidas, precio, id);
            let neumatico_json = JSON.stringify(neumatico);
            xhttp.open('POST', './BACKEND/modificarNeumaticoBDFoto.php', true);
            let form = new FormData();
            form.append('neumatico_json', neumatico_json);
            form.append('foto', foto.files[0]);
            xhttp.setRequestHeader('enctype', 'multipart/form-data');
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let response = JSON.parse(xhttp.responseText);
                    if (response.exito) {
                        Manejadora.MostrarNeumaticosBD(true);
                    }
                    else {
                        alert(xhttp.responseText);
                        console.log(xhttp.responseText);
                    }
                }
            };
        }
        static MostrarBorradosJSON() {
            xhttp.open('GET', './BACKEND/mostrarBorradosJSON.php', true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    document.getElementById('divInfo').innerHTML = xhttp.responseText;
                }
            };
        }
        static MostrarFotosModificados() {
            xhttp.open('GET', './BACKEND/mostrarFotosDeModificados.php', true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    document.getElementById('divTabla').innerHTML = xhttp.responseText;
                }
            };
        }
    }
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
