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
function registerUser(fullName, preferedName, email, password, cpf) {
    /* registro das Credenciais */
    const UserId = newUserID();
    const defaultUserType = 'student';

    /* criptografar dados */
    const salt = newSalt(saltLength);
    const SHAemail = sha256(email)
    const SHApassword = sha256(password + salt);
    
    /* activation Status */
    const activationCode = randomString(activationCodeLenght);
    const activationDeadline = ""; //TODO
    const activated = false;

    const userCredentials = {
        "email": SHAemail,
        "password": SHApassword,
        "salt": salt,
        "activationCode": activationCode,
        //"activationDeadline": activationDeadline,
        "activated": activated,
        "UserId" : UserId
    }

    const userInfo = {
        "UserId": UserId,
        "fullName": fullName,
        "preferedName": preferedName,
        "email": email,
        "userType": defaultUserType,
        "cpf": cpf
    }

    const userCourseAcess = {
        UserId: UserId,
        gaga_insano_fisica: false,
        gaga_insano_matematica: false,
        gaga_insano_fuvest: false,
    };

    console.log(userCredentials);
    console.log(userInfo);
    console.log(userCourseAcess);

    // tentar registrar credenciais em UserCredentials
    try {
        const createdUserCred =  UserCred.create(userCredentials);
    } catch (error) {
        throw error;
    }

    // tentar registrar informações em UserInfo
    try {
        createdUserInfo =  UserInfo.create(userInfo);
    } catch (error) {
        throw error;
    }

    // tentar registrar usuário em userCourseAcess
    try {
        // registro bem sucedido de credenciais
        const createdUserCourseAcess = CourseAcess.create(userCourseAcess);
    } catch (error) {
        // registro bem sucedido de credenciais
        throw error;
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
    
    const user = findUser(email);
    const databasePassword = user.password;
    const salt = user.salt;

    if(sha256(password + salt) == databasePassword)
        valid = true;
    else
        valid = false;

    return valid;
}

/**
 * Ativar conta
 * @param {string} email email do usuário
 * @returns nada
 */
function activateAccount(email) {
    const User = findUser(email)
    const userUpdate = {activated: true}

    try{
        User.update(userUpdate)
    }catch(error){
        throw error;
    }
    
    return;
}


function getUserInfo(userID) {
    const usersCred = UserCred.findOne({
        where: {
            userID: userID,
        },
        raw: true,
      });
    const usersInfo = UserInfo.findOne({
        where: {
            userID: userID,
        },
        raw: true,
      });

    var user = {
        "response": "", 
        "email": usersCred.email, 
        "fullName": usersInfo.fullname, 
        "preferedName": usersInfo.preferedName,  
        "password": usersCred.password, 
        "cpf": usersInfo.CPF
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

/**
 * @param {string} email email do usuário
 * @returns {boolean} verdadeiro se email existe e falso caso contrário
 */
function userEmailExists(email) {
    var exists = false;

    async function find(email) {
        var founded = false;
        const usersInDB = await UserCred.findOne({
            where: { email: sha256(email)}}
        );
        console.log(usersInDB);
        if(usersInDB == true){
            founded = true;
        }
        return founded;
    }

    find(email).then((response) => {
        console.log(response);
        if(response == true)
            exists = true;
    });
    return exists;
}

/**
 * @param {string} cpf cpf do usuário
 * @returns {boolean} verdadeiro se cpf existe e falso caso contrário
 */
function userCPFExists(cpf) {
    var exists = false;
    // TODO implemen
    return exists;
}

// Informações do User com Email //
// Função de achar o seu User //
async function findUser(email) {
    const usersInDB = await UserCred.findOne({
        where: {email: sha256(email)},
            raw: true,
        });
    // Método para transformar Objeto em Json String
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
    getUserInfo,
    userEmailExists
};