<?php

use Firebase\JWT\JWT;

class Usuario
{
    public $correo;
    public $clave;
    public $nombre;
    public $apellido;
    public $perfil; 
    public $foto;

    //------------------------------------------------------
    //                         API
    //------------------------------------------------------
    public function AltaUsuario($request, $response, $args)
    { 
        $ArrayDeParametros = $request->getParsedBody();
        $parametro = $ArrayDeParametros['usuario'];
        $parametro = json_decode($parametro);
        $archivo = $request->getUploadedFiles();
        $foto = $archivo["foto"]->getClientFileName();
        $nombre = explode(".", $parametro->correo);
        $extension= explode(".", $foto);
        $extension=array_reverse($extension);
        $path = $nombre[0] . "_" . $nombre[1];
        $destino ="./fotos/" . $path.  "." .$extension[0];    
        
        //Cargo el usuario
        $usuario = new usuario();
        $usuario->correo = $parametro->correo;
        $usuario->clave = $parametro->clave;
        $usuario->nombre = $parametro->nombre;
        $usuario->apellido = $parametro->apellido;
        $usuario->perfil = $parametro->perfil;
        $usuario->foto = $destino;
        
        $std= new stdclass();
        if($usuario->AltaUsuBD($usuario))
        {
            //Retorna un JSON (éxito: true/false; mensaje: string; status: 200/418)
            $std->exito = true;
            $std->mensaje = "Todo Ok.";
            $archivo['foto']->moveTo($destino);
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

    public function ListaUsuario($request, $response, $args)
    {
        $stringJSON= Usuario::TraerTodosUsuBD(); 
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

    //------------------------------------------------------
    //                         LOGIN
    //------------------------------------------------------
    public function LoginCC($request, $response, $next)
    {
        $datos = new stdClass();
        $ArrayDeParametros = $request->getParsedBody();
        $objUser = json_decode($ArrayDeParametros["user"]);

        if(Usuario::ExisteUsuario($objUser)) //Primero verifico el usuario
        {
            $retorno = new stdClass();

            $datos = Usuario::TraerUno($objUser); //Traigo los datos del usuario
            
            $retorno->jwt = Usuario::CrearJWT($datos);//Tengo que creas el JWT

            $newResponse = $response->withJson($retorno, 200);
        }
        else
        {
            $datos->mensaje = "ERROR. Correo o clave incorrectas.";

            $newResponse = $response->withJson($datos, 403);  
        }  

        return $newResponse; 
    }

    //------------------------------------------------------
    //                         JWT
    //------------------------------------------------------
    public static function CrearJWT($data)
    {
        $time = time();
        
        $token = array(
        	'iat'=>$time,
            'exp' => $time + (60*5),
            'data' => $data,
        );

        return JWT::encode($token, "claveSecreta",'HS256');
    }

    public function VerificarJWT($request, $response, $next)
    {
        $token = $request->getHeader('token')[0];
        $bandera = false;
        $std= new stdClass();

        try
        {
            $decodificado=JWT::decode(
                $token,
                "claveSecreta",
                ['HS256']
            );
            $bandera = true;
        }
        catch(Exception $e)
        {
            $std = "Token no valido!!! --> " . $e->getMessage();
        }

        if($bandera == true)
        {
           $std->mensaje="Todo Ok.";
           $std->token=$decodificado;
           $retorno = $response->withJson($std, 200);
        }
        else
        {
            $std->mensaje="ERROR!";
            $retorno = $response->withJson($std, 403);
        }

        return $retorno;
    }

    //------------------------------------------------------
    //                    BASE DE DATOS
    //------------------------------------------------------
    public static function AltaUsuBD($usuario)
    {
        $retorno = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();    

        $consulta =$objetoAccesoDato->RetornarConsulta ("INSERT INTO `usuarios`(`correo`, `clave`, `nombre`, `apellido`, `perfil`, `foto`)
        VALUES (:correo, :clave, :nombre, :apellido, :perfil, :foto)");
                                                        
        $consulta->bindValue(':correo', $usuario->correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
        $consulta->bindValue(':nombre', $usuario->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $usuario->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':perfil', $usuario->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':foto', $usuario->foto, PDO::PARAM_STR);
        $consulta->execute();   

        if ($consulta->rowCount()>0) {
            $retorno = true;
        }
        return $retorno;
    }

    public static function TraerTodosUsuBD()
    {    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();        
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios");    
        $consulta->execute();   
        $usuarios = $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
        return $usuarios;         
    }

    //VERFICA POR CORREO Y CLAVE SI EXITE
    private static function ExisteUsuario($objUser)
    {
        $existe = FALSE;

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE correo=:correo AND clave=:clave");

        $consulta->bindValue(':correo',$objUser->correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $objUser->clave, PDO::PARAM_STR);

        $consulta->execute();	
        
        $cantidadFilas = $consulta->rowCount();

        if($cantidadFilas == 1)
        {
            $existe = TRUE;
        }
        
        return $existe;
    }

    public static function TraerUno($objUser)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta = $objetoAccesoDato->RetornarConsulta('SELECT id, correo, clave, nombre, apellido, perfil, foto  
														from usuarios where correo=:correo and clave=:clave');

		$consulta->bindValue(':correo',$objUser->correo, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $objUser->clave, PDO::PARAM_STR);

		$consulta->execute();			
		return $consulta->fetchObject('usuario');
    }
}

?>