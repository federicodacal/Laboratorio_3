/// <reference path='./Producto.ts'/>
/// <reference path='./ProductoEnvasado.ts'/>
/// <reference path='Iparte2.ts'/>
/// <reference path='Iparte3.ts'/>

namespace PrimerParcial
{

    let xhttp : XMLHttpRequest = new XMLHttpRequest();
    
    export class Manejadora implements Iparte2, Iparte3
    {
        public static AgregarProductoJSON() : void 
        {
            let nombre : string = (<HTMLInputElement>document.getElementById('nombre')).value;
            let origen : string = (<HTMLSelectElement>document.getElementById('cboOrigen')).value;

            xhttp.open('POST', './BACKEND/AltaProductoJSON.php', true);

            let form : FormData = new FormData();
            
            form.append('nombre', nombre);
            form.append('origen', origen);

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }

        public static MostrarProductosJSON() : void 
        {
            xhttp.open('GET', './BACKEND/ListadoProductosJSON.php', true);

            xhttp.send();

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {

                let productos : any = JSON.parse(xhttp.responseText);

                let response = 
                `<table>
                    <tr>
                        <th>Nombre</th>
                        <th>Origen</th>
                    </tr>`;

                    productos.forEach((producto : any)=> {
                        response += `<tr>
                            <td>${producto.nombre}</td>
                            <td>${producto.origen}</td>
                            </tr>`;
                    });

                    response += `</table>`;

                    (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = response;
                }
            };
        }

        public static VerificarProductoJSON() : void 
        {
            let nombre : string = (<HTMLInputElement>document.getElementById('nombre')).value;
            let origen : string = (<HTMLSelectElement>document.getElementById('cboOrigen')).value;

            xhttp.open('POST', './BACKEND/VerificarProductoJSON.php', true);

            let form : FormData = new FormData();
            
            form.append('nombre', nombre);
            form.append('origen', origen);

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }

        public static MostrarInfoCookie() : void 
        {
            let nombre : string = (<HTMLInputElement>document.getElementById('nombre')).value;
            let origen : string = (<HTMLSelectElement>document.getElementById('cboOrigen')).value;
            
            xhttp.open('GET', `./BACKEND/MostrarCookie.php?nombre=${nombre}&origen=${origen}`, true);

            xhttp.send();

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    (<HTMLDivElement>document.getElementById('divInfo')).innerHTML = xhttp.responseText;
                }
            };
        }

        public static AgregarProductoSinFoto() : void 
        {
            let nombre : string = (<HTMLInputElement>document.getElementById('nombre')).value;
            let origen : string = (<HTMLSelectElement>document.getElementById('cboOrigen')).value;
            let codigoBarra : string = (<HTMLInputElement>document.getElementById('codigoBarra')).value;

            let producto = new Entidades.ProductoEnvasado(nombre, origen, codigoBarra);

            let producto_json = JSON.stringify(producto);

            xhttp.open('POST', './BACKEND/AgregarProductoSinFoto.php', true);

            let form : FormData = new FormData();
            
            form.append('producto_json', producto_json);

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }

        public static MostrarProductosEnvasados(modif_foto : boolean) : void
        {
            xhttp.open('GET', './BACKEND/ListadoProductosEnvasados.php?tabla=json', true);

            xhttp.send();

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {

                let productos : any = JSON.parse(xhttp.responseText);

                let response = 
                `<table>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Origen</th>
                        <th>Codigo Barra</th>
                        <th>Precio</th>
                        <th>Path Foto</th>
                        <th>Foto</th>
                        <th colspan="2">Acciones</th>
                    </tr>`;

                    productos.forEach((producto : any)=> {

                        let producto_json : string = JSON.stringify(producto);

                        if(modif_foto)
                        {
                            response += `<tr>
                            <td>${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.origen}</td>
                            <td>${producto.codigoBarra}</td>
                            <td>$${producto.precio}</td>
                            <td>${producto.pathFoto}</td>
                            <td>
                                <img src='./BACKEND/${producto.pathFoto}' alt='Nope' width='50px' height='50px'></td>
                            </td>
                            <td> 
                                <input type='button' value='Modificar' onclick=PrimerParcial.Manejadora.ModificarProductoFoto(${producto_json})>
                            </td>
                            <td> 
                                <input type='button' value='Eliminar' onclick=PrimerParcial.Manejadora.BorrarProductoFoto(${producto_json})>
                            </td>
                            </tr>`;
                        }
                        else 
                        {
                            response += `<tr>
                            <td>${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.origen}</td>
                            <td>${producto.codigoBarra}</td>
                            <td>$${producto.precio}</td>
                            <td>${producto.pathFoto}</td>
                            <td>
                                <img src='./BACKEND/${producto.pathFoto}' alt='Nope' width='50px' height='50px'></td>
                            </td>
                            <td> 
                                <input type='button' value='Modificar' onclick=PrimerParcial.Manejadora.Modificar(${producto_json})>
                            </td>
                            <td> 
                                <input type='button' value='Eliminar' onclick=PrimerParcial.Manejadora.Eliminar(${producto_json})>
                            </td>
                            </tr>`;
                        }
                        
                    });

                    response += `</table>`;

                    (<HTMLDivElement>document.getElementById('divTabla')).innerHTML = response;
                }
            };
        }

        public static Eliminar(obj_json : any) : void 
        {
            let manejadora = new Manejadora();
            manejadora.EliminarProducto(obj_json);
            
        }

        public static Modificar(obj_json : any) : void 
        {
            let manejadora = new Manejadora();
            manejadora.ModificarProducto(obj_json);
            
        }

        public EliminarProducto(obj_json : any) : void
        {
            let respuesta = confirm(`¿Confirma eliminar a producto ${obj_json.nombre}, origen: ${obj_json.origen}?`);

            if(respuesta)
            {
                xhttp.open('POST', './BACKEND/EliminarProductoEnvasado.php', true);
    
                let form : FormData = new FormData();
    
                form.append('producto_json', JSON.stringify(obj_json));
    
                xhttp.send(form);
    
                xhttp.onreadystatechange = () => {
                    if(xhttp.readyState == 4 && xhttp.status == 200) {
                        let json = xhttp.responseText;
                        let response = JSON.parse(json);
                        
                        console.log(response);
        
                        if(response.exito)
                        {
                            Manejadora.MostrarProductosEnvasados(false);
                        }
                    }
                };
            }
            else 
            {
                console.log('Eliminar cancelado');
            }
        }

        public ModificarProducto(obj_json : any) : void
        {
            (<HTMLInputElement>document.getElementById("idProducto")).value = obj_json.id;
            (<HTMLInputElement>document.getElementById("nombre")).value = obj_json.nombre;
            (<HTMLInputElement>document.getElementById("codigoBarra")).value = obj_json.codigoBarra;
            (<HTMLSelectElement>document.getElementById("cboOrigen")).value = obj_json.origen;
            (<HTMLInputElement>document.getElementById("precio")).value = obj_json.precio;
            (<HTMLInputElement>document.getElementById("idProducto")).disabled = true;
        }

        public static ModificarProd()
        {
            let id : number = parseInt((<HTMLInputElement>document.getElementById("idProducto")).value);
            let nombre : string = (<HTMLInputElement>document.getElementById("nombre")).value;
            let precio : number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value); 
            let codigoBarra : string = (<HTMLInputElement>document.getElementById("codigoBarra")).value;
            let origen : string = (<HTMLInputElement>document.getElementById("cboOrigen")).value;

            let producto = new Entidades.ProductoEnvasado(nombre,origen,codigoBarra,precio,"",id);

            let producto_json = JSON.stringify(producto);

            xhttp.open('POST', './BACKEND/ModificarProductoEnvasado.php', true);

            let form : FormData = new FormData();

            form.append('producto_json', producto_json);

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    let response = JSON.parse(xhttp.responseText);

                    if(response.exito)
                    {
                        Manejadora.MostrarProductosEnvasados(false);
                    }
                    else 
                    {
                        alert(xhttp.responseText)
                        console.log(xhttp.responseText);
                    }
                }
            };    
        }

        public static VerificarProductoEnvasado(): void 
        {
            let nombre : string = (<HTMLInputElement>document.getElementById('nombre')).value;
            let origen : string = (<HTMLSelectElement>document.getElementById('cboOrigen')).value;
            
            xhttp.open('POST', './BACKEND/VerificarProductoEnvasado.php', true);

            let producto = new Entidades.ProductoEnvasado(nombre, origen);

            let producto_json = JSON.stringify(producto);

            let form : FormData = new FormData();

            form.append('obj_producto', producto_json);

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        }

        public static AgregarProductoFoto() : void
        {
            let nombre : string = (<HTMLInputElement>document.getElementById("nombre")).value;
            let precio : number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value); 
            let codigoBarra : string = (<HTMLInputElement>document.getElementById("codigoBarra")).value;
            let origen : string = (<HTMLInputElement>document.getElementById("cboOrigen")).value;
            let foto : any = (<HTMLInputElement>document.getElementById("foto"));

            xhttp.open('POST', './BACKEND/AgregarProductoEnvasado.php', true);

            let form : FormData = new FormData();

            form.append('nombre', nombre);
            form.append('origen', origen);
            form.append('codigoBarra', codigoBarra);
            form.append('precio', precio.toString());
            form.append('foto', foto.files[0]);

            xhttp.setRequestHeader("enctype", "multipart/form-data");

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                    Manejadora.MostrarProductosEnvasados(true);
                }
            };
        }

        public static BorrarProductoFoto(obj_json : any) : void
        {
            let respuesta = confirm(`¿Confirma eliminar a producto ${obj_json.nombre}, codigo: ${obj_json.codigoBarra}`);

            if(respuesta)
            {
                xhttp.open('POST', './BACKEND/BorrarProductoEnvasado.php', true);

                let form : FormData = new FormData();      

                form.append('producto_json', JSON.stringify(obj_json));

                xhttp.send(form);

                xhttp.onreadystatechange = () => {
                    if(xhttp.readyState == 4 && xhttp.status == 200) {
                        let json = xhttp.responseText;

                        console.log(json);

                        let response = JSON.parse(json);
        
                        if(response.exito)
                        {
                            Manejadora.MostrarProductosEnvasados(true);
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

        public static ModificarProductoFoto(obj_json : any) : void
        {
            (<HTMLInputElement>document.getElementById("idProducto")).value = obj_json.id;
            (<HTMLInputElement>document.getElementById("nombre")).value = obj_json.nombre;
            (<HTMLInputElement>document.getElementById("codigoBarra")).value = obj_json.codigoBarra;
            (<HTMLInputElement>document.getElementById("precio")).value = obj_json.precio;
            (<HTMLInputElement>document.getElementById("cboOrigen")).value = obj_json.origen;
            
            let path : string = './BACKEND' + obj_json.pathFoto;
            (<HTMLImageElement>document.getElementById('imgFoto')).src = path;

            (<HTMLInputElement>document.getElementById("idProducto")).disabled = true;
        }

        public static ModificarProdFoto() : void 
        {
            let id : number = parseInt((<HTMLInputElement>document.getElementById("idProducto")).value);
            let nombre : string = (<HTMLInputElement>document.getElementById("nombre")).value;
            let codigoBarra : string = (<HTMLInputElement>document.getElementById("codigoBarra")).value; 
            let origen : string = (<HTMLInputElement>document.getElementById("cboOrigen")).value;
            let precio : number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);
            let foto : any = (<HTMLInputElement>document.getElementById("foto"));

            let producto = new Entidades.ProductoEnvasado(nombre,origen,codigoBarra,precio,"",id);

            let producto_json = JSON.stringify(producto);

            xhttp.open('POST', './BACKEND/ModificarProductoEnvasadoFoto.php', true);

            let form : FormData = new FormData();

            form.append('producto_json', producto_json);
            form.append("foto", foto.files[0]);

            xhttp.setRequestHeader("enctype", "multipart/form-data");

            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    let response = JSON.parse(xhttp.responseText);

                    if(response.exito)
                    {
                        Manejadora.MostrarProductosEnvasados(true);
                    }
                    else 
                    {
                        alert(xhttp.responseText)
                        console.log(xhttp.responseText);
                    }
                }
            } 
        }

        public static MostrarBorradosJSON() : void 
        {
            xhttp.open('GET', './BACKEND/MostrarBorradosJSON.php', true);

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
            xhttp.open('GET', './BACKEND/MostrarFotosDeModificados.php', true);

            xhttp.send();

            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    (<HTMLDivElement>document.getElementById('divInfo')).innerHTML = xhttp.responseText;
                }
            };
        }

    }
} //