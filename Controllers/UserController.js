const UserInfo = require("../models/UserInfo");
const UserCredentials = require("../models/UserCredentials");
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

module.exports = class UserController{
    /**
     * registra um usuário no banco de dados
     * @param {string} fullName nome completo do usuário 
     * @param {string} preferedName apelido ou nome social
     * @param {string} email email do usuário
     * @param {string} password senha do usuário
     * @param {string} cpf cpf do usuário
     * @returns nada
     */
    static async registerUser(req, res) {
        const fullName = req.body.fullName; 
        const preferedName = req.body.preferedName; 
        const email = req.body.email; 
        const password = req.body.password; 
        const cpf = req.body.cpf;

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
    
        /* tentar registrar credenciais em UserCredentials */
        try{
            const createdUserCred =  await UserCredentials.create(userCredentials);
        }catch(error){
            res.send({
                'response':'error',
                'message':'não foi possível registrar credenciais do usuário',
                'details':error
            });
            console.log(error);
        }

        /* tentar registrar credenciais em UserCredentials */
        try{
            const createdUserInfo =  await UserInfo.create(userInfo);
        }catch(error){
            res.send({
                'response':'error',
                'message':'não foi possível registrar informações de perfil do usuário',
                'details':error
            });
            console.log(error);
        }

        /* tentar registrar credenciais em UserCredentials */
        try{
            const createdUserCourseAcess = await CourseAcess.create(userCourseAcess);
        }catch(error){
            res.send({
                'response':'error',
                'message':'não foi possível registrar informações de acesso aos cursos do usuário',
                'details':error
            });
            console.log(error);
        }

        /* sucesso de todas as etapas */
        res.send({
            'response':'sucess',
            'message':'usuário criado com sucesso',
            'details':userInfo
        });
    }    

    /**
     * verifica se credenciais são válidas
     * @param {string} email email do usuário 
     * @param {string} password senha do usuário
     * @returns {boolean} retorna true se credenciais são válidas
     */
    static async authenticateCredentials(req , res) {
        const email = req.body.email;
        const password = req.body.password;
        const SHAemail = sha256(email);
        
        /* verifica se usuário existe */
        const user = await UserCredentials.findOne({ where: { email : SHAemail}})

        if(user) {
            const databasePassword = user.password;
            const salt = user.salt;
        
            if(sha256(password + salt) == databasePassword){
                res.send({
                    'response':'sucess',
                    'message':'autenticação bem sucedida'
                });
            }
            else{
                res.send({
                    'response':'wrong_passsword',
                    'message':'senha incorreta'
                });
            }
        } else {
            res.send({
                'response': 'email_not_found',
                'message':'email não encontrado'
            })
        }
    }

    static async activateAccount(req, res) {
        const email = req.body.email;
        const activationCode = req.body.activationCode;
        const SHAemail = sha256(email)

        const userActivationStatus = {activated: true}

        try{
            await UserCredentials.update(
                userActivationStatus , 
                {where: {email : SHAemail}
            });
            res.send({
                'response':'sucess',
                'message': 'conta ativada com sucesso'
            });
        } catch(error){
            res.send({
                'response':'error',
                'message': 'não foi possível autenticar conta'
            });
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await UserCredentials.findAll();
            if(users){
                res.send({
                    'response':'sucess',
                    'message':'usuários obtidos com sucesso',
                    'users':users
                });
            }
        } catch(error) {
            res.send({
                'response':'error',
                'message':'não foi possível obter usuários',
                'details':error
            });
        }
    }

    static async getUser(req, res) {
        const userId = req.body.UserId;
        console.log('buscando usuário de id ', userId);
        try {
            const user = await UserCredentials.findOne(
                {where:{'UserId':userId}}
            );
            console.log('----------------------', user)
            if(user){
                res.send({
                    'response':'sucess',
                    'message':'usuário obtido com sucesso',
                    'user':user
                });
            } else {
                res.send({
                    'response':'id_does_not_exists',
                    'message':'id do usuário não existe',
                    'user':user
                });
            }
        } catch(error) {
            res.send({
                'response':'error',
                'message':'não foi possível buscar usuário',
                'details':error
            });
        }
    }
}

function newUserID() {
    return crypto
        .randomBytes(Math.ceil(userIDLenght / 2))
        .toString("hex")
        .slice(0, userIDLenght);
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