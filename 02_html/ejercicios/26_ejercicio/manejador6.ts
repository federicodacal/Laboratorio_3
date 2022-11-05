window.onload = () => {
    RefrescarLista();
}

let materias : Array<string> = ['Programacion I', 'Programacion II', 'Programacion III'];

function RefrescarLista() : void 
{
    let lista : string = "<ol type='a'>";

    materias.forEach(element => {
        lista += `<li> ${element} </li>`;
    });

    lista += "</ol>";

    (<HTMLDivElement>document.getElementById("divMaterias")).innerHTML = lista;
}


function AgregarElemento() : void
{
    let materia : string = (<HTMLInputElement>document.getElementById("materia")).value;

    materias.push(materia);

    RefrescarLista();
}
