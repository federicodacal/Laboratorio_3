<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;

require_once '../vendor/autoload.php';

require_once './clases/AccesoDatos.php';
require_once './clases/usuario.php';
require_once './clases/auto.php';
require_once './clases/MW.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

//EN ESTA NO PUSE EL MW DE SETEADO PORQUE POS NO SE PUEDE
$app->post('/usuarios', \Usuario::class . ':AltaUsuario')->add(\MW::class . '::VerificarBDCorreo')->add(\MW::class . '::VerificarVacioCorreoClave');
//EN ESTA NO PUSE EL MW DE SETEADO PORQUE POS NO SE PUEDE
$app->post('/login', \Usuario::class . ':LoginCC')->add(\MW::class . ':VerificarBDCorreoClave')->add(\MW::class . '::VerificarVacioCorreoClave');
$app->get('/login', \Usuario::class . ':VerificarJWT');
$app->get('[/]', \Usuario::class . ':ListaUsuario');

$app->post('[/]', \Auto::class . ':AltaAuto')->add(\MW::class . '::VerificarPrecioRango');
$app->delete('[/]', \Auto::class . ':BorrarAuto')->add(\MW::class . '::VerificarPropietario')->add(\MW::class . ':VerificarToken');
$app->put('[/]', \Auto::class . ':ModificarAuto')->add(\MW::class . ':VerificarEncargado')->add(\MW::class . ':VerificarToken');
$app->get('/autos', \Auto::class . ':ListaAuto');

$app->run();


?>