const UserInfo = require("../models/userInfo");
const UserCred = require("../models/usercripto");
const CourseAcess = require("../models/CourseAcess");
const Videos = require("../models/videos");

const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const crypto = require("crypto");

const saltLength = 64;
const activationCodeLenght = 6;
const userIDLenght = 8;

/*
1. Registrar Usuário (registerUser)
2. Autenticação de Credenciais Usuário (authenticateCredentials)
3. Ativação de conta (activateAccount)
4. Obtenção de Informações do Usuário (getUserInfo)
*/

// rota para crição de usuário
function createUser(fullName, preferedName, email, password, cpf) {

    if(userEmailExists(email) == true){
        // mandar resposta email já existe
    } else if(userCPFExists(cpf) == true){
        // mandar resposta cpf já existe
    }
    try {
        registerUser(fullName, preferedName, email, password, cpf);
    } catch (error) {
        // mandar resposta deu erro
    }
    // mandar resposta sucesso
}

/**
 * OPERAÇÕES DE ALTO NÍVEL
 * registerUser
 * authenticateCredentials
 * activateAccount
 * getUserInfo
 * validActivationCode
 */

/**
 * registra um usuário no banco de dados
 * @param {string} fullName nome completo do usuário 
 * @param {string} preferedName apelido ou nome social
 * @param {string} email email do usuário
 * @param {string} password senha do usuário
 * @param {string} cpf cpf do usuário
 * @returns nada
 */
async function registerUser(fullName, preferedName, email, password, cpf) {
    //========= Adquirir Credenciais ===========//
    //=========== UserID =======================//
    const UserId = newUserID();
    //==========================================//
    //========== User Infos ====================//
    const fullname = req.body.fullname;
    const preferedName = req.body.prefname;
    const email = req.body.email;
    const CPF = req.body.cpf;
    //==========================================//
    /* Registro das Credenciais */
    const defaultUserType = 'student';
    const salt = newSalt(saltLength);
    //=========== Criptografar Dados ===========//
    const SHAemail = sha256(email)
    const SHApassword = sha256(password + salt);
    //=========== Activation Status ============//
    const activationCode = randomString(activationCodeLenght);
    const activationDeadline = ""; //TODO
    const activated = false;
    //====== Autenticar Email e cpf ============//

    const userCredentials = {
        "email": SHAemail,
        "password": SHApassword,
        "salt": salt,
        "activationCode": activationCode,
        "activationDeadline": activationDeadline,
        "activated": activated
    }
    const userInfo = {
        "ID": UserId,
        "fullName": fullname,
        "preferedName": preferedName,
        "email": SHAemail,
        "userType": defaultUserType,
        "cpf": CPF
    }
    const userCourseAcess = {
        UserId: UserId,
        gaga_insano_fisica: false,
        gaga_insano_matematica: false,
        gaga_insano_fuvest: false,
      };

      try {
        const createdUserInfo = await UserInfo.create(userInfo);
        const createdUserCred = await UserCred.create(userCredentials);
        const createdUserCA = await CourseAcess.create(userCourseAcess);
        console.log(createdUserInfo, createdUserCred, createdUserCA);
        res.status(200);
        res.send({message:"Usuário registrado com sucesso",
                  code:"sucess"});
      
      } catch (err) {
        console.log(err);
      }
    return;
}

/**
 * verifica se credenciais são válidas
 * @param {string} email email do usuário 
 * @param {string} password senha do usuário
 * @returns {boolean} retorna true se credenciais são válidas
 */
function authenticateCredentials(email, password) {
    var valid = false;
    /* verificar se email existe */
    if(userEmailExists(email)) {
        const user = findUser(email);
        const databasePassword = user.password;
        const salt = user.salt;
        if(sha256(password + salt) == databasePassword)
            valid = true;
        else
            valid = false;
    }else
        valid = false;

    console.log(valid);
    return valid;
}
//========================================================================//


/**
 * 
 * @param {string} email email do usuário
 * @returns 
 */
//===================== ACTIVATE ACCOUNT =================================//
//function activateAccount(email) {
//    return;
//}
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

//=============================================================================

function getUserInfo(userID) {
    var user = {
        "response": "", 
        "email": "", 
        "fullName": "", 
        "preferedName": "", 
        "email": "", 
        "password": "", 
        "cpf": ""
    };

    return user;
}

/**
 * 
 * @param {string} email email do usuário 
 * @param {string} activationCode códifo de ativação
 * @returns 
 */
function validActivationCode(email, activationCode) {
    var valid = false;
    /* encontrar usuário e obter código de autenticação */
    const databaseActivationCode = "";
    if(databaseActivationCode == activationCode){
        valid = true;
    } else {
        valid = false;
    }
    return valid;
}

function newUserID() {
    var newID = "";

    newID = randomNumber(userIDLenght);

    // TODO veriricar unicidade

    return newID;
}
//============ Verificar se Email Existe no UserCredentials ============//
function userEmailExists(email) {
    var exists = false;
    const usersInDB =  UserCred.findOne({
        where: { email: sha256(email)}});
    if(usersInDB){
        exists = true;
    }else{exists = false;}
    return exists;
}
//=========== Informações do User com Email ================================//
//===================== Função de achar o seu User ======
async function findUser(email) {
    const usersInDB = await UserCred.findOne({
      where: {
        email: sha256(email),},
      raw: true,});
//= Método para transformar Objeto em Json String
    const userInDBJson = JSON.parse(JSON.stringify(usersInDB));
    return userInDBJson;
  }


function sha256(content) {
    return crypto.createHash("sha256").update(content).digest("hex");
}

function newSalt(length) {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
}

function randomString(length) {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
}

function randomNumber(length) {
    //TODO implementar para apenas números
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
}

module.exports = {
    registerUser,
    authenticateCredentials,
    activateAccount,
    getUserInfo
};