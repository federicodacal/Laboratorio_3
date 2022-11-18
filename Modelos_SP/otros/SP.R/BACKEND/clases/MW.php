<?php

use Firebase\JWT\JWT;

class MW
{
    //1.- (método de instancia) Verifique que estén “seteados” el correo y la clave.
    //Si no existe alguno de los dos (o los dos) retorne un JSON con el mensaje de error
    //correspondiente (y status 403).
    public function VerificarSetCorreoClave($request, $response, $next)
    {
        $array = $request->getParsedBody();
        $login = $array['user'];
        $login = json_decode($login);
        $ok = false;
        $mensajeError = "";

        if (isset($login->correo) && isset($login->clave)){
            $ok = true;
        }else if(empty($login->correo) && isset($login->clave)){
            $mensajeError = "ERROR - No esta setado el correo";
        }else if(isset($login->correo) && empty($login->clave)){
            $mensajeError = "ERROR - No esta setado la clave";
        }

        if ($ok == true){   //todo correcto pasa a la siguiente
            $newResponse = $next($request, $response);
        }else{
            $std = new stdClass();
            $std->mensaje = $mensajeError;
            $newResponse = $response->withJson($std, 409);
        }
        return $newResponse;
    }

    //2.- (método de clase) Si alguno está vacío (o los dos) retorne un JSON con el mensaje de error
    //correspondiente (y status 409).
    //Caso contrario, pasar al siguiente Middleware.
    // Si alguno está vacío (o los dos) retorne un JSON con el mensaje de error correspondiente (y status 409). 
    public static function VerificarVacioCorreoClave($request, $response, $next)
    {
        $array = $request->getParsedBody();
        $login = $array['user'];
        $login = json_decode($login);
        $correo = $login->correo;
        $clave = $login->clave;
        $ok = false;
        $mensajeError = "";

        if($correo != "" && $clave != ""){
            $ok = true;
        }else if ($correo != "" && $clave == ""){
            $mensajeError = "ERROR - Campo clave vacio!";
        }else if ($correo == "" && $clave != ""){
            $mensajeError = "ERROR - Campo correo vacio!";
        }else{
            $mensajeError = "ERROR - Campos vacios!";
        }

        if ($ok == true){   //todo correcto pasa a la siguiente
            $newResponse = $next($request, $response);
        }else{
            $std = new stdClass();
            $std->mensaje = $mensajeError;
            $newResponse = $response->withJson($std, 403);
        }
        return $newResponse;
    }

    //3.- (método de instancia) Verificar que el correo y clave existan en la base de datos. Si NO
    //existen, retornar un JSON con el mensaje de error correspondiente (y status 403).
    //Caso contrario, acceder al verbo de la API.
    public function VerificarBDCorreoClave($request, $response, $next)
    {
        $array = $request->getParsedBody();
        $login = $array['obj_json'];
        $login = json_decode($login);
        $correo = $login->correo;
        $clave = $login->clave;
        $ok = false;

        $user = new usuario();
        $usuarios = [];
        $usuarios = $user->TraerTodosUsuBD();

        foreach ($usuarios as $us)
        { 
            if ($us->clave == $clave && $us->correo == $correo){
                $ok = true;
                break;
            }
        }

        if ($ok == false){
            $std = new stdClass();
            $std->mensaje = "No exite el usuario";
            $newResponse = $response->withJson($std, 403);
        }else{
            $newResponse = $next($request, $response);
        }

        return $newResponse;
    }

    //4.- (método de clase) Verificar que el correo no exista en la base de datos. Si EXISTE, retornar
    //un JSON con el mensaje de error correspondiente (y status 403).
    //Caso contrario, acceder al verbo de la API.
    public static function VerificarBDCorreo($request, $response, $next)
    {
        $array = $request->getParsedBody();
        $login = $array['obj_json'];
        $login = json_decode($login);
        $correo = $login->correo;
        $ok = false;

        $user = new usuario();
        $usuarios = [];
        $usuarios = $user->TraerTodosUsuBD();

        foreach ($usuarios as $us){ 
            if ($us->correo == $correo){
                $ok = true;
                break;
            }
        }

        if ($ok == true){
            $std = new stdClass();
            $std->mensaje = "El usuario ya esta registrado!";
            $newResponse = $response->withJson($std, 403);
        }else{
            $newResponse = $next($request, $response);
        }

        return $newResponse;
    }

    //5.- (método de instancia) Verificar que el precio posea un rango de entre 50.000 y 600.000 y
    //que el color no sea ‘azul’. Si no pasa la validación alguno de los dos (o los dos) retorne un JSON
    //con el mensaje de error correspondiente (y status 409).
    //Caso contrario, acceder al verbo de la API.    
    public static function VerificarPrecioRango($request, $response, $next)
    {
        $array = $request->getParsedBody();
        $auto = $array['json'];
        $auto = json_decode($auto);
        $precio = $auto->precio;
        $color = $auto->color;
        $mensajeError = "";
        $ok = false;
 
            if ($precio >= 50000 && $precio <= 600000 && $color != "azul"){
                $ok = true;
            }else if($color != "azul" && $precio < 50000 || $precio > 600000){
                $mensajeError = "Error, esta fuera de rango.";
            }else if($precio >= 50000 && $precio <= 600000 && $color == "azul"){
                $mensajeError = "Error, el color no puede ser azul.";
            }
        

        if ($ok == false){
            $std = new stdClass();
            $std->mensaje = $mensajeError;
            $newResponse = $response->withJson($std, 409);
        }else{
            $newResponse = $next($request, $response);
        }

        return $newResponse;
    }

    //(método de instancia) verifique que el token sea válido.
    //Recibe el JWT a ser verificado.
    //Retorna un JSON con el mensaje de error correspondiente (y status 403), en caso de no ser válido.
    //Caso contrario, pasar al siguiente callable.
    public function VerificarToken($request, $response, $next)
    {
        $token = $request->getHeader('token')[0];
        $ok = false;
        $std= new stdClass();

        try{
            $decodificado=JWT::decode(
                $token,
                "claveSecreta",
                ['HS256']
            );
            $ok=true;
        }
        catch(Exception $e)
        {
            $std->mensaje = $e->getMessage();
        }
        
        if($ok==true)
        {
            $std->mensaje = "Todo Ok";
            $std->token = $decodificado;
            $retorno = $next($request, $response);
        }else
        {
            //$std->mensaje = "ERROR - Token no valido!";
            $std->token = $token;
            $retorno = $response->withJson($std, 403);
        }

        return $retorno;
    }  

    //2.- (método de clase) verifique si es un ‘propietario’ o no.
    //Recibe el JWT (en el header) a ser verificado.
    //Retorna un JSON con propietario: true/false; mensaje: string (mensaje correspondiente);
    //status: 200/409.
    public static function VerificarPropietario($request,$response,$next)
    {
        $token = $request->getHeader('token')[0];
        $std= new stdClass();

        $decodificado = JWT::decode(
            $token,
            "claveSecreta",
            ['HS256']
        );

        if($decodificado->data->perfil == "propietario")
        {
            $newResponse = $next($request, $response);
            $std->mensaje="Accion permitida.";
            $newResponse= $response->withJson($std, 200);
        }
        else
        { 
            $std->mensaje="ERROR - No tiene esta acción permitida.";
            $newResponse= $response->withJson($std, 409);
        }

        return $newResponse;
    }

    // (método de instancia) verifique si es un ‘ encargado ’ o no.
    // Recibe el JWT a ser verificado.
    // Retorna un JSON con encargado: true/false; mensaje: string (mensaje correspondiente);
    // status: 200/409.
    public function VerificarEncargado($request, $response, $next)
    {
        $token = $request->getHeader('token')[0];
        $std= new stdClass();

        $std= new stdClass();

        $decodificado = JWT::decode(
            $token,
            "claveSecreta",
            ['HS256']
        );

        if($decodificado->data->perfil == "encargado" || $decodificado->data->perfil == "propietario")
        {
            $newResponse = $next($request, $response);
            $std->mensaje="Accion permitida.";
            $newResponse= $response->withJson($std, 200);

        }
        else
        { 
            // Si no lo es, retornar un JSON con el mensaje de error correspondiente (y status 409).
            $std= new stdClass();
            $std->mensaje="ERROR - No tiene esta acción permitida.";
            $newResponse= $response->withJson($std, 409);
        }

        return $newResponse;
    }
}