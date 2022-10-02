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

	// Json encode del objeto
	$objJson = json_encode($persona); // encode del obj a string en formato json

	var_dump($objJson);

?>
<br/>
<a href="../Json/index.html"  class="btn btn-info">Volver</a>