/*
7. Se necesita mostrar por consola los primeros 20 números primos. Para ello realizar una
función.
*/

mostrarNumerosPrimos();

function mostrarNumerosPrimos() : void 
{
    let cont = 0;
    for(let i = 1; cont < 20; i++) 
    {
        if(contarDivisores(i) == 2)
        {
            cont++;
            console.log(`${cont}: ${i}`);
        }
    }
}

function contarDivisores(numero : number) : number
{
    let contDivisores = 0;
    for(let i = 0; i <= numero; i++)
    {
        if(numero % i == 0)
        {
            contDivisores++;
        }
    }
    return contDivisores;
}