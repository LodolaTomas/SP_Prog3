<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;

require_once './vendor/autoload.php';

require_once './clases/AccesoDatos.php';
require_once './clases/Auto.php';
require_once './clases/Usuario.php';
require_once './clases/Login.php';
require_once './clases/MW.php';
require_once './clases/autentificadora.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);
$app->post('/usuarios', \Usuario::class . ':Alta')->add(\MW::class.'::VerificarCorreo')->add(\MW::class.'::VerificarVacio')->add(\MW::class.':VerificarNull');
$app->get('[/]', \Usuario::class . ':Traer')->add(\MW::class .':EsEmpleado')->add(\MW::class .'::EsPropietario')->add(\MW::class .':EsEncargado');
$app->post('[/]', \Auto::class . ':Alta')->add(\MW::class.':VerificarAuto');
$app->group('/autos', function () {
    $this->get('', \Auto::class . ':Traer');
})->add(\MW::class .':EsEmpleado')->add(\MW::class .'::EsPropietario')->add(\MW::class .':EsEncargado');
$app->group('/login', function () {
    $this->post('', \Login::class . ':VerificarLogin')->add(\MW::class.':VerificarDB')->add(\MW::class.'::VerificarVacio')->add(\MW::class.':VerificarNull');
    $this->get('', \Login::class . ':VerificarToken');
});
$app->delete('[/]', \Auto::class . ':Borrar')->add(\MW::class . '::VerificarPropietario')->add(\MW::class . ':VerificarToken');
$app->put('[/]', \Auto::class . ':Modificar')->add(\MW::class . ':VerificarEncargado')->add(\MW::class . ':VerificarToken');
$app->run();
