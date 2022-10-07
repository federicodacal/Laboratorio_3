<?php
	header("charset: ISO-8859-1");

	echo "Ejemplo 1: <br>";

	$personaArray = array();

	$persona = new stdClass();
	$persona->nombre = "Juan";
	$persona->edad = 66;
	//$persona["nombre"] = "Juan";
	//$persona["edad"] = 66;

	$persona2 = new stdClass();
	$persona2->nombre = "Ramiro";
	$persona2->edad = 25;

	$personaArray[0] = $persona;
	$personaArray[1] = $persona2;

	$objJson = json_encode($personaArray);

	var_dump($objJson);
	
	echo $objJson;

	echo "<br><br> Ejemplo 2: <br>";

	$json = array("nombre"=>$persona->nombre, "apellido"=>"Carlos", "edad"=>$persona->edad);

	$objJson2 = json_encode($json, true);

	var_dump($json);
	
	echo $objJson2;
?>
<br/>
<br/>
<a href="../Json/index.html"  class="btn btn-info">Volver</a>