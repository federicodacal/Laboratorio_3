"use strict";
var Manejador4;
(function (Manejador4) {
    function RealizarOperacion() {
        let operando1 = parseInt(document.getElementById("operando1").value);
        let operando2 = parseInt(document.getElementById("operando2").value);
        let radio = document.getElementsByTagName("input");
        let operador = "";
        for (let i = 0; i < radio.length; i++) {
            if (radio[i].type == "radio") {
                if (radio[i].checked) {
                    operador = radio[i].value;
                    break;
                }
            }
        }
        let mensaje = "";
        let resultado;
        switch (operador) {
            case '+':
                resultado = operando1 + operando2;
                mensaje = `${operando1} + ${operando2} = ${resultado}`;
                break;
            case '-':
                resultado = operando1 - operando2;
                mensaje = `${operando1} - ${operando2} = ${resultado}`;
                break;
            case '*':
                resultado = operando1 * operando2;
                mensaje = `${operando1} * ${operando2} = ${resultado}`;
                break;
            case '/':
                if (operando2 != 0) {
                    resultado = operando1 / operando2;
                    mensaje = `${operando1} / ${operando2} = ${resultado}`;
                }
                else {
                    mensaje = "La división por 0 no está definida";
                }
                break;
            default:
                mensaje = "Error";
                break;
        }
        console.log(mensaje);
    }
    Manejador4.RealizarOperacion = RealizarOperacion;
})(Manejador4 || (Manejador4 = {}));
//# sourceMappingURL=manejador4.js.map