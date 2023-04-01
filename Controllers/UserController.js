const EmailController = require('./EmailController');
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const crypto = require("crypto");

const Users = require("../models/Users");
const Courses = require("../models/Courses");

const UserInfo = Users.UserInfo;
const UserCredentials = Users.UserCredentials;
const CourseAcess = Courses.CourseAcess;

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
     * @param {string} username nome de usuário
     * @param {string} email email do usuário
     * @param {string} password senha do usuário
     * @param {string} cpf cpf do usuário
     * @returns nada
     */
    static async registerUser(req, res) {
        const fullName = req.body.fullName; 
        const username = req.body.username; 
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
        const integrityHash = sha256(email + password + salt);
        
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
            "UserId" : UserId,
        }
    
        const userInfo = {
            "UserId": UserId,
            "fullName": fullName,
            "username": username,
            "email": email,
            "userType": defaultUserType,
            "cpf": cpf,
            "integrityHash": integrityHash
        }
    
        const userCourseAcess = {
            UserId: UserId
        };
    
        console.log(userCredentials);
        console.log(userInfo);
        console.log(userCourseAcess);

        // enviar código de confirmação
        try {
            const text = 'Olá, ' + username + 
            '!\nSeja muito bem-vindo ao Gaga Insano!\n\n O código de ativação da sua conta é este:\n' + activationCode + '\n' +
            '\nPara ativar sua conta, acesse www.gagainsano.com.br, faça login com seu email e senha e insira este código' +
            '\n\nAtenção: este código expira em 1 hora' + 
            'Caso tenha problemas, contate o suporte técnico' + 
            '\ngagainsano.suporte@gmail.com\n' +
            '\n\nEsta é uma mensagem automática, enviada pelo servidor';
            const htmlText = '<h1>Olá, ' + username + '!</h1>' + 
            '<h2>Seja muito bem-vindo(a) ao Gagá insano!</h2>' +
            '<p>Seu código de ativação é: <b>' + activationCode + '</b><p/>' +
            '\n<p>Para ativar sua conta, acesse <a>www.gagainsano.com.br</a>, faça login com seu email e senha e insira este código</p>' +
            '\n<p>Atenção: este código expira em 1 hora<br>'+
            '\nCaso tenha problemas, contate o suporte técnico<br>'+
            '\ngagainsano.suporte@gmail.com</p>' +
            '\n<p>Esta é uma mensagem automática, enviada pelo servidor</p>';

            const message = new EmailController.Message(
                'código de verificação', 
                text, 
                htmlText, 
                [email]
            );
            console.log(htmlText);
            const send = await EmailController.ServerSendEmail(message);
        } catch (error) {
            console.log(error);
            res.send({
                'response':'error',
                'message':'não foi possível registrar usuário',
                'details':error
            });
            return;
        }
    
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
            return;
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
            return;
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
            return;
        }

        /* sucesso de todas as etapas */
        res.send({
            'response':'sucess',
            'message':'usuário criado com sucesso',
            'details':userInfo
        });
    }

    static async getAllUsersInfo(req, res) {
        try {
            const users = await UserInfo.findAll();
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

    static async getUserInfo(req, res) {
        const userId = req.query.UserId;
        const email = req.query.email;
        const cpf = req.query.cpf;

        console.log(userId);
        console.log(email);
        console.log(cpf);
        try {
            if(userId != undefined){
                const user = await UserInfo.findOne(
                    {where:{'UserId':userId}}
                );
                if(user){
                    res.send({
                        'response':'sucess',
                        'message':'usuário obtido com sucesso',
                        'user':user
                    });
                } else {
                    res.send({
                        'response':'id_does_not_exists',
                        'message':'id do usuário não existe'
                    });
                }
            } else if(email != undefined){
                const user = await UserInfo.findOne(
                    {where:{'email':email}}
                );
                if(user){
                    res.send({
                        'response':'sucess',
                        'message':'usuário obtido com sucesso',
                        'user':user
                    });
                } else {
                    res.send({
                        'response':'email_does_not_exists',
                        'message':'email do usuário não existe'
                    });
                }
            } else if(cpf != undefined) {
                const user = await UserInfo.findOne(
                    {where:{'cpf':cpf}}
                );
                if(user){
                    res.send({
                        'response':'sucess',
                        'message':'usuário obtido com sucesso',
                        'user':user
                    });
                } else {
                    res.send({
                        'response':'cpf_does_not_exists',
                        'message':'cpf do usuário não existe'
                    });
                }
            }
        } catch(error) {
            res.send({
                'response':'error',
                'message':'não foi possível buscar usuário',
                'details':error
            });
        }
    }

    static async getActivationStatus(req, res) {
        var email = req.query.email;
        try {
            const userCredentials = await UserCredentials.findOne(
                {where:{'email':sha256(email)}}
            );
            console.log(userCredentials.dataValues.activated);
            if(userCredentials.dataValues.activated == true){
                
                res.send({
                    'response':'sucess',
                    'activated':true,
                    'message':'status de ativação da conta obtido com sucesso'
                });
                return;
            } else {
                
                res.send({
                    'response':'sucess',
                    'activated':false,
                    'message':'status de ativação da conta obtido com sucesso'
                });
                return;
            }
            
        } catch (error) {
            console.log(error);
            res.send({
                'response':'error',
                'message':'não foi possível obter status de ativação da conta',
                'details':error
            });
            return;
        }
    }

    static async setActivationStatus(req, res) {
        var email = req.body.email;
        var activationCode = req.body.activationCode;
        const userActivationStatus = {activated: true}
        console.log(req.body);
        
        try {
            const userCredentials = await UserCredentials.findOne({
                where: {email: sha256(email)}
            });
            console.log(userCredentials.dataValues);
            if(userCredentials.activationCode == activationCode){
                try {
                    await UserCredentials.update(
                        userActivationStatus,
                        {where: {email: sha256(email)}
                    });
                } catch (error) {
                    res.send({
                        'response':'user_not_found',
                        'message':'usuário não encontrado'
                    });
                    return;
                }
            } else {
                res.send({
                    'response':'wrong_activation_code',
                    'message':'código de autenticação incorreto'
                });
                return;
            }
            
            res.send({
                'response':'sucess',
                'message':'conta ativada com sucesso'
            });
            return;
        } catch (error) {
            res.send({
                'response':'error',
                'message':'não foi possível modificar status de ativação da conta',
                'details':error
            });
            return;
        }
    }

    // TODO implementar melhor
    static async deleteUser(req , res){
        const email = req.body.email;
        const id = req.body.id;

        try{
            UserInfo.destroy({ where: { id: id } })  
            UserCred.destroy({ where: { id: id } })
            CourseAcess.destroy({ where: { id: id } })
        }catch(e){
            console.log(e)
        }


    }

    /**
     * verifica se credenciais são válidas
     * @param {string} email email do usuário 
     * @param {string} password senha do usuário
     * @returns {boolean} retorna true se credenciais são válidas
     */
    static async authenticateCredentials(req , res) {
        try {
            const email = req.query.email;
            const password = req.query.password;
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
        } catch (error) {
            res.send({
                'response':'error',
                'details':error
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

    

    static async test(req, res) {
        try {
            const email = req.query.email;
            const password = req.query.password;
            console.log(req.query);
            res.send({
                'response':'sucess',
                'email':email,
                'password':password
            });
        } catch (error) {
            res.send({
                'response':'error',
                'details': error
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