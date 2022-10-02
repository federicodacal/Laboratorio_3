<?php
	header("charset: ISO-8859-1");

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

?>
<br/>
<a href="../Json/index.html"  class="btn btn-info">Volver</a>