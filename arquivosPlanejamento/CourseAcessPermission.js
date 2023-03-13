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


//Modificar Acesso ao Curso (modifyCourseAcessPermission)
	//-Entradas: {ID, courseID, acessPermission}
	//-Retorno: {response}
	//-Respostas:
		//(a) sucesso: permissão alterada com sucesso
		//(b) id não cadastrado: id não foi encontrado na tabela
		//(c) erro: não foi possível realizar operação
	//-Operações:
		//(a) modificar tabela CourseAcess na linha do estudante e coluna do curso


    async function modifyCourseAcessPermission(ID, courseID ,acessPermission){
      const IDFind = findUserId(ID)
      const user = findUserCourseAcess(ID);
      if(IDFind){ // Verificar se o ID do User é Válido
        switch (courseID) { // Acessa O ID do curso
          case 1:
              console.log(courseFind)
              const userUpdate1 = {"gaga_insano_fisica": acessPermission}
              try{
                  await CourseAcess.update(userUpdate1)
                  console.log('permissão alterada com sucesso')
              }catch(e){
                  console.log(e)
                  console.log("não foi possível realizar operação")
              }
            break
          case 2:
              console.log(courseFind)
              const userUpdate2 = {"gaga_insano_matematica": acessPermission}
              try{
                  await CourseAcess.update(userUpdate2)
                  console.log('permissão alterada com sucesso')
              }catch(e){
                  console.log(e)
                  console.log("não foi possível realizar operação")
              }
            break
          case 3:
              console.log(courseFind)
              const userUpdate3 = {"gaga_insano_fuvest": acessPermission}
              try{
                  await CourseAcess.update(userUpdate3)
                  console.log('permissão alterada com sucesso')
              }catch(e){
                  console.log(e)
                  console.log("não foi possível realizar operação")
              }
            break
          default:
            console.log("erro: não foi possível realizar operação")
            break
          
          
        }

      }else{
        console.log("id não cadastrado: id não foi encontrado na tabela")
      }
      
        
    }