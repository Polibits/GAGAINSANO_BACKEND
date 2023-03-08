 const UserInfo = require('../models/userInfo');
 const UserCred = require('../models/usercripto')
 const Videos = require('../models/videos');
 const bcrypt = require('bcrypt')


const Sequelize = require('sequelize');
const crypto = require('crypto');


const saltLength = 64;
//============================Funções De "Criptografia"====================
function sha256(content) {
    return crypto.createHash('sha256').update(content).digest('hex')
}

function new_salt(length) {
    return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0,length);
};

async function findEmail(email){
    const usersInDB = await UserCred.findAll({
        where: {
            email: sha256(email)
        }, raw: true
    });
    console.log("Email Encontrado! " + usersInDB)
}

async function autheticateCredentials(email, password) {
    let sucess = false;
    
    const usersInDB = await UserCred.findAll({
        where: {
            email: sha256(email)
        }, raw: true
    });
    
    console.log(usersInDB + "saporraaaa")
    if(!usersInDB){
        console.log("Email errado!")
    }else{
        console.log("Email Correto!")
    }

    let users = usersInDB;

    if(users.length == 1){
        let dbPassword = users[0].dataValues.password;
        let dbSalt = users[0].dataValues.salt;

        if(sha256(dbSalt + password) == dbPassword) {
            sucess = true;
            console.log("Senha correta")
        }else{
            console.log("Senha errada")
        }
    }
    console.log("O resultado da função cred é :" + sucess)
    return sucess;
}
//========================================================================




 
//=========================================================================

 class visitanteController{
    

    static async showHome( req , res){

    }

    static async showLogin( req , res){
        const email = req.body.email;
        const password = req.body.password;
        findEmail(email)
        autheticateCredentials(email, password).then(login => {
            console.log("O resultado antes do If :" + login)
        if(login == true){
            console.log("Deu bom! Logado")
        }else{
            console.log("Não deu bom")
            
        }
        res.send({message: "Finalizou"})
        })
        


    }


    static async showRegister( req , res){
        //User Infos ========================
        const fullname = req.body.fullname;
        const prefname = req.body.prefname;
        const CPF = req.body.cpf;
        //===================================
        //User Cred =========================
        const email = req.body.email;
        const hashEmail = sha256(email);
        const salt  = new_salt(saltLength);
        const password = req.body.password;
        const hashPassword = sha256(salt + password);
        //===================================
        const userInfo = {fullname , prefname, CPF};
        const userCred = { salt:salt, email:hashEmail , password:hashPassword};
        //===================================


        try{
            const createdUserInfo = await UserInfo.create(userInfo);
            const createdUserCred = await UserCred.create(userCred);
            console.log(createdUserInfo , createdUserCred)
            res.status(200);
            res.send({createdUserCred})
        }catch(err){
            console.log(err)
        }
        

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