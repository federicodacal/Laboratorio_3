<?php


if(isset($_GET["valor"])) // Peticion viene por GET y existe variable "valor"
{
	echo "valor recuperado por GET: <h1>" . $_GET["valor"]. "</h1>";
}
else if(isset($_POST["valor"])) // Peticion viene por POST y existe variable "valor"
{
	echo "valor recuperado por POST: <h1>" . $_POST["valor"] . "</h1>";
}
else // Petición sin parámetros (Por eso cuando hago la peticion por GET sin variable entra en el else)
{
	echo "hola mundo AJAX";
}