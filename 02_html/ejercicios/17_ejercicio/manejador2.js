var Manejador2;
(function (Manejador2) {
    function MostrarDatos() {
        var checkboxes = document.getElementsByTagName("input");
        var peliculas = new Array();
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type == "checkbox") {
                if (checkboxes[i].checked) {
                    peliculas.push(checkboxes[i].value);
                }
            }
        }
        console.clear();
        peliculas.forEach(function (peli) {
            console.log(peli);
        });
    }
    Manejador2.MostrarDatos = MostrarDatos;
})(Manejador2 || (Manejador2 = {}));
