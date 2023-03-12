/*
const UserInfo = require("../models/userInfo");
const UserCred = require("../models/usercripto");
const CourseAcess = require("../models/CourseAcess");
const Videos = require("../models/videos");
*/
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
function registerUser(fullName, preferedName, email, password, cpf) {
    /* Registro das Credenciais */
    const defaultUserType = 'student';
    const salt = newSalt(saltLength);
    const activationCode = randomString(activationCodeLenght);
    const activationDeadline = ""; //TODO
    const activated = false;

    userCredentials = {
        "email": sha256(email),
        "password": sha256(password),
        "salt": salt,
        "activationCode": activationCode,
        "activationDeadline": activationDeadline,
        "activated": activated
    }

    // TODO registrar na tabela UserCredentials

    /* Registro do perfil */
    userInfo = {
        "ID": newUserID(),
        "fullName": fullName,
        "preferedName": preferedName,
        "email": email,
        "userType": defaultUserType,
        "cpf": cpf
    }

    // TODO registrar na UserInfo

    /* Registro do Acesso do Usuário */

    // TODO registrar na tabela CourseAcess
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
        /* veririficar se senha bate */
        // TODO get password
        const databasePassword = "";
        const salt = "";
        if(sha256(password + salt) == databasePassword)
            valid = true;
        else
            valid = false;
    }else
        valid = false;

    console.log(valid);
    return valid;
}

/**
 * 
 * @param {string} email email do usuário
 * @returns 
 */
function activateAccount(email) {
    // TODO modificar tabela sql
    return;
}

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

function userEmailExists() {
    var exists = false;

    // TODO verificar se email existe

    return exists;
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