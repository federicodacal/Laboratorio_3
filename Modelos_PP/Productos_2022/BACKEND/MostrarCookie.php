<?php 

require_once './clases/Producto.php';

use Dacal\Federico\Producto;

$nombre = isset($_GET["nombre"]) ? $_GET["nombre"] : NULL;
$origen = isset($_GET["origen"]) ? $_GET["origen"] : NULL;

$exito = false;
$mensaje = "Ocurrio un problema";
$existe = false;

if(isset($nombre) && isset($origen))
{
    $cookie = $nombre . "_" . $origen;

    foreach($_COOKIE as $key => $value)
    {
        if($key == $cookie)
        {
            $existe = true;
            $exito = true;
            $mensaje = "Cookie: $cookie encontrada";
            break;
        }
    }

    if(!$existe)
    {
        $mensaje = "No se encontro la cookie: $cookie";
    }
}

$response = array("exito"=>$exito,"mensaje"=>$mensaje);

echo json_encode($response);

?>