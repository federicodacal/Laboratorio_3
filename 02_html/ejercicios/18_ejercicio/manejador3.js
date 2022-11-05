"use strict";
var Manejador3;
(function (Manejador3) {
    function MostrarDatos() {
        let nombre = document.getElementById("nombre").value;
        let radio = document.getElementsByTagName("input");
        let opinion = "";
        for (let i = 0; i < radio.length; i++) {
            if (radio[i].type == "radio") {
                if (radio[i].checked) {
                    opinion = radio[i].value;
                    break;
                }
            }
        }
        console.clear();
        console.log(`${nombre} envió su opinión: ${opinion}`);
    }
    Manejador3.MostrarDatos = MostrarDatos;
})(Manejador3 || (Manejador3 = {}));
//# sourceMappingURL=manejador3.js.map