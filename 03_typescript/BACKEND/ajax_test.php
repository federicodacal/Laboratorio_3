<?php


if(isset($_GET["valor"])) // Peticion viene por GET y variable "valor"
{
	echo "valor recuperado por GET: <h1>" . $_GET["valor"]. "</h1>";
}
else if(isset($_POST["valor"])) // Peticion viene por POST y variable "valor"
{
	echo "valor recuperado por POST: <h1>" . $_POST["valor"] . "</h1>";
}
else // Petición sin parámetros
{
	echo "hola mundo AJAX";
}