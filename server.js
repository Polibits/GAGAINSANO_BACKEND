var dotenv = require('dotenv/config');
var express = require('express');
var mysql = require('mysql2');
var app = express();
var crypto = require('crypto');
const sequelize = require('sequelize')
const bodyParser = require('body-parser');

/* importanto controllers */
//const UserController = require("./Controllers/2UserController");
const LogController = require("./Controllers/LogController");
const PaymentControllr = require("./Controllers/PaymentController");
//const EmailSender = require("./Controllers/EmailSender");

app.use(express.json({limit: '200mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

/* banco de dados */
const conn = require('./db/conn');

/* Importar Models */
const UserInfo = require("./models/userInfo");
const UserCred = require('./models/usercripto');
const VideosModels = require('./models/videos');
const CourseAcess = require('./models/CourseAcess')

/* Importando Rotas */
const userRoutes = require('./routes/userRoutes');
//const estudanteRoutes = require('./routes/estudanteRoutes')
//const videosRoutes = require('./routes/videosRoutes')
//const adminRoutes = require('./routes/adminRoutes')

/* Instanciar o Express */
app.use('/' , userRoutes );

/* Conexão Sync */ 
conn.sync({ force: true})// colocar force: true ao alterar dados no BD
.then( ()=> {
    app.listen(3000)
})
.catch((err)=> {console.log(err)})

//.sync({ force: true})===============================================