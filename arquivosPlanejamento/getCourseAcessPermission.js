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
//===================== Função de achar o seu User ======
async function findUserInfo(email) {
    const usersInDB = await UserInfo.findOne({
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
//===================== Função de achar o seu User ======
async function findUserCourseAcess(UserId) {
    const usersInDB = await UserInfo.findOne({
      where: {
        UserId: UserId,
      },
      raw: true,
    });
//=========== Método para transformar Objeto em Json String =======
    const userInDBJson = JSON.parse(JSON.stringify(usersInDB));
//=================================================================
    return userInDBJson;
  }

//====================================================================


async function getCourseAcessPermission(ID, courseID){
    const user = findUserCourseAcess(UserId);
    let courseFind;
    switch (courseID) {
        case 1:
            courseFind = user["gaga_insano_fisica"]
            console.log(courseFind)
          break
        case 2:
            courseFind = user["gaga_insano_matematica"]
            console.log(courseFind)
          break
        case 3:
            courseFind = user["gaga_insano_fuvest"]
            console.log(courseFind)
          break
        default:
          console.log(courseID + "Não existe")
          break
        
        
      }



}