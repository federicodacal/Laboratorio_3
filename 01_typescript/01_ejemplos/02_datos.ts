//ARRAYS EN TYPESCRIPT
var vec1 : any = [1, true, "hola"];
var vec2 = [1, true, "hola"]; //por default es any, me indica var vec : (string | number | boolean) []

//var numeros : number[] = [1,2,true]; // Type boolean is not assignable to type number
//var numeros : number = [1,2,3]; // Type number[] is not assignable to type number;
var numeros : number[] = [1,2,3];
var otrosNumeros : Array<number> = [1,2,3];

//var eliminado : number = numeros.pop(); // Type number | undefined is not assignable to type number. Porque el pop puede retornar undefined si el array está vacío.
var eliminado : number | undefined = numeros.pop(); // Pop elimina el último elemento
//console.log(eliminado);

numeros.push(5); // Agregar nuevo elemento
//numeros.push("5"); // Error! Argument of type 'string' is not assignable to parameter of type 'number'
console.log(numeros); // Permite mostrar variables escalares y vectores

//ENUMS EN TYPESCRIPT
enum Ejemplo
{
    Basico,
    Intermedio,
    Avanzado
}

console.log(Ejemplo.Basico);

var e : Ejemplo = Ejemplo.Intermedio;
console.log(e);

//LET vs VAR
var foo : number = 123;
if(true) 
{ 
    var foo : number = 456; 
}
console.log(foo);

let foo2 : number = 123;
if(true) 
{ 
    let foo2 : number = 456; 
}
console.log(foo2);
