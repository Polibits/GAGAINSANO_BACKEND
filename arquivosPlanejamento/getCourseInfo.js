const UserInfo = require("../models/userInfo");
const UserCred = require("../models/usercripto");
const CourseAcess = require("../models/CourseAcess");
const CourseContentModel = require('../models/CourseContent')
const Videos = require("../models/videos");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const crypto = require("crypto");
const saltLength = 64;
const fs = require('fs');
const dir = "C:/Temp/Xisto";


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
    const usersInDB = await CourseAcess.findOne({
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
//===================== Função de achar o seu User ======
async function findUserId(UserId) {
  const usersInDB = await UserCred.findOne({
    where: {
      UserId: UserId,
    },
    raw: true,
  });
  if(usersInDB){
    return true;
  }else{
    return false;
  }

}
//=====================================================================














//8. Obter Informações do Curso (getCourseInfo)
	//-Entradas: {courseID}
	//-Retorno: {response, ID, name, description, contentRoute}
	//-Respostas:
		//(a) sucesso: informações obtidas com sucesso
		//(b) id não cadastrado: id não encontrado na base de dados
	//-Operações:
		//(a) consultar tabela CourseInfo
		//(b) 
//================================
async function getCourseInfo(courseID){
    const CourseContent = await CourseContentModel.findOne({
        where: {
            Id: courseID,
        },
        raw: true,
      });
      const CCJson = JSON.parse(JSON.stringify(CourseContent));
      console.log(CCJson);
}