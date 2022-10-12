/// <reference path='./usuario.ts'/>
/// <reference path='./empleado.ts'/>

namespace ModeloParcial 
{
    let xhttp : XMLHttpRequest = new XMLHttpRequest();

/***************************************************************************************************** 
USUARIOS
******************************************************************************************************/

    export function AgregarUsuarioJSON() : void 
    {
        let nombre : string = (<HTMLInputElement>document.getElementById('nombre')).value;
        let correo : string = (<HTMLInputElement>document.getElementById('correo')).value;
        let clave : string = (<HTMLInputElement>document.getElementById('clave')).value;

        xhttp.open('POST', '../backend/AltaUsuarioJSON.php', true);

        let form : FormData = new FormData();

        form.append('nombre', nombre);
        form.append('correo', correo);
        form.append('clave', clave);

        xhttp.send(form);

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
                alert(xhttp.responseText);
            }
        };
    }

    export function MostrarUsuariosJSON() : void 
    {
        xhttp.open('GET', '../backend/ListadoUsuariosJSON.php', true);

        xhttp.send();

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {

               let usuarios : any = JSON.parse(xhttp.responseText);

               let response = 
               `<table>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Clave</th>
                </tr>`;

                usuarios.forEach((usuario : any)=> {
                    response += `<tr>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.correo}</td>
                        <td>${usuario.clave}</td>
                        </tr>`;
                });

                response += `</table>`;

                (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = response;
            }
        };
    }

    export function VerificarUsuarioJSON() : void 
    {
        let correo : string = (<HTMLInputElement>document.getElementById('correo')).value;
        let clave : string = (<HTMLInputElement>document.getElementById('clave')).value;

        let usuario_json : string = `{"correo":"${correo}", "clave":"${clave}"}`;

        xhttp.open('POST', '../backend/VerificarUsuarioJSON.php', true);

        let form : FormData = new FormData();

        form.append('usuario_json', usuario_json);

        xhttp.send(form);

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
                alert(xhttp.responseText);
            }
        };
    }

    export function AgregarUsuario() : void 
    {
        let nombre : string = (<HTMLInputElement>document.getElementById('nombre')).value;
        let correo : string = (<HTMLInputElement>document.getElementById('correo')).value;
        let clave : string = (<HTMLInputElement>document.getElementById('clave')).value;
        let cboPerfil : number = parseInt((<HTMLSelectElement>document.getElementById("cboPerfiles")).value);

        xhttp.open('POST', '../backend/AltaUsuario.php', true);

        let form : FormData = new FormData();

        form.append('nombre', nombre);
        form.append('correo', correo);
        form.append('clave', clave);
        form.append('id_perfil', cboPerfil.toString());

        xhttp.send(form);

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
                alert(xhttp.responseText);
            }
        };
    }

    export function MostrarUsuarios() : void 
    {
        xhttp.open('GET', '../backend/ListadoUsuarios.php?tabla=mostrar', true);

        xhttp.send();

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                let response = xhttp.responseText;

                console.log(response);
                alert(response);
                (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = response;
            }
        };
    }

    export function ModificarUsuario(obj_json : any) : void 
    {
        (<HTMLInputElement>document.getElementById("id")).value = obj_json.id;
        (<HTMLInputElement>document.getElementById("nombre")).value = obj_json.nombre;
        (<HTMLInputElement>document.getElementById("correo")).value = obj_json.correo;
        (<HTMLInputElement>document.getElementById("clave")).value = obj_json.clave;
        (<HTMLInputElement>document.getElementById("cboPerfiles")).value = obj_json.id_perfil;
        (<HTMLInputElement>document.getElementById("id")).disabled = true;
    }

    export function Modificar()
    {
        let id : number = parseInt((<HTMLInputElement>document.getElementById("id")).value);
        let nombre : string = (<HTMLInputElement>document.getElementById("nombre")).value;
        let correo : string = (<HTMLInputElement>document.getElementById("correo")).value; 
        let clave : string = (<HTMLInputElement>document.getElementById("clave")).value;
        let cboPerfil : number = parseInt((<HTMLInputElement>document.getElementById("cboPerfiles")).value);

        let usuario = new Entidades.Usuario(nombre,correo,clave,id,cboPerfil);

        let usuario_json = JSON.stringify(usuario);

        xhttp.open('POST', '../backend/ModificarUsuario.php', true);

        let form : FormData = new FormData();

        form.append('usuario_json', usuario_json);

        xhttp.send(form);

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                let json = xhttp.responseText;

                let response = JSON.parse(json);

                if(response.exito)
                {
                    MostrarUsuarios();
                }
                else 
                {
                    console.log(xhttp.responseText);
                    alert(xhttp.response)
                }
            }
        };
    }


    export function EliminarUsuario(obj_json : any) : void 
    {
        let respuesta = confirm(`¿Confirma eliminar a usuario ${obj_json.nombre}, correo: ${obj_json.correo}`);

        if(respuesta)
        {
            xhttp.open('POST', '../backend/EliminarUsuario.php', true);

            let form : FormData = new FormData();

            form.append('accion', 'borrar');
            form.append('id', obj_json.id);

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    let json = xhttp.responseText;
                    let response = JSON.parse(json);
                    
                    console.log(response);
    
                    if(response.exito)
                    {
                        MostrarUsuarios();
                    }
                }
            };
        }
        else 
        {
            console.log('Eliminar cancelado');
        }
    }

/***************************************************************************************************** 
EMPLEADOS
******************************************************************************************************/

    export function AgregarEmpleado() : void 
    {
        let nombre : string = (<HTMLInputElement>document.getElementById('nombre')).value;
        let correo : string = (<HTMLInputElement>document.getElementById('correo')).value;
        let clave : string = (<HTMLInputElement>document.getElementById('clave')).value;
        let cboPerfil : number = parseInt((<HTMLSelectElement>document.getElementById('cboPerfiles')).value);
        let sueldo : number = parseInt((<HTMLInputElement>document.getElementById("sueldo")).value);
        let foto : any = (<HTMLInputElement>document.getElementById("foto"));

        xhttp.open('POST', '../backend/AltaEmpleado.php', true);

        let form : FormData = new FormData();

        form.append('nombre', nombre);
        form.append('correo', correo);
        form.append('clave', clave);
        form.append('id_perfil', cboPerfil.toString());
        form.append('sueldo', sueldo.toString());
        form.append('foto', foto.files[0]);

        xhttp.setRequestHeader("enctype", "multipart/form-data");

        xhttp.send(form);

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
                alert(xhttp.responseText);
                MostrarEmpleado();
            }
        };
    }

    export function MostrarEmpleado() : void 
    {
        xhttp.open('GET', '../backend/ListadoEmpleados.php?tabla=mostrar', true);
        
        xhttp.send();

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                let response = xhttp.responseText;

                console.log(response);
                alert(response);
                (<HTMLDivElement>document.getElementById('divTablaEmpleados')).innerHTML = response;
            }
        };
    }

    export function EliminarEmpleado(obj_json : any) : void 
    {
        let respuesta = confirm(`¿Confirma eliminar a usuario ${obj_json.nombre}, sueldo: ${obj_json.sueldo}`);

        if(respuesta)
        {
            xhttp.open('POST', '../backend/EliminarEmpleado.php', true);

            let form : FormData = new FormData();

            form.append('accion', 'borrar');
            form.append('id', obj_json.id);

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    let json = xhttp.responseText;
                    let response = JSON.parse(json);
                    
                    console.log(response);
    
                    if(response.exito)
                    {
                        MostrarEmpleado();
                    }
                }
            };
        }
        else 
        {
            console.log("Eliminar cancelado");
        }
    }

    export function ModificarEmpleado(obj_json : any) : void 
    {
        (<HTMLInputElement>document.getElementById("id")).value = obj_json.id;
        (<HTMLInputElement>document.getElementById("nombre")).value = obj_json.nombre;
        (<HTMLInputElement>document.getElementById("correo")).value = obj_json.correo;
        (<HTMLInputElement>document.getElementById("clave")).value = obj_json.clave;
        (<HTMLInputElement>document.getElementById("cboPerfiles")).value = obj_json.id_perfil;
        (<HTMLInputElement>document.getElementById("sueldo")).value = obj_json.sueldo;
        
        (<HTMLImageElement>document.getElementById('imgFoto')).src = "." + obj_json.foto;

        (<HTMLInputElement>document.getElementById("id")).disabled = true;
    }

    export function ModificarEmp()
    {
        let id : number = parseInt((<HTMLInputElement>document.getElementById("id")).value);
        let nombre : string = (<HTMLInputElement>document.getElementById("nombre")).value;
        let correo : string = (<HTMLInputElement>document.getElementById("correo")).value; 
        let clave : string = (<HTMLInputElement>document.getElementById("clave")).value;
        let cboPerfil : number = parseInt((<HTMLInputElement>document.getElementById("cboPerfiles")).value);
        let sueldo : number = parseInt((<HTMLInputElement>document.getElementById("sueldo")).value);
        let foto : any = (<HTMLInputElement>document.getElementById("foto"));

        let empleado = new Entidades.Empleado(nombre,correo,clave,id,cboPerfil,"",sueldo,"");

        let empleado_json = JSON.stringify(empleado);

        xhttp.open('POST', '../backend/ModificarEmpleado.php', true);

        let form : FormData = new FormData();

        form.append('empleado_json', empleado_json);
        form.append("foto", foto.files[0]);

        xhttp.setRequestHeader("enctype", "multipart/form-data");

        xhttp.send(form);

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                let response = JSON.parse(xhttp.responseText);

                if(response.exito)
                {
                    MostrarEmpleado();
                }
                else 
                {
                    alert(xhttp.responseText)
                    console.log(xhttp.responseText);
                }
            }
        }        
    }
                
            
        
} // 

