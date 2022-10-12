<?php

	// Ver manejadora2.ts

	$persona = new stdClass();
	$persona->nombre = "Juan";
	$persona->edad = 66;

	$objJson = json_encode($persona); // serializo

	echo $objJson;