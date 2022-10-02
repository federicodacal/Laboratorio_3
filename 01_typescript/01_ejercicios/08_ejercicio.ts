/*
8. Crear una función que realice el cálculo factorial del número que recibe como parámetro.
*/

console.log(CalcularFactorial(1));
console.log(CalcularFactorial(2));
console.log(CalcularFactorial(3));
console.log(CalcularFactorial(5));
console.log(CalcularFactorial(-5));

function CalcularFactorial(numero : number) : number
{
    if(numero < 0)
    {
        numero = -numero;
    }
    
    if(numero == 0)
    {
        return 1;
    }
    else
    {
        return numero * CalcularFactorial(numero-1);
    }
}
