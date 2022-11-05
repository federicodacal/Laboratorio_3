"use strict";
var Manejador2;
(function (Manejador2) {
    function MostrarDatos() {
        let checkboxes = document.getElementsByTagName("input");
        let peliculas = new Array();
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type == "checkbox") {
                if (checkboxes[i].checked) {
                    peliculas.push(checkboxes[i].value);
                }
            }
        }
        console.clear();
        peliculas.forEach(peli => {
            console.log(peli);
        });
    }
    Manejador2.MostrarDatos = MostrarDatos;
})(Manejador2 || (Manejador2 = {}));
//# sourceMappingURL=manejador2.js.map