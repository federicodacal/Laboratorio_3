"use strict";
var TestPrueba;
(function (TestPrueba) {
    let a1 = new Prueba.Alumno("Perez", "Juan", 1111);
    let a2 = new Prueba.Alumno("Gomez", "Pablo", 1112);
    let alumnos = [new Prueba.Alumno("Perez", "Pepe", 1113),
        new Prueba.Alumno("Rodriguez", "Juan Carlos", 1114),
        a1, a2];
    alumnos.forEach(item => console.log(item.ToString()));
})(TestPrueba || (TestPrueba = {}));
//# sourceMappingURL=mainEjercicio.js.map