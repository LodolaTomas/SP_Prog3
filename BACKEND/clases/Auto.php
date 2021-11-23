<?php

use Composer\Autoload\ClassLoader;
use FastRoute\RouteParser\Std;

class Auto
{

    public function Alta($request, $response)
    {
        $paramObj = json_decode($request->getParam("auto"));
        $std = new stdClass();
        if (Auto::AltaDB($paramObj)) {
            $std->exito = true;
            $std->mensaje = "Agregado Correctamente";
            $retorno = $response->withJson($std, 200);
        } else {
            $std->exito = false;
            $std->mensaje = "No pudo ser Agregado!";
            $retorno = $response->withJson($std, 418);
        }
        return $retorno;
    }

    public static function AltaDB($obj)
    {
        $objBD = AccesoDatos::DameUnObjetoAcceso();
        $consulta = $objBD->RetornarConsulta("INSERT INTO autos ( color, marca, precio, modelo)VALUES(?,?,?,?)");
        return $consulta->execute([$obj->color, $obj->marca, $obj->precio, $obj->modelo]);
    }

    public function Traer($request, $response)
    {
        $list = Auto::TraerDB();
        $std = new stdClass();
        $std->exito = $list->exito;
        $id = $request->getParam("id_auto");
        $encargado = $request->getAttribute('encargado');
        $propietario = $request->getAttribute('propietario');
        $empleado = $request->getAttribute('empleado');
        if ($list->exito) {
            $std->lista = $list->lista;
            $std->mensaje = "Datos Obtenidos Correctamente";
            if ($propietario == true) {
                if ($id == null) {
                    $std->lista = $list->lista;
                } else {
                    $listaid= array_column($list->lista, 'id');
                    $buscarAuto=array_search($id,$listaid);
                    if($buscarAuto!=false){
                    $std->lista = $list->lista[$buscarAuto];
                    }else{
                        $std->lista="ID no Encontrado";
                    }
                }
            }
            if ($encargado == true) {
                $std->lista = array_map(function ($item) {
                    $item = (array)$item;
                    unset($item["id"]);
                    return $item;
                }, $list->lista);
            }
            if ($empleado == true) {
                $colores = array_column($list->lista, "color");
                $std->lista = array_count_values($colores);
            }
            $retorno = $response->withJson($std, 200);
        } else {
            $std->mensaje = "Datos No Obtenidos";
            $retorno = $response->withJson($std, 424);
        }

        return $retorno;
    }
    public static function TraerDB()
    {
        $std = new stdClass();
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM autos");
        $std->exito = $consulta->execute();
        $std->lista = $consulta->fetchAll(PDO::FETCH_CLASS, "Auto");
        return $std;
    }

    public static function Borrar($request, $response)
    {

        $array =  $request->getParsedBody();
        $id = $array["id_auto"];
        $std = new stdClass();
        $std->exito = Auto::BorrarDB($id);
        if ($std->exito) {
            $std->mensaje = "Borrado Exitosamente";
            $respuesta = $response->withJson($std, 200);
        } else {
            $std->mensaje = "No Pudo Ser Borrado";
            $respuesta = $response->withJson($std, 418);
        }
        return $respuesta;
    }


    public static function BorrarDB($id)
    {
        $objBD = AccesoDatos::DameUnObjetoAcceso();
        $consulta = $objBD->RetornarConsulta("DELETE FROM autos WHERE id=?");
        $consulta->execute([$id]);
        $consulta->rowCount() > 0 ? $retorno = true : $retorno = false;
        return $retorno;
    }
    public static function Modificar($request, $response)
    {
        $id = json_decode($request->getParam("id_auto"));
        $auto = json_decode($request->getParam("auto"));
        $auto->id = $id;
        $std = new stdClass();
        $std->exito = Auto::ModificarDB($auto);
        if ($std->exito) {
            $std->mensaje = "Modificado Exitosamente";
            $respuesta = $response->withJson($std, 200);
        } else {
            $std->mensaje = "No Pudo Ser Modificado";
            $respuesta = $response->withJson($std, 418);
        }
        return $respuesta;
    }


    public static function ModificarDB($obj)
    {
        $objBD = AccesoDatos::DameUnObjetoAcceso();
        $consulta = $objBD->RetornarConsulta("UPDATE autos SET color= ?, marca= ?,precio= ?,modelo= ? WHERE id=?");
        return $consulta->execute([$obj->color, $obj->marca, $obj->precio, $obj->modelo, $obj->id]);
    }
}
