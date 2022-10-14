/// <reference path='./neumatico.ts'/>
/// <reference path='./neumaticoBD.ts'/>

namespace PrimerParcial
{
    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    export class Manejadora 
    {
        public static AgregarNeumaticoJSON() : void 
        {
            let marca : string = (<HTMLInputElement>document.getElementById('marca')).value;
            let medidas : string = (<HTMLSelectElement>document.getElementById('medidas')).value;
            let precio : number = parseFloat((<HTMLSelectElement>document.getElementById('precio')).value);

            xhttp.open('POST', './BACKEND/altaNeumaticoJSON.php', true);

            let form : FormData = new FormData();

            form.append('marca', marca);
            form.append('medidas', medidas);
            form.append('precio', precio.toString());

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }

        public static MostrarNeumaticosJSON() : void
        {
            xhttp.open('GET', './BACKEND/listadoNeumaticosJSON.php', true);

            xhttp.send();

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {

                let neumaticos : any = JSON.parse(xhttp.responseText);

                let response = 
                `<table>
                    <tr>
                        <th>Marca</th>
                        <th>Medidas</th>
                        <th>Precio</th>
                    </tr>`;

                    neumaticos.forEach((n : any)=> {
                        response += `<tr>
                            <td>${n.marca}</td>
                            <td>${n.medidas}</td>
                            <td>$${n.precio}</td>
                            </tr>`;
                    });

                    response += `</table>`;

                    (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = response;
                }
            };
        }

        public static VerificarNeumaticoJSON() : void 
        {
            let marca : string = (<HTMLInputElement>document.getElementById('marca')).value;
            let medidas : string = (<HTMLSelectElement>document.getElementById('medidas')).value;

            xhttp.open('POST', './BACKEND/verificarNeumaticoJSON.php', true);

            let form : FormData = new FormData();

            form.append('marca', marca);
            form.append('medidas', medidas);

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }

        public static AgregarNeumaticoSinFoto() : void 
        {
            let marca : string = (<HTMLInputElement>document.getElementById('marca')).value;
            let medidas : string = (<HTMLSelectElement>document.getElementById('medidas')).value;
            let precio : number = parseFloat((<HTMLSelectElement>document.getElementById('precio')).value);

            let neumatico : Entidades.NeumaticoBD = new Entidades.NeumaticoBD(marca,medidas,precio);
            
            let neumatico_json : string = JSON.stringify(neumatico);

            xhttp.open('POST', './BACKEND/agregarNeumaticoSinFoto.php', true);

            let form : FormData = new FormData();

            form.append('neumatico_json', neumatico_json);

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }

        public static MostrarNeumaticosBD(foto : boolean=false) : void 
        {
            xhttp.open('GET', './BACKEND/listadoNeumaticosBD.php?tabla=json', true);

            xhttp.send();

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {

                let neumaticos : any = JSON.parse(xhttp.responseText);

                let response = 
                `<table>
                    <tr>
                        <th>ID</th>
                        <th>Marca</th>
                        <th>Medidas</th>
                        <th>Precio</th>
                        <th>Path Foto</th>
                        <th>Foto</th>
                        <th colspan="2">Acciones</th>
                    </tr>`;
                
                if(!foto)
                {
                    neumaticos.forEach((n : any)=> {

                        let neumatico_json : string = JSON.stringify(n);
    
                            response += `<tr>
                            <td>${n.id}</td>
                            <td>${n.marca}</td>
                            <td>${n.medidas}</td>
                            <td>$${n.precio}</td>
                            <td>${n.pathFoto}</td>
                            <td>
                                <img src='./BACKEND/${n.pathFoto}' alt='Nope' width='50px' height='50px'></td>
                            </td>
                            <td> 
                                <input type='button' value='Modificar' onclick=PrimerParcial.Manejadora.ModificarNeumatico(${neumatico_json})>
                            </td>
                            <td> 
                                <input type='button' value='Eliminar' onclick=PrimerParcial.Manejadora.EliminarNeumatico(${neumatico_json})>
                            </td>
                            </tr>`;
                    });
                }
                else 
                {
                    neumaticos.forEach((n : any)=> {

                        let neumatico_json : string = JSON.stringify(n);
    
                            response += `<tr>
                            <td>${n.id}</td>
                            <td>${n.marca}</td>
                            <td>${n.medidas}</td>
                            <td>$${n.precio}</td>
                            <td>${n.pathFoto}</td>
                            <td>
                                <img src='./BACKEND/${n.pathFoto}' alt='Nope' width='50px' height='50px'></td>
                            </td>
                            <td> 
                                <input type='button' value='Modificar' onclick=PrimerParcial.Manejadora.ModificarNeumaticoBDFoto(${neumatico_json})>
                            </td>
                            <td> 
                                <input type='button' value='Eliminar' onclick=PrimerParcial.Manejadora.BorrarNeumaticoFoto(${neumatico_json})>
                            </td>
                            </tr>`;
                    });
                }
                
                response += `</table>`;

                (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = response;
                }
            };
        }

        public static EliminarNeumatico(obj_json : any) : void 
        {
            let respuesta = confirm(`¿Confirma eliminar a neumatico ${obj_json.marca}, medidas: ${obj_json.medidas}`);

            if(respuesta)
            {
                xhttp.open('POST', './BACKEND/eliminarNeumaticoBD.php', true);

                let form : FormData = new FormData();

                let neumatico_json = JSON.stringify(obj_json);

                form.append('neumatico_json', neumatico_json);

                xhttp.send(form);

                xhttp.onreadystatechange = () => {
                    if(xhttp.readyState == 4 && xhttp.status == 200) {
                        let json = xhttp.responseText;
                        let response = JSON.parse(json);
                        
                        console.log(response);
        
                        if(response.exito)
                        {
                            Manejadora.MostrarNeumaticosBD();
                        }
                    }
                };
            }
            else 
            {
                console.log('Eliminar cancelado');
            }
        }

        public static ModificarNeumatico(obj_json : any) : void 
        {
            (<HTMLInputElement>document.getElementById("idNeumatico")).value = obj_json.id;
            (<HTMLInputElement>document.getElementById("marca")).value = obj_json.marca;
            (<HTMLInputElement>document.getElementById("medidas")).value = obj_json.medidas;
            (<HTMLInputElement>document.getElementById("precio")).value = obj_json.precio;

            (<HTMLInputElement>document.getElementById("idNeumatico")).disabled = true;

            if(obj_json.pathFoto != "")
            {
                let path : string = './BACKEND' + obj_json.pathFoto;
                (<HTMLImageElement>document.getElementById('imgFoto')).src = path;
            }
        }

        public static Modificar() : void 
        {
            let id : number = parseInt((<HTMLInputElement>document.getElementById("idNeumatico")).value);
            let marca : string = (<HTMLInputElement>document.getElementById("marca")).value;
            let medidas : string = (<HTMLInputElement>document.getElementById("medidas")).value;
            let precio : number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);
            
            let neumatico : Entidades.NeumaticoBD = new Entidades.NeumaticoBD(marca,medidas,precio,id);

            let neumatico_json : string = JSON.stringify(neumatico);

            xhttp.open('POST', './BACKEND/modificarNeumaticoBD.php', true);

            let form : FormData = new FormData();

            form.append('neumatico_json', neumatico_json);

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    let json = xhttp.responseText;
    
                    let response = JSON.parse(json);
    
                    if(response.exito)
                    {
                        Manejadora.MostrarNeumaticosBD();
                    }
                    else 
                    {
                        console.log(xhttp.responseText);
                        alert(xhttp.response)
                    }
                }
            };
        }

        public static VerificarNeumaticoBD() : void 
        {
            let marca : string = (<HTMLInputElement>document.getElementById("marca")).value;
            let medidas : string = (<HTMLInputElement>document.getElementById("medidas")).value;

            let neumatico : Entidades.NeumaticoBD = new Entidades.NeumaticoBD(marca,medidas);

            let obj_neumatico : string = JSON.stringify(neumatico);

            xhttp.open('POST', './BACKEND/verificarNeumaticoBD.php', true);

            let form : FormData = new FormData();

            form.append('obj_neumatico', obj_neumatico);

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                    (<HTMLDivElement>document.getElementById('divInfo')).innerHTML = xhttp.responseText;
                }
            };
        }

        public static AgregarNeumaticoFoto() : void 
        {
            let marca : string = (<HTMLInputElement>document.getElementById('marca')).value;
            let medidas : string = (<HTMLSelectElement>document.getElementById('medidas')).value;
            let precio : number = parseFloat((<HTMLSelectElement>document.getElementById('precio')).value);
            let foto : any = (<HTMLInputElement>document.getElementById("foto"));

            xhttp.open('POST', './BACKEND/agregarNeumaticoBD.php', true);

            let form : FormData = new FormData();

            form.append('marca', marca);
            form.append('medidas', medidas);
            form.append('precio', precio.toString());
            form.append('foto', foto.files[0]);

            xhttp.setRequestHeader('enctype', 'multipart/form-data');

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                    Manejadora.MostrarNeumaticosBD(true);
                }
            };
        }

        public static BorrarNeumaticoFoto(obj_json : any) : void 
        {
            let respuesta = confirm(`¿Confirma eliminar a neumatico ${obj_json.marca}, medidas: ${obj_json.medidas}`);

            if(respuesta)
            {
                xhttp.open('POST', './BACKEND/eliminarNeumaticoBDFoto.php', true);

                let form : FormData = new FormData();      

                form.append('neumatico_json', JSON.stringify(obj_json));

                xhttp.send(form);

                xhttp.onreadystatechange = () => {
                    if(xhttp.readyState == 4 && xhttp.status == 200) {
                        let json = xhttp.responseText;

                        console.log(json);

                        let response = JSON.parse(json);
        
                        if(response.exito)
                        {
                            Manejadora.MostrarNeumaticosBD(true);
                        }
                        else 
                        {
                            console.log(json);
                            alert(json);
                        }
                    }
                };
            }
            else 
            {
                console.log("Eliminar cancelado");
            }
        }

        public static ModificarNeumaticoBDFoto(obj_json : any) : void 
        {
            (<HTMLInputElement>document.getElementById("idNeumatico")).value = obj_json.id;
            (<HTMLInputElement>document.getElementById("marca")).value = obj_json.marca;
            (<HTMLInputElement>document.getElementById("medidas")).value = obj_json.medidas;
            (<HTMLInputElement>document.getElementById("precio")).value = obj_json.precio;
            
            let path : string = './BACKEND' + obj_json.pathFoto;
            (<HTMLImageElement>document.getElementById('imgFoto')).src = path;

            (<HTMLInputElement>document.getElementById("idNeumatico")).disabled = true;
        }

        public static ModificarNeumaticoFoto() : void 
        {
            let id : number = parseInt((<HTMLInputElement>document.getElementById("idNeumatico")).value);
            let marca : string = (<HTMLInputElement>document.getElementById("marca")).value;
            let medidas : string = (<HTMLInputElement>document.getElementById("medidas")).value;
            let precio : number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);
            let foto : any = (<HTMLInputElement>document.getElementById("foto"));

            let neumatico : Entidades.NeumaticoBD = new Entidades.NeumaticoBD(marca,medidas,precio,id);

            let neumatico_json : string = JSON.stringify(neumatico);

            xhttp.open('POST', './BACKEND/modificarNeumaticoBDFoto.php', true);

            let form : FormData = new FormData();

            form.append('neumatico_json', neumatico_json);
            form.append('foto', foto.files[0]);

            xhttp.setRequestHeader('enctype', 'multipart/form-data');

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    let response = JSON.parse(xhttp.responseText);
    
                    if(response.exito)
                    {
                        Manejadora.MostrarNeumaticosBD(true);
                    }
                    else 
                    {
                        alert(xhttp.responseText)
                        console.log(xhttp.responseText);
                    }
                }
            };  
        }

        public static MostrarBorradosJSON() : void 
        {
            xhttp.open('GET', './BACKEND/mostrarBorradosJSON.php', true);

            xhttp.send();

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    (<HTMLDivElement>document.getElementById('divInfo')).innerHTML = xhttp.responseText;
                }
            };
        }

        public static MostrarFotosModificados() : void 
        {
            xhttp.open('GET', './BACKEND/mostrarFotosDeModificados.php', true);

            xhttp.send();

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = xhttp.responseText;
                }
            };
        }
    }
}