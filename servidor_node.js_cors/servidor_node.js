var express = require('express');
var app = express();
app.set('puerto', 9876);
app.get('/', function (request, response) {
    response.send('GET - servidor NodeJS');
});
//AGREGO FILE SYSTEM
var fs = require('fs');
//AGREGO JSON
app.use(express.json());
//INDICO RUTA HACIA EL ARCHIVO
var path_archivo = "./archivos/productos.txt";
//INDICO RUTA PARA EL ARCHIVO PRODUCTOS-FOTOS
var path_archivo_foto = "./archivos/productos_fotos.txt";
//AGREGO MULTER
var multer = require('multer');
//AGREGO MIME-TYPES
var mime = require('mime-types');
//AGREGO STORAGE
var storage = multer.diskStorage({
    destination: "public/fotos/"
});
var upload = multer({
    storage: storage
});
//AGREGO MYSQL y EXPRESS-MYCONNECTION
var mysql = require('mysql');
var myconn = require('express-myconnection');
var db_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'productos_usuarios_node'
};
//AGREGO MW 
app.use(myconn(mysql, db_options, 'single'));
//AGREGO CORS (por default aplica a http://localhost)
var cors = require("cors");
//AGREGO MW 
app.use(cors());
/*
let listaBlanca = ["http://localhost", "http://127.0.0.1", "http://mi_host.com"];

let corsOptions = {
    origin: (origin:any, callback:any)=>{
        if(listaBlanca.indexOf(origin) != -1)
            callback(null, true);
        else
            callback(new Error("no permitido por CORS."));
    }
}
routes.get("/", cors(corsOptions), (request:any, response:any)=>{
    response.send("Solo accedia si se encuentra en la 'lista blanca'");
});
*/
//DIRECTORIO DE ARCHIVOS ESTÁTICOS
app.use(express.static("public"));
//##############################################################################################//
//RUTAS PARA EL CRUD ARCHIVOS
//##############################################################################################//
//LISTAR
app.get('/productos', function (request, response) {
    fs.readFile(path_archivo, "UTF-8", function (err, archivo) {
        if (err)
            throw ("Error al intentar leer el archivo.");
        console.log("Archivo leído.");
        var prod_array = archivo.split(",\r\n");
        response.send(JSON.stringify(prod_array));
    });
});
//AGREGAR
app.post('/productos', function (request, response) {
    var dato = request.body;
    var contenido = JSON.stringify(dato) + ",\r\n";
    //agrega texto
    fs.appendFile(path_archivo, contenido, function (err) {
        if (err)
            throw ("Error al intentar agregar en archivo.");
        console.log("Archivo escrito.");
        response.send("Archivo producto escrito.");
    });
});
//MODIFICAR
app.post('/productos/modificar', function (request, response) {
    var obj = request.body;
    fs.readFile(path_archivo, "UTF-8", function (err, archivo) {
        if (err)
            throw ("Error al intentar leer el archivo.");
        var prod_array = archivo.split(",\r\n");
        var obj_array = [];
        prod_array.forEach(function (prod_str) {
            if (prod_str != "" && prod_str != undefined) {
                obj_array.push(JSON.parse(prod_str));
            }
        });
        var obj_array_modif = [];
        obj_array.forEach(function (prod) {
            if (prod.codigo == obj.codigo) {
                prod.marca = obj.marca;
                prod.precio = obj.precio;
            }
            obj_array_modif.push(prod);
        });
        var productos_string = "";
        obj_array_modif.forEach(function (prod) {
            productos_string += JSON.stringify(prod) + ",\r\n";
        });
        //escribe texto
        fs.writeFile(path_archivo, productos_string, function (err) {
            if (err)
                throw ("Error al intentar escribir en archivo.");
            console.log("Archivo modificado.");
            response.send("Archivo producto modificado.");
        });
    });
});
//ELIMINAR
app.post('/productos/eliminar', function (request, response) {
    var obj = request.body;
    fs.readFile(path_archivo, "UTF-8", function (err, archivo) {
        if (err)
            throw ("Error al intentar leer el archivo.");
        var prod_array = archivo.split(",\r\n");
        var obj_array = [];
        prod_array.forEach(function (prod_str) {
            if (prod_str != "" && prod_str != undefined) {
                obj_array.push(JSON.parse(prod_str));
            }
        });
        var obj_array_eli = [];
        obj_array.forEach(function (prod) {
            if (prod.codigo != obj.codigo) {
                //se agregan todos los productos, menos el que se quiere eliminar
                obj_array_eli.push(prod);
            }
        });
        var productos_string = "";
        obj_array_eli.forEach(function (prod) {
            productos_string += JSON.stringify(prod) + ",\r\n";
        });
        //escribe texto
        fs.writeFile(path_archivo, productos_string, function (err) {
            if (err)
                throw ("Error al intentar escribir en archivo.");
            console.log("Archivo eliminado.");
            response.send("Archivo producto eliminado.");
        });
    });
});
//##############################################################################################//
//RUTAS PARA EL CRUD - CON FOTOS -
//##############################################################################################//
//LISTAR
app.get('/productos_fotos', function (request, response) {
    fs.readFile(path_archivo_foto, "UTF-8", function (err, archivo) {
        if (err)
            throw ("Error al intentar leer el archivo con foto.");
        console.log("Archivo leído con foto.");
        var prod_array = archivo.split(",\r\n");
        response.send(JSON.stringify(prod_array));
    });
});
//AGREGAR
app.post('/productos_fotos', upload.single("foto"), function (request, response) {
    //console.log(request.file);
    var file = request.file;
    var extension = mime.extension(file.mimetype);
    var obj = JSON.parse(request.body.obj);
    var path = file.destination + obj.codigo + "." + extension;
    fs.renameSync(file.path, path);
    obj.path = path.split("public/")[1];
    var contenido = JSON.stringify(obj) + ",\r\n";
    //agrega texto
    fs.appendFile(path_archivo_foto, contenido, function (err) {
        if (err)
            throw ("Error al intentar agregar en archivo con foto.");
        console.log("Archivo escrito con foto.");
        response.send("Archivo producto escrito - con foto.");
    });
});
//MODIFICAR
app.post('/productos_fotos/modificar', upload.single("foto"), function (request, response) {
    var file = request.file;
    var extension = mime.extension(file.mimetype);
    var obj = JSON.parse(request.body.obj);
    var path = file.destination + obj.codigo + "." + extension;
    fs.renameSync(file.path, path);
    obj.path = path.split("public/")[1];
    fs.readFile(path_archivo_foto, "UTF-8", function (err, archivo) {
        if (err)
            throw ("Error al intentar leer el archivo con foto.");
        var prod_array = archivo.split(",\r\n");
        var obj_array = [];
        prod_array.forEach(function (prod_str) {
            if (prod_str != "" && prod_str != undefined) {
                obj_array.push(JSON.parse(prod_str));
            }
        });
        var obj_array_modif = [];
        obj_array.forEach(function (prod) {
            if (prod.codigo == obj.codigo) {
                prod.marca = obj.marca;
                prod.precio = obj.precio;
            }
            obj_array_modif.push(prod);
        });
        var productos_string = "";
        obj_array_modif.forEach(function (prod) {
            productos_string += JSON.stringify(prod) + ",\r\n";
        });
        //escribe texto
        fs.writeFile(path_archivo_foto, productos_string, function (err) {
            if (err)
                throw ("Error al intentar escribir en archivo.");
            console.log("Archivo modificado con foto.");
            response.send("Archivo producto modificado con foto.");
        });
    });
});
//ELIMINAR
app.post('/productos_fotos/eliminar', function (request, response) {
    var obj = request.body;
    fs.readFile(path_archivo_foto, "UTF-8", function (err, archivo) {
        if (err)
            throw ("Error al intentar leer el archivo con foto.");
        var prod_array = archivo.split(",\r\n");
        var obj_array = [];
        prod_array.forEach(function (prod_str) {
            if (prod_str != "" && prod_str != undefined) {
                obj_array.push(JSON.parse(prod_str));
            }
        });
        var obj_array_eli = [];
        var path_foto = "public/";
        obj_array.forEach(function (prod) {
            if (prod.codigo != obj.codigo) {
                //se agregan todos los productos, menos el que se quiere eliminar
                obj_array_eli.push(prod);
            }
            else {
                //se guarda el path de la foto a ser eliminada
                path_foto += prod.path;
            }
        });
        var productos_string = "";
        if (path_foto !== "") {
            obj_array_eli.forEach(function (prod) {
                productos_string += JSON.stringify(prod) + ",\r\n";
            });
            //escribe texto
            fs.writeFile(path_archivo_foto, productos_string, function (err) {
                if (err)
                    throw ("Error al intentar escribir en archivo con foto.");
                console.log("Archivo eliminado con foto.");
                fs.unlink(path_foto, function (err) {
                    if (err)
                        throw err;
                    console.log(path_foto + ' fue borrado.');
                });
                response.send("Archivo producto con foto eliminado.");
            });
        }
    });
});
//BONUS TRACK - AGREGAR ARCHIVOS MÚLTIPLES
app.post('/test_fotos_multiples', upload.array("fotos"), function (request, response) {
    console.log(request.files);
    var files = request.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var extension = mime.extension(file.mimetype);
        var path = file.destination + "__foto__" + i + "." + extension;
        fs.renameSync(file.path, path);
    }
    response.send("Archivos múltiples subidos exitosamente!!!");
});
//##############################################################################################//
//RUTAS PARA EL CRUD - CON BD -
//##############################################################################################//
//LISTAR
app.get('/productos_bd', function (request, response) {
    request.getConnection(function (err, conn) {
        if (err)
            throw ("Error al conectarse a la base de datos.");
        conn.query("select * from productos", function (err, rows) {
            if (err)
                throw ("Error en consulta de base de datos.");
            //response.json(rows);
            response.send(JSON.stringify(rows));
        });
    });
});
//AGREGAR
app.post('/productos_bd', upload.single("foto"), function (request, response) {
    var file = request.file;
    var extension = mime.extension(file.mimetype);
    var obj = JSON.parse(request.body.obj);
    var path = file.destination + obj.codigo + "." + extension;
    fs.renameSync(file.path, path);
    obj.path = path.split("public/")[1];
    request.getConnection(function (err, conn) {
        if (err)
            throw ("Error al conectarse a la base de datos.");
        conn.query("insert into productos set ?", [obj], function (err, rows) {
            if (err) {
                console.log(err);
                throw ("Error en consulta de base de datos.");
            }
            response.send("Producto agregado a la bd.");
        });
    });
});
//MODIFICAR
app.post('/productos_bd/modificar', upload.single("foto"), function (request, response) {
    var file = request.file;
    var extension = mime.extension(file.mimetype);
    var obj = JSON.parse(request.body.obj);
    var path = file.destination + obj.codigo + "." + extension;
    fs.renameSync(file.path, path);
    obj.path = path.split("public/")[1];
    var obj_modif = {};
    //para excluir la pk (codigo)
    obj_modif.marca = obj.marca;
    obj_modif.precio = obj.precio;
    obj_modif.path = obj.path;
    request.getConnection(function (err, conn) {
        if (err)
            throw ("Error al conectarse a la base de datos.");
        conn.query("update productos set ? where codigo = ?", [obj_modif, obj.codigo], function (err, rows) {
            if (err) {
                console.log(err);
                throw ("Error en consulta de base de datos.");
            }
            response.send("Producto modificado en la bd.");
        });
    });
});
//ELIMINAR
app.post('/productos_bd/eliminar', function (request, response) {
    var obj = request.body;
    var path_foto = "public/";
    request.getConnection(function (err, conn) {
        if (err)
            throw ("Error al conectarse a la base de datos.");
        //obtengo el path de la foto del producto a ser eliminado
        conn.query("select path from productos where codigo = ?", [obj.codigo], function (err, result) {
            if (err)
                throw ("Error en consulta de base de datos.");
            //console.log(result[0].path);
            path_foto += result[0].path;
        });
    });
    request.getConnection(function (err, conn) {
        if (err)
            throw ("Error al conectarse a la base de datos.");
        conn.query("delete from productos where codigo = ?", [obj.codigo], function (err, rows) {
            if (err) {
                console.log(err);
                throw ("Error en consulta de base de datos.");
            }
            fs.unlink(path_foto, function (err) {
                if (err)
                    throw err;
                console.log(path_foto + ' fue borrado.');
            });
            response.send("Producto eliminado de la bd.");
        });
    });
});
app.listen(app.get('puerto'), function () {
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});
