/*
6. Realizar una función que reciba como parámetro un número y que retorne el cubo del
mismo.
*/

console.log(CalcularCubo(2));
console.log(CalcularCubo(3)); 
console.log(CalcularCubo(5)); 
console.log(CalcularCubo(10));

function CalcularCubo(numero:number):number
{
    return numero * numero * numero;
}