import { AnyARecord } from "dns";

const express = require('express');

const app = express();

app.set('puerto', 2022);

app.get('/', (request:any, response:any)=>{
    response.send('GET - servidor NodeJS');
});

//AGREGO FILE SYSTEM
const fs = require('fs');

//AGREGO JSON
app.use(express.json());

//AGREGO JWT
const jwt = require("jsonwebtoken");

//SE ESTABLECE LA CLAVE SECRETA PARA EL TOKEN
app.set("key", "cl@ve_secreta");

app.use(express.urlencoded({extended:false}));

//AGREGO MULTER
const multer = require('multer');

//AGREGO MIME-TYPES
const mime = require('mime-types');

//AGREGO STORAGE
const storage = multer.diskStorage({

    destination: "public/juguetes/fotos/",
});

const upload = multer({

    storage: storage
});

//AGREGO CORS (por default aplica a http://localhost)
const cors = require("cors");

//AGREGO MW 
app.use(cors());

//DIRECTORIO DE ARCHIVOS ESTÁTICOS
app.use(express.static("public"));


//AGREGO MYSQL y EXPRESS-MYCONNECTION
const mysql = require('mysql');
const myconn = require('express-myconnection');
const db_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'jugueteria_bd'
};

app.use(myconn(mysql, db_options, 'single'));

//##############################################################################################//
// Middlewares
//##############################################################################################//

const verificar_usuario = express.Router();

verificar_usuario.use((request:any, response:any, next:any) => {

    let obj = request.body;

    request.getConnection((err:any, conn:any) => {
        
        if(!err)
        {
            conn.query("SELECT * FROM usuarios WHERE correo = ? AND clave = ?", [obj.correo, obj.clave], (err:any, rows:any) => {
                
                if(!err)
                {
                    if(rows.length == 1) 
                    {
                        response.obj_usuario = rows[0];
                        next();
                    }
                    else 
                    {
                        response.status(403).json({
                            exito : false,
                            mensaje : "Correo y/o Clave son incorrectos.",
                            jwt : null
                        });
                    }
                }
            });  
        }
    });
});

const verificar_jwt = express.Router();

verificar_jwt.use((request:any, response:any, next:any) => {

    let token = request.headers["x-acess-token"] || request.headers["authorization"];

    if(!token)
    {
        response.status(403).json({
            exito : false,
            mensaje : "El JWT es requerido."
        });
        return;
    }

    if(token.startsWith("Bearer ")) 
    {
        token = token.slice(7, token.length);
    }

    if(token)
    {
        jwt.verify(token, app.get("key"), (error:any, decoded:any) => {

            if(error)
            {
                response.status(403).json({
                    exito : false,
                    mensaje: "El JWT NO es valido."
                });
            }
            else 
            {
                response.jwt = decoded;
                next();
            }

        });
    }
})

//##############################################################################################//
// CRUD
//##############################################################################################//

/*
listarUsuariosBD (GET): mostrará el listado completo de los usuarios (obtenidos de la base de datos)
en un array de Usuario (en formato de cadena JSON).
Retorna un JSON (éxito: true/false; mensaje: string; dato: arrayJSON / null; status: 200/424)
*/
app.get('/listarUsuariosBD', verificar_jwt, (request:any, response:any) => {

    request.getConnection((err:any, conn:any) => {

        if(!err)
        {
            conn.query("SELECT * FROM usuarios", (err:any, rows:any) => {

                if(!err)
                {
                    response.json({
                        exito: true,
                        mensaje: "Datos obtenidos de la bd.",
                        dato: JSON.stringify(rows)
                    });
                }
                else 
                {
                    response.status(424).json({
                        exito: false,
                        mensaje: "Error en consulta de base de datos.",
                        dato : null
                    });
                }

            });
        }
        else 
        {
            response.status(424).json({
                exito: false,
                mensaje: "Error al conectarse a la base de datos.",
                dato : null
            });
        }
    });
});

/*
agregarJugueteBD (POST): recibirá un JSON → juguete_json (marca y precio) y foto para
agregar un registro en la tabla juguetes, de la base de datos jugueteria_bd.
Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
Nota: La foto guardarla en ./public/juguetes/fotos/, con el nombre formado por la marca punto
extensión.
Ejemplo: mattel.jpg
*/
app.post('/agregarJugueteBD', verificar_jwt, upload.single('foto'), (request:any, response:any) => {

    let juguete_json = JSON.parse(request.body.juguete_json);

    if(typeof request.file != "undefined" || request.file != null)
    {
        let file = request.file;
        let extension = mime.extension(file.mimetype);
        let path : string = file.destination + juguete_json.marca + "." + extension;

        fs.renameSync(file.path, path);

        juguete_json.path_foto = path.split("public/juguetes/")[1];
    }
    else 
    {
        juguete_json.path_foto = "";
    }
    
    request.getConnection((err:any, conn:any) => 
    {
        if(!err)
        {
            conn.query("INSERT INTO juguetes set ?", [juguete_json], (err:any, rows:any) => 
            {
                if(!err)
                {
                    response.json({
                        exito: true,
                        mensaje: "Juguete agregado a la bd."
                    });
                }
                else 
                {
                    response.status(424).json({
                        exito: false,
                        mensaje: `No se agrego juguete. Problema en la consulta a bd. ${err}`
                    });
                }
            });
        }
        else 
        {
            response.status(424).json({
                exito: false,
                mensaje: "No se agrego juguete. Problema en la conexion a bd."
            });
        }
    });

});

/*
listarJuguetesBD (GET): Listado de juguetes. Obtendrá el listado completo de los juguetes (array
JSON).
Retorna un JSON (éxito: true/false; mensaje: string; dato: arrayJSON / null; status: 200/424).
*/
app.get('/listarJuguetesBD', verificar_jwt, (request:any, response:any) => {

    request.getConnection((err:any, conn:any) => {

        if(!err)
        {
            conn.query("SELECT * FROM juguetes", (err:any, rows:any) => {

                if(!err)
                {
                    response.json({
                        exito: true,
                        mensaje: "Datos obtenidos de la bd.",
                        dato: JSON.stringify(rows)
                    });
                }
                else 
                {
                    response.status(424).json({
                        exito: false,
                        mensaje: "Error en consulta de base de datos.",
                        dato : null
                    });
                }

            });
        }
        else 
        {
            response.status(424).json({
                exito: false,
                mensaje: "Error al conectarse a la base de datos.",
                dato : null
            });
        }
    });
});

/*
login (POST): Se envía el correo y la clave en un JSON y retorna otro JSON (éxito: true/false;
mensaje: string; jwt: JWT (*) / null; status: 200/403).
(*) el payload del JWT tendrá la siguiente estructura:
- usuario: con todos los datos del usuario, a excepción de la clave.
- alumno: colocar su nombre y apellido
- parcial: indicar el tipo de parcial
El token debe expirar en 120 segundos.
*/
app.post('/login', verificar_usuario, (request:any, response:any) => {

    const user = response.obj_usuario;

    const payload = {
        usuario : {
            id : user.id,
            apellido : user.apellido,
            nombre : user.nombre,
            correo : user.correo,
            foto : user.foto, 
            perfil : user.perfil
        },
        alumno : {
            apellido : "Dacal",
            nombre : "Federico"
        },
        parcial : "SP"
    };

    const token = jwt.sign(payload, app.get('key'), {
        expiresIn : "120s"
    });

    response.json({
        exito : true,
        mensaje : "JWT creado.",
        jwt : token
    });
    
});

/*
login (GET): Se envía el JWT (en el Bearer) y retorna un JSON (éxito: true/false; mensaje: string;
payload: datos (*)/ null; status: 200/403).
(*) datos completos del payload
*/
app.get('/login', verificar_jwt, (request:any, response:any) => {

    const jwt = response.jwt;

    if(jwt)
    {
        response.json({
            exito : true,
            mensaje : "JWT verificado.",
            payload : jwt,
        });
    }
});

/*
toys (DELETE): Borrado de juguetes por ID.
Recibe el ID del juguete a ser borrado (id_juguete, cómo parámetro JSON) más el JWT (en el
Bearer).
Nota: La foto debe ser borrada.
Retorna un JSON (éxito: true/false; mensaje: string; status: 200/418) 
*/
app.delete('/toys', verificar_jwt, (request:any, response:any) => {

    let obj_response : any = {
        exito : false,
        status : 418,
        mensaje : "Juguete no borrado. "
    };

    let id : number = request.body.id_juguete;
    let path_foto : string = "public/juguetes/";

    request.getConnection((err:any, conn:any) => {

        if(!err)
        {
            conn.query("SELECT path_foto FROM juguetes where id = ?", [id], (err:any, result:any) => {

                if(!err && result.length == 1)
                {
                    path_foto += result[0].path_foto;
                }
            });
        }
    });

    request.getConnection((err:any, conn:any) => {

        if(!err)
        {
            conn.query("DELETE FROM juguetes where id = ?", [id], (err:any, rows:any) => {

                if(!err && rows.affectedRows > 0)
                {
                    obj_response.status = 200;
                    obj_response.exito = true;
                    obj_response.mensaje = "Juguete borrado. ";

                    if(fs.existsSync(path_foto) && path_foto != "public/juguetes/")
                    {
                        fs.unlink(path_foto, (err:any) => {

                            if(!err)
                            {
                                obj_response.mensaje += "Foto eliminada.";
                                response.status(obj_response.status).json(obj_response);
                            }
                            else 
                            {
                                obj_response.mensaje += "Error eliminando foto.";
                                response.status(obj_response.status).json(obj_response);
                            }
                        });
                    }
                    else 
                    {
                        obj_response.mensaje += "No se encontro foto vinculada al juguete.";
                        response.status(obj_response.status).json(obj_response);
                    }
                }
                else
                {
                    response.status(obj_response.status).json(obj_response);
                }
            });
        }        
    });
});

/*
toys (POST): Modificar juguetes por ID.
Recibe el JSON del juguete a ser modificado → juguete (id_juguete, marca, precio), la foto y el JWT
(en el Bearer).
El id_juguete será el id del juguete a ser modificado, mientras que el resto, serán los valores a ser
modificados.
Nota: La foto guardarla en ./public/juguetes/fotos/, con el siguiente formato:
marca_modificacion.extension.
Ejemplo: ./public/juguetes/fotos/mattel_modificacion.jpg
Retorna un JSON (éxito: true/false; mensaje: string; status: 200/418) 
*/
app.post('/toys', verificar_jwt, upload.single("foto"), (request:any, response:any) => {

    let obj_response : any = {
        exito: false,
        mensaje: "Juguete no modificado.",
        status: 418,
    };

    let juguete = JSON.parse(request.body.juguete);
    let file = request.file;
    let extension = mime.extension(file.mimetype);
    let path : string = file.destination + juguete.marca + "_modificada" + "." + extension;

    //fs.renameSync(file.path, path);
    //console.log("temp path: " + file.path);
    //console.log("new path: " + path);

    juguete.path_foto = path.split("public/juguetes/")[1];

    let juguete_modif : any = {};

    juguete_modif.marca = juguete.marca;
    juguete_modif.precio = juguete.precio;
    juguete_modif.path_foto = juguete.path_foto;

    request.getConnection((err:any, conn:any) => {

        if(!err)
        {
            conn.query("UPDATE juguetes set ? WHERE id = ?", [juguete_modif, juguete.id], (err:any, rows:any) => {

                if(!err && rows.affectedRows > 0)
                {
                    fs.renameSync(file.path, path);
                    obj_response.status = 200;
                    obj_response.exito = true;
                    obj_response.mensaje = "Juguete modificado";
                    response.status(obj_response.status).json(obj_response);
                }
                else 
                {
                    fs.unlink(file.path, (err:any) => {
                        if(err)
                        {
                            console.log(err);
                        }
                    });
                    response.status(obj_response.status).json(obj_response);
                }
            });
        }
        else 
        {
            response.status(obj_response.status).json(obj_response);
        }
    });
});

//##############################################################################################//
//##############################################################################################//


app.listen(app.get('puerto'), ()=>{
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});