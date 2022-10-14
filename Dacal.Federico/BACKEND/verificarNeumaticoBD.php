<?php  

require_once "./clases/accesoDatos.php";
require_once "./clases/neumatico.php";
require_once "./clases/neumaticoBD.php";

use Dacal\Federico\Neumatico;
use Dacal\Federico\NeumaticoBD;
use Dacal\Federico\AccesoDatos;

$obj_neumatico = isset($_POST["obj_neumatico"]) ? $_POST["obj_neumatico"] : NULL;

$mensaje = "{}";

if(isset($obj_neumatico))
{
    $obj = json_decode($obj_neumatico, true);

    $neumatico = new NeumaticoBD($obj["marca"], $obj["medidas"]);

    $neumaticos = NeumaticoBD::traer();

    if($neumatico->existe($neumaticos))
    {
        $exito = true;
        $neumaticoBD = NeumaticoBD::traerPorMarcaYMedidas($obj["marca"], $obj["medidas"]);
        
        if(isset($neumaticoBD))
        {
            $mensaje = $neumaticoBD->toJSON();
        }
    }
}

echo $mensaje;

?>