 const User = require('../models/user');
 const Videos = require('../models/videos');
 const bcrypt = require('bycript')

 class visitanteController{

    static async showHome( req , res){
        

    }

    static async showLogin( req , res){
        

    }

    static async showRegister( req , res){
        const fullname = req.body.fullname;
        const prefname = req.body.prefname;
        const email = req.body.email;
        const password = req.body.password;
        const CPF = req.body.cpf;

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password , salt)

        

        

    }

    static async showCursos( req , res){
        

    }

    static async showSimulados( req , res){
        

    }

    static async showRecados( req , res){
        

    }

    static async showPerfil( req , res){
        

    }

    static async materiaisgrat( req , res){
        

    }

    static async olimpiadas( req , res){
        

    }

    static async gagaresolve( req , res){
        

    }
    



 }






module.exports = visitanteController;