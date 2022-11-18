<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <!-- bootstrap 4 -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    
        <!-- estilos -->
        <link rel="stylesheet" href="./FRONTEND/css/estilos.css">

        <!-- para iconos -->
        <script src="https://use.fontawesome.com/0db22a27a3.js"></script>
      
        <!-- JS -->
        <script src="./FRONTEND/principal.js"></script>
    </head>

    <body class="principal">
        <div class="container-fluid">
            <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="listados" data-toggle="dropdown">
                                Listados <b class="caret"></b>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#" onclick="Manejadora.Principal.ListadoUsuarios()">Usuarios</a>
                                <a class="dropdown-item" href="#" onclick="Manejadora.Principal.ListadoAutos()">Autos</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link" href="#" id="btnAlta" onclick="Manejadora.Principal.ArmarFormAuto('agregar')">Alta Autos<b class="caret"></b>
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link" href="#" id="precioMayor"  onclick="Manejadora.Principal.ObtenerAutosFiltrados()">FILTER - Mayor $250888<b class="caret"></b>
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link" href="#" id="precioMayor"  onclick="Manejadora.Principal.ObtenerPreciosPromedio()">REDUCE - Promedio<b class="caret"></b>
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link" href="#" id="precioMayor"  onclick="Manejadora.Principal.ObtenerEmpleados()">MAP - Empleados<b class="caret"></b>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div id="divResultado" class= "col-md-10" style="top: 4cm;"></div>
        </div>
        <div class="row col-sm-12">
            <div id="divAutos" class="cuadro col-sm-6" style= "background-color: rgb(223, 71, 71)">IZQUIERDA</div>
            <div id="divUsuario" class="cuadro col-sm-6" style= "background-color: rgb(47, 153, 47); justify-content: center;">DERECHA</div>                 
        </div>  
    </body>
</html>