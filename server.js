var dotenv = require('dotenv/config');
var express = require('express');
var mysql = require('mysql2');
var app = express();
var crypto = require('crypto');
const cors = require("cors");
const sequelize = require('sequelize')
const bodyParser = require('body-parser');

const port = 5050;

/* importanto controllers */
//const UserController = require("./Controllers/2UserController");
const LogController = require("./Controllers/LogController");
const PaymentController = require("./Controllers/PaymentController");
//const EmailSender = require("./Controllers/EmailSender");

app.use(express.json({limit: '200mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

app.use(
    cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false
    })
);


/* banco de dados */
const conn = require('./db/conn');

/* importar models */
const UserInfo = require("./models/userInfo");
const UserCredentials = require('./models/UserCredentials');
const VideosModels = require('./models/videos');
const CourseAcess = require('./models/CourseAcess')

/* Importando Rotas */
const userRoutes = require('./routes/userRoutes');

/* Instanciar o Express */
app.use('/' , userRoutes );

/* Conexão Sync */ 
const force = false;
conn.sync({ force: force})// colocar force: true ao alterar dados no BD
.then( ()=> {
    console.log('server rodando na porta: ', port)
    app.listen(port)
})
.catch((err)=> {console.log(err)})

//.sync({ force: true})