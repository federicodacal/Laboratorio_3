<?php
use Firebase\JWT\JWT;
use Mpdf\Mpdf;
require_once './clases/usuario.php';

class Barbijo
{
    public $id;
    public $color;
    public $tipo;
    public $precio;

    //------------------------------------------------------
    //                         API
    //------------------------------------------------------
    public function AltaBarbijo($request, $response, $args)
    { 
        $ArrayDeParametros = $request->getParsedBody();
        $parametro = $ArrayDeParametros['barbijo'];
        $parametro = json_decode($parametro);  
        
        $barbi = new Barbijo();
        $barbi->color = $parametro->color;
        $barbi->tipo = $parametro->tipo;
        $barbi->precio = $parametro->precio;

        $std= new stdclass();
        if($barbi->AltaBarbijoBD($barbi))
        {
            // Retorna un JSON (éxito: true/false; mensaje: string; status: 200/418)
            $std->exito = true;
            $std->mensaje = "El barbijo fue agregado con exito.";
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

    public function ListaBarbijo($resquest, $response, $args)
    {
        $stringJSON= Barbijo::TraerTodosBarbijosBD(); 
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

    public function BorrarBarbijo($resquest, $response, $args)
    {
        $token = $resquest->getHeader('token')[0];
        $parametro = $resquest->getParsedBody();
        $id = $parametro['id_barbijo'];

        $barbi = new Barbijo();
        $std = new stdclass(); 

        if($token != "")
        {
            if($barbi->EliminarBarbijoBD($id))
            {
                $std->exito = true;
                $std->mensaje = "Barbijo borrado";
                $retorno = $response->withJson($std, 200);
            }
            else 
            {
                $std->exito = false;
                $std->mensaje = "ERROR!";
                $retorno = $response->withJson($std, 418);
            }
        }
        else 
        {
            $std->exito = false;
            $std->mensaje = "ERROR!";
            $retorno = $response->withJson($std, 418);
        }

        return $retorno;
    }

    public function ModificarBarbijo($resquest, $response, $args)
    {
        $arrayDeParametros = $resquest->getParsedBody();
        $token = $resquest->getHeader('token')[0];
        $parametro = $arrayDeParametros['barbijo'];
        $parametro = json_decode($parametro);

        $barbi = new Barbijo();
        $id = $parametro->id;
        $barbi->color = $parametro->color;
        $barbi->tipo = $parametro->tipo;
        $barbi->precio = $parametro->precio;

        $std = new stdclass(); 

        if($token != "")
        {
            if($barbi->ModificarBarbijoBD($id, $barbi))
            {
                $std->exito = true;
                $std->mensaje = "Barbijo modificado";
                $retorno = $response->withJson($std, 200);
            }
            else 
            {
                $std->exito = false;
                $std->mensaje = "ERROR!";
                $retorno = $response->withJson($std, 418);
            }
        }
        else 
        {
            $std->exito = false;
            $std->mensaje = "ERROR!";
            $retorno = $response->withJson($std, 418);
        }

        return $retorno;
    }

    public function Pdf($resquest, $response, $args)
    { 
        $tipo = $_GET["tipo_pdf"]; 
        $token = $_GET["token"];         
        $tabla="<table border='1' align='center'>";

        if($tipo == "barbijo")
        {
            $babijos = Barbijo::TraerTodosBarbijosBD(); 
            $mpdf = new Mpdf();
            $mpdf->SetHeader('Barriento Zahira - Página: {PAGENO}');
            $mpdf->setFooter(date("F j, Y"));
            $mpdf->WriteHTML('<h1>Lista de barbijos</h1><br>');
            $tabla .= '<tr><th>COLOR</th><th>TIPO</th><th>PRECIO</th></tr>';

            foreach ($babijos as $item)
            {      
                $tabla .= '<tr>
                            <td>'.$item->color.'</td><td>'.$item->tipo.'</td><td>'.$item->precio.'</td>
                        </tr>';
            }		
        }
        else
        {
            $usuario = Usuario::TraerTodosUsuBD();
            $mpdf = new Mpdf();
            $mpdf->SetHeader('Barriento Zahira - Página: {PAGENO}');
            $mpdf->setFooter(date("F j, Y"));
            $mpdf->WriteHTML('<h1>Lista de usuarios</h1><br>');
            $tabla .= '<tr><th>CORREO</th><th>NOMBRE</th><th>APELLIDO</th><th>PERFIL</th><th>FOTO</th></tr>';

            foreach ($usuario as $item)
            {
                $tabla .= '<tr>
                <td>'.$item->correo.'</td><td>'.$item->nombre.'</td><td>'.$item->apellido.'</td><td>'.$item->perfil.'</td><th><img src="'.$item->foto.'" height=50 width=50 ></img></td>
                </tr>';
            }
        }
        
        $tabla .= '</table>';
        $mpdf->WriteHTML($tabla);

        return $mpdf->Output();
    }

    //------------------------------------------------------
    //                    BASE DE DATOS
    //------------------------------------------------------
    public static function AltaBarbijoBD($barbi)
    {
        $retorno = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();    

        $consulta =$objetoAccesoDato->RetornarConsulta ("INSERT INTO `barbijos`(`color`, `tipo`, `precio`)
        VALUES (:color, :tipo, :precio)");               
        $consulta->bindValue(':color', $barbi->color, PDO::PARAM_STR);
        $consulta->bindValue(':tipo', $barbi->tipo, PDO::PARAM_STR);
        $consulta->bindValue(':precio', $barbi->precio, PDO::PARAM_STR);
        $consulta->execute();   

        if($consulta->rowCount()>0) {
            $retorno = true;
        } 
        return $retorno;
    }

    public static function TraerTodosBarbijosBD()
    {    
      $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();        
      $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM barbijos");    
      $consulta->execute();   
      $autos = $consulta->fetchAll(PDO::FETCH_CLASS, "Barbijo");
      return $autos;         
    }

    public static function EliminarBarbijoBD($id)
    {
        $retorno = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM barbijos WHERE id = :id");
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
        if ($consulta->rowCount() > 0) {
            $retorno = true;
        }
        return $retorno;
    }

    public static function ModificarBarbijoBD($id, $producto)
    {
        $retorno = 0;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE barbijos SET color=:color, 
        tipo=:tipo, precio=:precio WHERE id=:id");
                                                    
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
    
        $consulta->bindValue(':color', $producto->color, PDO::PARAM_STR);
        $consulta->bindValue(':tipo', $producto->tipo, PDO::PARAM_STR);
        $consulta->bindValue(':precio', $producto->precio, PDO::PARAM_STR);

        $consulta->execute();

        if ($consulta->rowCount() > 0) {
            $retorno = 1;
        }
        return $retorno;
    }
}

?>