"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
app.set('puerto', 2022);
app.get('/', function (request, response) {
    response.send('GET - servidor NodeJS');
});
var fs = require('fs');
app.use(express.json());
var jwt = require("jsonwebtoken");
app.set("key", "cl@ve_secreta");
app.use(express.urlencoded({ extended: false }));
var multer = require('multer');
var mime = require('mime-types');
var storage = multer.diskStorage({
    destination: "public/juguetes/fotos/",
});
var upload = multer({
    storage: storage
});
var cors = require("cors");
app.use(cors());
app.use(express.static("public"));
var mysql = require('mysql');
var myconn = require('express-myconnection');
var db_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'jugueteria_bd'
};
app.use(myconn(mysql, db_options, 'single'));
var verificar_usuario = express.Router();
verificar_usuario.use(function (request, response, next) {
    var obj = request.body;
    request.getConnection(function (err, conn) {
        if (!err) {
            conn.query("SELECT * FROM usuarios WHERE correo = ? AND clave = ?", [obj.correo, obj.clave], function (err, rows) {
                if (!err) {
                    if (rows.length == 1) {
                        response.obj_usuario = rows[0];
                        next();
                    }
                    else {
                        response.status(403).json({
                            exito: false,
                            mensaje: "Correo y/o Clave son incorrectos.",
                            jwt: null
                        });
                    }
                }
            });
        }
    });
});
var verificar_jwt = express.Router();
verificar_jwt.use(function (request, response, next) {
    var token = request.headers["x-acess-token"] || request.headers["authorization"];
    if (!token) {
        response.status(403).json({
            exito: false,
            mensaje: "El JWT es requerido."
        });
        return;
    }
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, app.get("key"), function (error, decoded) {
            if (error) {
                response.status(403).json({
                    exito: false,
                    mensaje: "El JWT NO es valido."
                });
            }
            else {
                response.jwt = decoded;
                next();
            }
        });
    }
});
app.get('/listarUsuariosBD', verificar_jwt, function (request, response) {
    request.getConnection(function (err, conn) {
        if (!err) {
            conn.query("SELECT * FROM usuarios", function (err, rows) {
                if (!err) {
                    response.json({
                        exito: true,
                        mensaje: "Datos obtenidos de la bd.",
                        dato: JSON.stringify(rows)
                    });
                }
                else {
                    response.status(424).json({
                        exito: false,
                        mensaje: "Error en consulta de base de datos.",
                        dato: null
                    });
                }
            });
        }
        else {
            response.status(424).json({
                exito: false,
                mensaje: "Error al conectarse a la base de datos.",
                dato: null
            });
        }
    });
});
app.post('/agregarJugueteBD', verificar_jwt, upload.single('foto'), function (request, response) {
    var juguete_json = JSON.parse(request.body.juguete_json);
    if (typeof request.file != "undefined" || request.file != null) {
        var file = request.file;
        var extension = mime.extension(file.mimetype);
        var path = file.destination + juguete_json.marca + "." + extension;
        fs.renameSync(file.path, path);
        juguete_json.path_foto = path.split("public/juguetes/")[1];
    }
    else {
        juguete_json.path_foto = "";
    }
    request.getConnection(function (err, conn) {
        if (!err) {
            conn.query("INSERT INTO juguetes set ?", [juguete_json], function (err, rows) {
                if (!err) {
                    response.json({
                        exito: true,
                        mensaje: "Juguete agregado a la bd."
                    });
                }
                else {
                    response.status(424).json({
                        exito: false,
                        mensaje: "No se agrego juguete. Problema en la consulta a bd. ".concat(err)
                    });
                }
            });
        }
        else {
            response.status(424).json({
                exito: false,
                mensaje: "No se agrego juguete. Problema en la conexion a bd."
            });
        }
    });
});
app.get('/listarJuguetesBD', verificar_jwt, function (request, response) {
    request.getConnection(function (err, conn) {
        if (!err) {
            conn.query("SELECT * FROM juguetes", function (err, rows) {
                if (!err) {
                    response.json({
                        exito: true,
                        mensaje: "Datos obtenidos de la bd.",
                        dato: JSON.stringify(rows)
                    });
                }
                else {
                    response.status(424).json({
                        exito: false,
                        mensaje: "Error en consulta de base de datos.",
                        dato: null
                    });
                }
            });
        }
        else {
            response.status(424).json({
                exito: false,
                mensaje: "Error al conectarse a la base de datos.",
                dato: null
            });
        }
    });
});
app.post('/login', verificar_usuario, function (request, response) {
    var user = response.obj_usuario;
    var payload = {
        usuario: {
            id: user.id,
            apellido: user.apellido,
            nombre: user.nombre,
            correo: user.correo,
            foto: user.foto,
            perfil: user.perfil
        },
        alumno: {
            apellido: "Dacal",
            nombre: "Federico"
        },
        parcial: "SP"
    };
    var token = jwt.sign(payload, app.get('key'), {
        expiresIn: "120s"
    });
    response.json({
        exito: true,
        mensaje: "JWT creado.",
        jwt: token
    });
});
app.get('/login', verificar_jwt, function (request, response) {
    var jwt = response.jwt;
    if (jwt) {
        response.json({
            exito: true,
            mensaje: "JWT verificado.",
            payload: jwt,
        });
    }
});
app.delete('/toys', verificar_jwt, function (request, response) {
    var obj_response = {
        exito: false,
        status: 418,
        mensaje: "Juguete no borrado. "
    };
    var id = request.body.id_juguete;
    var path_foto = "public/juguetes/";
    request.getConnection(function (err, conn) {
        if (!err) {
            conn.query("SELECT path_foto FROM juguetes where id = ?", [id], function (err, result) {
                if (!err && result.length == 1) {
                    path_foto += result[0].path_foto;
                }
            });
        }
    });
    request.getConnection(function (err, conn) {
        if (!err) {
            conn.query("DELETE FROM juguetes where id = ?", [id], function (err, rows) {
                if (!err && rows.affectedRows > 0) {
                    obj_response.status = 200;
                    obj_response.exito = true;
                    obj_response.mensaje = "Juguete borrado. ";
                    if (fs.existsSync(path_foto) && path_foto != "public/juguetes/") {
                        fs.unlink(path_foto, function (err) {
                            if (!err) {
                                obj_response.mensaje += "Foto eliminada.";
                                response.status(obj_response.status).json(obj_response);
                            }
                            else {
                                obj_response.mensaje += "Error eliminando foto.";
                                response.status(obj_response.status).json(obj_response);
                            }
                        });
                    }
                    else {
                        obj_response.mensaje += "No se encontro foto vinculada al juguete.";
                        response.status(obj_response.status).json(obj_response);
                    }
                }
                else {
                    response.status(obj_response.status).json(obj_response);
                }
            });
        }
    });
});
app.post('/toys', verificar_jwt, upload.single("foto"), function (request, response) {
    var obj_response = {
        exito: false,
        mensaje: "Juguete no modificado.",
        status: 418,
    };
    var juguete = JSON.parse(request.body.juguete);
    var file = request.file;
    var extension = mime.extension(file.mimetype);
    var path = file.destination + juguete.marca + "_modificada" + "." + extension;
    juguete.path_foto = path.split("public/juguetes/")[1];
    var juguete_modif = {};
    juguete_modif.marca = juguete.marca;
    juguete_modif.precio = juguete.precio;
    juguete_modif.path_foto = juguete.path_foto;
    request.getConnection(function (err, conn) {
        if (!err) {
            conn.query("UPDATE juguetes set ? WHERE id = ?", [juguete_modif, juguete.id], function (err, rows) {
                if (!err && rows.affectedRows > 0) {
                    fs.renameSync(file.path, path);
                    obj_response.status = 200;
                    obj_response.exito = true;
                    obj_response.mensaje = "Juguete modificado";
                    response.status(obj_response.status).json(obj_response);
                }
                else {
                    fs.unlink(file.path, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    response.status(obj_response.status).json(obj_response);
                }
            });
        }
        else {
            response.status(obj_response.status).json(obj_response);
        }
    });
});
app.listen(app.get('puerto'), function () {
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});
//# sourceMappingURL=servidor_node.js.map