/*
4. Realizar una función que reciba un número y que muestre (por consola) un mensaje
como el siguiente:
El número 5 es impar, siendo 5 el número recibido como parámetro.
*/

esImpar(2);
esImpar(3);
esImpar(10);

function esImpar(numero:number):void
{
    if(numero % 2 == 0)
    {
        console.log(`El número ${numero} es par`);
    }
    else
    {
        console.log(`El número ${numero} es impar`);
    }
}