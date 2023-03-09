//==============================================================
    var express = require('express');
    var mysql = require('mysql2');
    var app = express();
    var crypto = require('crypto');
    const sequelize = require('sequelize')
    const bodyParser = require('body-parser');
//==============================================================
    //const UserController = require("./Controllers/2UserController");
    const LogController = require("./Controllers/LogController");
    const PaymentControllr = require("./Controllers/PaymentController");
    //const EmailSender = require("./Controllers/EmailSender");

//==============================================================
    app.use(express.json({limit: '200mb'}))
    app.use(express.urlencoded({ extended: false, limit: '20mb' }))
    
//==============================================================
//=============Conexão com o banco de dados ====================
    const conn = require('./db/conn');

//=============Importar Models  ===============================
    const UserInfo = require("./models/userInfo");
    const UserCred = require('./models/usercripto');
    const VideosModels = require('./models/videos');
    const CourseAcess = require('./models/CourseAcess')

//==============================================================
//============= Importando Rotas ==============================
    const visitanteRoutes = require('./routes/visitanteRoutes');
    //const estudanteRoutes = require('./routes/estudanteRoutes')
    //const videosRoutes = require('./routes/videosRoutes')
    //const adminRoutes = require('./routes/adminRoutes')
//============= Instanciar o Express ===========================
    app.use('/' , visitanteRoutes );
    //Só habilitar quando tiver pronto

//==============================================================
    //EmailSender.SendEmail();
/**
* obtém o tempo atual
* @returns {string} data no formato YYYY-MM-DD HH:MM:SS
*/
function get_actual_date() {
    var time_stamp = "";

    var date_ob = new Date(),
        date = ("0" + date_ob.getDate()).slice(-2),
        month = ("0" + (date_ob.getMonth() + 1)).slice(-2),
        year = date_ob.getFullYear(),
        hours = date_ob.getHours(),
        minutes = date_ob.getMinutes(),
        seconds = date_ob.getSeconds();

    time_stamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds

    return time_stamp;
}
//====================================================================

//Conexão Sync =======================================================

conn.sync()// colocar force: true ao alterar dados no BD
.then( ()=> {
    app.listen(3000)
})
.catch((err)=> {console.log(err)})

//.sync({ force: true})===============================================