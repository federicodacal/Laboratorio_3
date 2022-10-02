
window.onload = () => {
    
    let btnEnviar = <HTMLInputElement>document.getElementById("btnEnviar");  

    btnEnviar.onclick = () => {

        let cboAccion = <HTMLSelectElement>document.getElementById("cboAccion");

        switch(cboAccion.value)
        {
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
    }
};


let xhttp : XMLHttpRequest = new XMLHttpRequest();

function ObtenerListado() : void{
    xhttp.open("GET", "./BACKEND/nexo_poo_foto.php?accion=listar", true);

    xhttp.send();

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            console.log(xhttp.responseText);
            (<HTMLDivElement>document.getElementById("divAlumnos")).innerHTML=xhttp.responseText;
        }
    };
}

function Agregar() : void{
    let legajo : number = parseInt((<HTMLInputElement>document.getElementById("legajo")).value);
    let nombre : string = (<HTMLInputElement>document.getElementById("nombre")).value;
    let apellido : string = (<HTMLInputElement>document.getElementById("apellido")).value;
    let foto : any = (<HTMLInputElement>document.getElementById("foto"));

    xhttp.open("POST", "./BACKEND/nexo_poo_foto.php", true);

    let form : FormData = new FormData();

    form.append('accion', 'agregar');
    form.append('legajo', legajo.toString());
    form.append('nombre', nombre);
    form.append('apellido', apellido);
    form.append('foto', foto.files[0]);

    xhttp.setRequestHeader("enctype", "multipart/form-data");
    
    xhttp.send(form);

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            (<HTMLDivElement>document.getElementById("divAlumnos")).innerHTML=xhttp.responseText;
        }
    };
}

function Verificar() : void{
    let legajo : number = parseInt((<HTMLInputElement>document.getElementById("legajo")).value);

    xhttp.open("POST", "./BACKEND/nexo_poo_foto.php", true);

    let form : FormData = new FormData();

    form.append('accion', 'verificar');
    form.append('legajo', legajo.toString());

    xhttp.send(form);

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            (<HTMLDivElement>document.getElementById("divAlumnos")).innerHTML=xhttp.responseText;
        }
    };
}

function Modificar() : void{
    let legajo : number = parseInt((<HTMLInputElement>document.getElementById("legajo")).value);
    let nombre : string = (<HTMLInputElement>document.getElementById("nombre")).value;
    let apellido : string = (<HTMLInputElement>document.getElementById("apellido")).value;
    let foto : any = (<HTMLInputElement>document.getElementById("foto"));

    xhttp.open("POST", "./BACKEND/nexo_poo_foto.php", true);

    let form : FormData = new FormData();

    form.append('accion', 'modificar');
    form.append('legajo', legajo.toString());
    form.append('nombre', nombre);
    form.append('apellido', apellido);
    form.append('foto', foto.files[0]);

    xhttp.setRequestHeader("enctype", "multipart/form-data");
    
    xhttp.send(form);

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            (<HTMLDivElement>document.getElementById("divAlumnos")).innerHTML=xhttp.responseText;
        }
    };
}

function Borrar() : void{
    let legajo : number = parseInt((<HTMLInputElement>document.getElementById("legajo")).value);

    xhttp.open("POST", "./BACKEND/nexo_poo_foto.php", true);

    let form : FormData = new FormData();

    form.append('accion', 'borrar');
    form.append('legajo', legajo.toString());

    xhttp.setRequestHeader("enctype", "multipart/form-data");

    xhttp.send(form);

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            (<HTMLDivElement>document.getElementById("divAlumnos")).innerHTML=xhttp.responseText;
        }
    };
}

function Obtener() : void{
    let legajo : number = parseInt((<HTMLInputElement>document.getElementById("legajo")).value);

    xhttp.open("POST", "./BACKEND/nexo_poo_foto.php", true);

    let form : FormData = new FormData();

    form.append('accion', 'obtener');
    form.append('legajo', legajo.toString());

    xhttp.send(form);

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            (<HTMLDivElement>document.getElementById("divAlumnos")).innerHTML=xhttp.responseText;
        }
    };
}

function Redirigir() : void{
    let legajo : number = parseInt((<HTMLInputElement>document.getElementById("legajo")).value);

    xhttp.open("POST", "./BACKEND/nexo_poo_foto.php", true);

    let form : FormData = new FormData();

    form.append('accion', 'redirigir');
    form.append('legajo', legajo.toString());

    xhttp.send(form);

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
        }
    };
}