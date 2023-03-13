const UserInfo = require("../models/userInfo");
const UserCred = require("../models/usercripto");
const CourseAcess = require("../models/CourseAcess");
const Videos = require("../models/videos");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const crypto = require("crypto");
const saltLength = 64;

//======================= Funções Importantes ============================
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


  function verifyActivateAccountCode(activationCode){
    return true;
  }

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

//====================================================================

async function ActivateAccount(email, activationCode){
    //=============== Verify Email ==============//
    if(findEmail(email)){
        console.log("Email Encontrado")
        if(verifyActivateAccountCode(activationCode)){
            //============= Achar o usuário do email dado =============
            const User = findUser(email)
            const userUpdate = {activated: true}
            try{
                await User.update(userUpdate)
                console.log('sucesso: conta ativada com sucesso')
            }catch(e){
                console.log(e)
            }
        }else{//Esse Else é do VerifyActivateAcc
            console.log("código incorreto: código não corresponde ao enviado pelo email")
        }
    }else{//Esse Else é do findEmail
        console.log("email não encontrado: email não existe na base de dados")
    }
}

