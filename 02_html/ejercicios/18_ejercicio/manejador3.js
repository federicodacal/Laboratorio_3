var Manejador3;
(function (Manejador3) {
    function MostrarDatos() {
        var nombre = document.getElementById("nombre").value;
        var radio = document.getElementsByTagName("input");
        var opinion = "";
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].type == "radio") {
                if (radio[i].checked) {
                    opinion = radio[i].value;
                    break;
                }
            }
        }
        console.clear();
        console.log("".concat(nombre, " envi\u00F3 su opini\u00F3n: ").concat(opinion));
    }
    Manejador3.MostrarDatos = MostrarDatos;
})(Manejador3 || (Manejador3 = {}));
