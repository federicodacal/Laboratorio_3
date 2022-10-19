namespace Ejercicios
{
    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    export function Enviar() : void
    {
        let producto : any = {"codigoBarra" : 100, "nombre" : "Alfajor", "precio" : 50};
        let pagina : string = './mostrarJson.php';

        xhttp.open('POST', pagina, true);

        let form : FormData = new FormData();

        form.append('producto_json', JSON.stringify(producto));

        xhttp.send(form);

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                let response : string = xhttp.responseText;
                console.log(response);
                //window.location.href = pagina;
            }
        };
    }
}