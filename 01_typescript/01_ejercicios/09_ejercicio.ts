/*
9. Realizar una función que solicite (por medio de un parámetro) un número. Si el número
es positivo, se mostrará el factorial de ese número, caso contrario se mostrará el cubo de
dicho número.
*/

console.log(OperacionNumero(0));
console.log(OperacionNumero(3));
console.log(OperacionNumero(4));
console.log(OperacionNumero(-2));
console.log(OperacionNumero(-3));
 
function OperacionNumero(numero : number) : number
{
    let resultado : number;

    if(numero > 0)
    {
        resultado = Factorial(numero);
    }
    else if(numero < 0)
    {
        resultado = Cubo(numero);
    }
    else
    {
        resultado = numero;
    }

    return resultado;
}

function Factorial(numero : number) : number
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
        return numero * Factorial(numero-1);
    }
}

function Cubo(numero:number):number
{
    return numero * numero * numero;
}
