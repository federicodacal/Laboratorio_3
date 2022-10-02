/// <reference path="./persona.ts" />
/// <reference path="./empleado.ts" />
/// <reference path="./fabrica.ts" />

let e1 = new Entidades.Empleado("Jorge", "Gomez", 5345096, 'M', 100, 2000);
let e2 = new Entidades.Empleado("Ana", "Perez", 44532123, 'F', 101, 2500);
let e3 = new Entidades.Empleado("Ricardo", "Suarez", 67321746, 'M', 102, 3000);

console.log(e1.ToString());
console.log(e2.ToString());
console.log(e3.ToString());

console.log("\n");

let fabrica = new Entidades.Fabrica("Coca-Cola");

fabrica.AgregarEmpleado(e1);
fabrica.AgregarEmpleado(e2);
fabrica.AgregarEmpleado(e3);
fabrica.AgregarEmpleado(new Entidades.Empleado("Juan", "Gimenez", 67321746, 'M', 102, 3000)); // DNI Repetido

console.log(fabrica.ToString());
console.log("\n");

fabrica.EliminarEmpleado(e1);

console.log(fabrica.ToString());
console.log("\n");
