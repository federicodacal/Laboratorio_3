<?php

use Firebase\JWT\JWT;

class Auto
{
    public $id;
    public $color;
    public $marca;
    public $precio;
    public $modelo;

    //------------------------------------------------------
    //                         API
    //------------------------------------------------------
    public function AltaAuto($request, $response, $args)
    { 
        $ArrayDeParametros = $request->getParsedBody();
        $parametro = $ArrayDeParametros['json'];
        $parametro = json_decode($parametro);  
        
        //Cargo el auto
        $auto = new Auto();
        $auto->color = $parametro->color;
        $auto->marca = $parametro->marca;
        $auto->precio = $parametro->precio;
        $auto->modelo = $parametro->modelo;

        $std= new stdclass();
        if($auto->AltaAutoBD($auto))
        {
            // Retorna un JSON (éxito: true/false; mensaje: string; status: 200/418)
            $std->exito = true;
            $std->mensaje = "El auto fue agregado con exito.";
            $retorno = $response->withJson($std, 200);
        }
        else
        {
            $std->exito = false;
            $std->mensaje = "ERROR!";
            $retorno = $response->withJson($std, 418);
        }

        return $retorno;
    }

    public function ListaAuto($resquest, $response, $args)
    {
        $stringJSON= Auto::TraerTodosAutosBD(); 
        $std= new stdclass(); 

        if($stringJSON)
        {
            //Retorna un JSON (éxito: true/false; mensaje: string; tabla: stringJSON; status: 200/424)
            $std->exito = true;
            $std->mensaje = "Todo Ok.";
            $std->tabla = $stringJSON;          
            $retorno = $response->write(json_encode($std), 200);
        }
        
        else
        {
            $std->exito = false;
            $std->mensaje = "ERROR!";
            $retorno = $response->withJson($std, 424);
        }

        return $retorno;
    }

    public function BorrarAuto($resquest, $response, $args)
    {
        $parametro = $resquest->getParsedBody();
        $id = $parametro['id'];
        $auto = new Auto();
        $std = new stdclass(); 

            if($auto->EliminarAutoBD($id))
            {
                $std->exito = true;
                $std->mensaje = "Auto borrado";
                $retorno = $response->withJson($std, 200);
            }
            else 
            {
                $std->exito = false;
                $std->mensaje = "ERROR!";
                $retorno = $response->withJson($std, 418);
            }

        return $retorno;
    }

    public function ModificarAuto($resquest, $response, $args)
    {
        $arrayDeParametros = $resquest->getParsedBody();
        $parametro = $arrayDeParametros['json'];
        $parametro = json_decode($parametro);

        $auto = new Auto();
        $id = $parametro->id;
        $auto->color = $parametro->color;
        $auto->marca = $parametro->marca;
        $auto->precio = $parametro->precio;
        $auto->modelo = $parametro->modelo;

        $std = new stdclass(); 
            if($auto->ModificarAutBD($id, $auto))
            {
                $std->exito = true;
                $std->mensaje = "Auto modificado";
                $retorno = $response->withJson($std, 200);
            }
            else 
            {
                $std->exito = false;
                $std->mensaje = "ERROR!";
                $retorno = $response->withJson($std, 418);
            }

        return $retorno;
    }

    //------------------------------------------------------
    //                    BASE DE DATOS
    //------------------------------------------------------
    public static function AltaAutoBD($auto)
    {
        $retorno = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();    

        $consulta =$objetoAccesoDato->RetornarConsulta ("INSERT INTO `autos`(`color`, `marca`, `precio`, `modelo`)
        VALUES (:color, :marca, :precio, :modelo)");               
        $consulta->bindValue(':color', $auto->color, PDO::PARAM_STR);
        $consulta->bindValue(':marca', $auto->marca, PDO::PARAM_STR);
        $consulta->bindValue(':precio', $auto->precio, PDO::PARAM_STR);
        $consulta->bindValue(':modelo', $auto->modelo, PDO::PARAM_STR);
        $consulta->execute();   

        if($consulta->rowCount()>0) {
            $retorno = true;
        } 
        return $retorno;
    }

    public static function TraerTodosAutosBD()
    {    
      $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();        
      $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM autos");    
      $consulta->execute();   
      $autos = $consulta->fetchAll(PDO::FETCH_CLASS, "Auto");
      return $autos;         
    }

    public static function EliminarAutoBD($id)
    {
        $retorno = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM autos WHERE id = :id");
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
        if ($consulta->rowCount() > 0) {
            $retorno = true;
        }
        return $retorno;
    }

    public static function ModificarAutBD($id, $producto)
    {
        $retorno = 0;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE autos SET color=:color, 
        marca=:marca, precio=:precio, modelo=:modelo WHERE id=:id");
                                                    
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
    
        $consulta->bindValue(':color', $producto->color, PDO::PARAM_STR);
        $consulta->bindValue(':marca', $producto->marca, PDO::PARAM_STR);
        $consulta->bindValue(':precio', $producto->precio, PDO::PARAM_STR);
        $consulta->bindValue(':modelo', $producto->modelo, PDO::PARAM_STR);

        $consulta->execute();

        if ($consulta->rowCount() > 0) {
            $retorno = 1;
        }
        return $retorno;
    }
}

?>