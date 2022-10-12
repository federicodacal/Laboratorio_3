<?php

	// Ver manejadora2.ts

	var_dump($_POST);
	
	// Recupero parametro 'miPersona'
	$persona = json_decode($_POST["miPersona"], false); // deserializo
	
	var_dump($persona);

	//echo $persona; //Error! No puedo mostrar un objeto o array con echo

	echo $persona->edad . " - " . $persona->nombre;	