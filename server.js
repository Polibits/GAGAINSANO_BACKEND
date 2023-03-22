var dotenv = require('dotenv/config');
var express = require('express');
var mysql = require('mysql2');
var app = express();
var crypto = require('crypto');
const cors = require("cors");
const sequelize = require('sequelize')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const port = 5050;

app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(fileUpload());

app.use(
    cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false
    })
);

/* banco de dados */
const conn = require('./db/conn');

/* Importando Rotas */
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

/* Instanciar o Express */
app.use('/' , userRoutes);

/* Conexão Sync */ 
const force = false;
conn.sync({ force: force})// colocar force: true ao alterar dados no BD
.then( ()=> {
    console.log('server rodando na porta: ', port)
    app.listen(port)
})
.catch((err)=> {console.log(err)})

//.sync({ force: true})