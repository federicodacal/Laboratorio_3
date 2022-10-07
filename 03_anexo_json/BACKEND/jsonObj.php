<?php
	header("charset: ISO-8859-1");
	/*
	echo '[{"nombre": "Susana","Edad":36,"Peso": null },
		  {"nombre": "Andrea","Edad":25,"Peso": 72 }] ';
	*/

	// Generar objeto de standard class
	$persona = new stdClass(); // standard class de php
	$persona->nombre = "Juan";
	$persona->edad = 66;

	// A partir del obj (persona) en memoria 
	// Json encode del objeto (Serializacion json)
	$objJson = json_encode($persona); // encode (serializacion) del obj a string en formato json

	echo "Obj en memoria:<br>";
	var_dump($persona);
	
	echo "Obj serializado a json: <br>";
	var_dump($objJson);

	echo $objJson;
?>

<br/>
<br/>
<a href="../Json/index.html"  class="btn btn-info">Volver</a>