<?php

use FastRoute\RouteParser\Std;
use Firebase\JWT\JWT;

class MW
{
    public function VerificarNull($request, $response, $next)
    {
        $user = json_decode($request->getParam("user"));
        $usuario = json_decode($request->getParam("usuario"));
        $std = new stdClass();
        if ($user != null) {
            if (isset($user->clave) && isset($user->correo)) {
                $retorno = $next($request, $response);
            } else {
                if (isset($user->clave) == true && isset($user->correo) == false) {
                    $std->mensaje = "No Existe Correo";
                } else if (isset($user->clave) == false && isset($user->correo) == true) {
                    $std->mensaje = "No Existe Clave";
                } else if (isset($user->clave) == false && isset($user->correo) == false) {
                    $std->mensaje = "No Existe Correo y Clave";
                }
                $retorno = $response->withJson($std, 403);
            }
        } else if ($usuario != null) {
            if (isset($usuario->clave) && isset($usuario->correo)) {
                $retorno = $next($request, $response);
            } else {
                if (isset($usuario->clave) == true && isset($usuario->correo) == false) {
                    $std->mensaje = "No Existe Correo";
                } else if (isset($usuario->clave) == false && isset($usuario->correo) == true) {
                    $std->mensaje = "No Existe Clave";
                } else if (isset($usuario->clave) == false && isset($usuario->correo) == false) {
                    $std->mensaje = "No Existe Correo y Clave";
                }
                $retorno = $response->withJson($std, 403);
            }
        } else {
            $std->mensaje = "No Mandaste nada Capo";
            $retorno = $response->withJson($std, 403);
        }
        return $retorno;
    }

    public static function VerificarVacio($request, $response, $next)
    {
        $user = json_decode($request->getParam("user"));
        $usuario = json_decode($request->getParam("usuario"));
        $std = new stdClass();
        if ($user != null) {
            if ($user->clave != "" && $user->correo != "") {
                $retorno = $next($request, $response);
            } else {
                if ($user->clave != "" && $user->correo == "") {
                    $std->mensaje = "Correo Vacio";
                } else if ($user->clave == "" && $user->correo != "") {
                    $std->mensaje = "Clave Vacio";
                } else if ($user->clave == "" && $user->correo == "") {
                    $std->mensaje = "Correo y Clave Vacio";
                }
                $retorno = $response->withJson($std, 409);
            }
        } else if ($usuario != null) {
            if ($usuario->clave != "" && $usuario->correo != "") {
                $retorno = $next($request, $response);
            } else {
                if ($usuario->clave != "" && $usuario->correo == "") {
                    $std->mensaje = "Correo Vacio";
                } else if ($usuario->clave == "" && $usuario->correo != "") {
                    $std->mensaje = "Clave Vacio";
                } else if ($usuario->clave == "" && $usuario->correo == "") {
                    $std->mensaje = "Correo y Clave Vacios";
                }
                $retorno = $response->withJson($std, 409);
            }
        } else {
            $std->mensaje = "No Mandaste nada Capo";
            $retorno = $response->withJson($std, 403);
        }
        return $retorno;
    }

    public function VerificarDB($request, $response, $next)
    {
        $user = json_decode($request->getParam("user"));
        $std = new stdClass();
        if ($user != null) {
            if (Usuario::Existe($user->correo, $user->clave)) {
                $retorno = $next($request, $response);
            } else {
                $std->mensaje = "Correo y Clave Inexistentes";
                $retorno = $response->withJson($std, 409);
            }
        } else {
            $std->mensaje = "No mandaste nada Capo";
            $retorno = $response->withJson($std, 409);
        }
        return $retorno;
    }
    public static function VerificarCorreo($request, $response, $next)
    {
        $usuario = json_decode($request->getParam("usuario"));
        $std = new stdClass();
        if ($usuario != null) {
            $resp = Usuario::ExisteCorreo($usuario->correo);
            if ($resp->exito) {
                $std->mensaje = "Correo Existente";
                $retorno = $response->withJson($std, 409);
            } else {
                $retorno = $next($request, $response);
            }
        } else {
            $std->mensaje = "No mandaste nada Capo";
            $retorno = $response->withJson($std, 409);
        }
        return $retorno;
    }

    public function VerificarAuto($request, $response, $next)
    {
        $auto = json_decode($request->getParam("auto"));
        $std = new stdClass();
        if ($auto != null) {
            if (($auto->precio < 50000 || $auto->precio > 6000000) || strtolower($auto->color) == "azul") {
                $mensaje = "Un Auto no darse de Alta con esos parametros";
                $retorno = $response->withJson($mensaje, 409);
            } else {
                $retorno = $next($request, $response);
            }
        } else {
            $std->mensaje = "No mandaste nada Capo";
            $retorno = $response->withJson($std, 409);
        }
        return $retorno;
    }

    public function VerificarToken($request, $response, $next)
    {

        $token = $request->getHeader("token");
        $std = Autentificadora::VerificarJWT($token[0]);
        if ($std->verificado) {
            $retorno = $next($request, $response);
        } else {
            $retorno = $response->withJson($std, 403);
        }
        return $retorno;
    }

    public static function VerificarPropietario($request, $response, $next)
    {
        $token = $request->getHeader("token");
        $obj = Autentificadora::ObtenerData($token[0]);
        $data = $obj->data;
        if ($data->perfil == "propietario") {
            $retorno = $next($request, $response);
        } else {
            $std=new stdClass();
            $std->mensaje = "No es del Perfil requerido";
            $std->data=$data;
            $retorno = $response->withJson($std, 409);
        }
        return $retorno;
    }

    public function VerificarEncargado($request, $response, $next)
    {
        $token = $request->getHeader("token");
        $obj = Autentificadora::ObtenerData($token[0]);
        $data = $obj->data;
        if ($data->perfil == "encargado") {
            $retorno = $next($request, $response);
        } else {
            $std=new stdClass();
            $std->mensaje = "No es del Perfil requerido";
            $std->data=$data;
            $retorno = $response->withJson($std, 409);
        }
        return $retorno;
    }

    public function EsEncargado($request, $response, $next)
    {
        $token = $request->getHeader("token");
        if (!empty($token)) {
            $obj = Autentificadora::ObtenerData($token[0]);
            $data = $obj->data;
            if ($data->perfil == "encargado") {
                $request = $request->withAttribute('encargado', true);
            }
        }
        return $next($request, $response);
    }
    public function EsEmpleado($request, $response, $next)
    {
        $token = $request->getHeader("token");
        if (!empty($token)) {
            $obj = Autentificadora::ObtenerData($token[0]);
            $data = $obj->data;
            if ($data->perfil == "empleado") {
                $request = $request->withAttribute('empleado', true);
            }
        }

        return $next($request, $response);
    }
    public static function EsPropietario($request, $response, $next)
    {
        $token = $request->getHeader("token");
        if (!empty($token)) {
            $obj = Autentificadora::ObtenerData($token[0]);
            $data = $obj->data;
            if ($data->perfil == "propietario") {
                $request = $request->withAttribute('propietario', true);
            }
        }

        return $next($request, $response);
    }
}
