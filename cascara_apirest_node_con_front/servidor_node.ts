
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
// MIDDLEWARES
//##############################################################################################//


//##############################################################################################//
// RUTAS CRUD y LOGIN
//##############################################################################################//


//##############################################################################################//
// APP
//##############################################################################################//

app.listen(app.get('puerto'), ()=>{
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});