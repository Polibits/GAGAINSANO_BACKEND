const UserInfo = require("../models/userInfo");
const UserCred = require("../models/usercripto");
const CourseAcess = require("../models/CourseAcess");
const Videos = require("../models/videos");
const bcrypt = require("bcrypt");

const Sequelize = require("sequelize");
const crypto = require("crypto");

const saltLength = 64;
//============================Funções De "Criptografia"====================
function sha256(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function new_salt(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
//===================== Função de achar o seu Email ========================
 function findEmail(email) {
  const usersInDB =  UserCred.findOne({
    where: {
      email: sha256(email),
    },
    raw: true,
  });

    if(usersInDB){
      return true;
    }else{
      return false;
    }
}
//=========================== Achar CPF ==========================
function findCPF(cpf){
  const usersInDB =  UserInfo.findOne({
    where: {
      CPF: cpf,
    },
    raw: true,
  }).then(result => {
    if(result){
      return true;
    }else{
      return false;
      }
  })
  return false;
  }
//======================== Gerar UserId ==========================
  function newUserID(){
    let userID
    do{
       userID = (Math.floor(Math.random() * 100000000) + 1).toString();
       console.log("AQUI" + findId(userID))
    }while(findId(userID))
    
  return userID;

}

//======================= Achar id do usuário ====================
   function findId(id){
   UserCred.findOne({
    where: {
      UserId: id,
    },
    raw: true,
  }).then(result => {
    if(result){
      return true
    }else{
      return false
    }
  })
  return false;
}


//=================================================================

//===================== Função de achar o seu User ======
async function findUser(email) {
    const usersInDB = await UserCred.findOne({
      where: {
        email: sha256(email),
      },
      raw: true,
    });
//=========== Método para transformar Objeto em Json String =======
    const userInDBJson = JSON.parse(JSON.stringify(usersInDB));
//=================================================================
    return userInDBJson;
  }

async function autheticateCredentials(email, password) {
  let statusCred = false;
  //============= Achar o email ================================
  findEmail(email).then((result) => {
    if (result == true) {
      console.log("Email Correto!");
      findUser(email).then((user) => {
        //=== Retirar Salt e ShaPass do User ======================
        const userSalt = user["salt"];
        const userShaPass = user["password"];
        //=== Autenticação do usuário =============================
        if (sha256(userSalt + password) == userShaPass) {
          statusCred = true;
        } else {
          res.status(400);
          res.send({message:"Senha Errada"});
        }
      });
    } else {
      res.status(400);
          res.send({message:"Email Errado!"});
    }
  });
}



//========================================================================

//=========================================================================

class visitanteController {
  static async showHome(req, res) {}

  static async Login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    findEmail(email);
    autheticateCredentials(email, password).then((login) => {
      if (login == true) {
        console.log("Deu bom! Logado");
      } else {
        console.log("Não deu bom");
      }
      res.send({ message: "Finalizou" });
    });
  }

  static async Register(req, res) {
    console.log("TESTANDO CPF E EMAIL")
    console.log(findCPF(req.body.cpf))
    console.log(findEmail(req.body.email))
    console.log("TESTANDO CPF E EMAIL")
    //===================================
    //=========== UserID ================
    const UserId = newUserID();
    console.log("=================" + UserId)
    //===================================
    //User Infos ========================
    const fullname = req.body.fullname;
    const prefname = req.body.prefname;
    //===================================
    const email = req.body.email;
    const CPF = req.body.cpf;

    if(findEmail(email)){
      res.status(400)
      res.send({message:"Email Já Cadastrado",
      code:"email_already_registered"});
    }else if(findCPF(CPF) == true){
      res.send({message:"CPF Já Cadastrado",
      code:"cpf_already_registered"});
    }else{
      const hashEmail = sha256(email);
    const salt = new_salt(saltLength);
    const password = req.body.password;
    const hashPassword = sha256(salt + password);
    //===================================
    const userInfo = {
      fullname,
      prefname,
      CPF,
      usertype: null,
      UserId: UserId,
    };
    const userCred = {
      salt: salt,
      email: hashEmail,
      password: hashPassword,
      UserId: UserId,
    };
    const userCourseAcess = {
      UserId: UserId,
      gaga_insano_fisica: false,
      gaga_insano_matematica: false,
      gaga_insano_fuvest: false,
    };
    //===================================
    try {
      const createdUserInfo = await UserInfo.create(userInfo);
      const createdUserCred = await UserCred.create(userCred);
      const createdUserCA = await CourseAcess.create(userCourseAcess);
      console.log(createdUserInfo, createdUserCred, createdUserCA);
      res.status(200);
      res.send({message:"Usuário registrado com sucesso",
                code:"sucess"});
    
    } catch (err) {
      console.log(err);
    }

    }
  
  }


  static async getUserInfo(req , res){

  }


}

