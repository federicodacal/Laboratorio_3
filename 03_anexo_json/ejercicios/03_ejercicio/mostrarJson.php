<?php 

var_dump($_POST["producto_json"]);

$producto_json = isset($_POST["producto_json"]) ? $_POST["producto_json"] : NULL;

if(isset($producto_json))
{
    $producto = json_decode($_POST["producto_json"], true);
    echo $producto["codigoBarra"] . " - " . $producto["nombre"] . " - " . $producto["precio"];
}
else 
{
    echo "No anda";
}
	


?>