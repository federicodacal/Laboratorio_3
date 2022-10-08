var Manejador4;
(function (Manejador4) {
    function RealizarOperacion() {
        var operando1 = parseInt(document.getElementById("operando1").value);
        var operando2 = parseInt(document.getElementById("operando2").value);
        var radio = document.getElementsByTagName("input");
        var operador = "";
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].type == "radio") {
                if (radio[i].checked) {
                    operador = radio[i].value;
                    break;
                }
            }
        }
        var mensaje = "";
        var resultado;
        switch (operador) {
            case '+':
                resultado = operando1 + operando2;
                mensaje = "".concat(operando1, " + ").concat(operando2, " = ").concat(resultado);
                break;
            case '-':
                resultado = operando1 - operando2;
                mensaje = "".concat(operando1, " - ").concat(operando2, " = ").concat(resultado);
                break;
            case '*':
                resultado = operando1 * operando2;
                mensaje = "".concat(operando1, " * ").concat(operando2, " = ").concat(resultado);
                break;
            case '/':
                if (operando2 != 0) {
                    resultado = operando1 / operando2;
                    mensaje = "".concat(operando1, " / ").concat(operando2, " = ").concat(resultado);
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
