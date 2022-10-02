<?php

	var_dump($_POST);
	
	$persona = json_decode($_POST["miPersona"], false);
	
	var_dump($persona);

	//echo $persona; //Error! No puedo mostrar un objeto o array con echo

	echo $persona->edad . " - " . $persona->nombre;	