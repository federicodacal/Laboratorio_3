<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;

require_once '../vendor/autoload.php';

require_once './clases/AccesoDatos.php';
require_once './clases/usuario.php';
require_once './clases/barbijo.php';
require_once './clases/MW.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

$app->post('/usuarios', \Usuario::class . ':AltaUsuario');
$app->post('/login', \Usuario::class . ':LoginCC');
$app->get('/login', \Usuario::class . ':VerificarJWT');
$app->get('[/]', \Usuario::class . ':ListaUsuario');

$app->post('[/]', \Barbijo::class . ':AltaBarbijo');
$app->delete('[/]', \Barbijo::class . ':BorrarBarbijo');
$app->put('[/]', \Barbijo::class . ':ModificarBarbijo');
$app->get('/barbijos', \Barbijo::class . ':ListaBarbijo');

$app->get('/pdf', \Barbijo::class . ':Pdf');

$app->run();


?>