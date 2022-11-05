window.onload = function () {
    RefrescarLista();
};
var materias = ['Programacion I', 'Programacion II', 'Programacion III'];
function RefrescarLista() {
    var lista = "<ol type='a'>";
    materias.forEach(function (element) {
        lista += "<li> ".concat(element, " </li>");
    });
    lista += "</ol>";
    document.getElementById("divMaterias").innerHTML = lista;
}
function AgregarElemento() {
    var materia = document.getElementById("materia").value;
    materias.push(materia);
    RefrescarLista();
}
