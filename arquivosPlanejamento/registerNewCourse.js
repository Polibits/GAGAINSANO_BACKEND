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
//7. Registrar Novo Curso (registerNewCourse)
	//-Entradas: {ID, name, description}
	//-Retorno: {response}
	//-Respostas:
		//(a) sucesso: curso registrado com sucesso
		//(b) erro: não foi possível realizar operação
	//-Operações:
		//(a) registrar curso em CourseInfo
		//(b) criar diretório no backend para aquele curso
		//(c) criar uma tabela "CourseContent-nome-do-curso"

async function registerNewCourse(ID, name, description){
    const Course = {
        ID,
        name,
        description
    }
    try{
        const createdCourse = await CourseContentModel.create(Course)
        console.log(createdCourse)
        console.log('sucesso: curso registrado com sucesso')
                //Verifica se não existe
                    if (!fs.existsSync(name)){
                        //Efetua a criação do diretório
                        fs.mkdir(name, (err) => {
                            if (err) {
                            console.log("Deu ruim...");
                                return
                            }else{
                                console.log("Diretório criado! =) o nome dele é" + name)
                            }

                        
    });
}
    }catch(e){
        console.log(e)
        console.log("erro: não foi possível realizar operação")
    }
}