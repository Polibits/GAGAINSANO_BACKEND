const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const CourseController = require('../Controllers/CourseController');

/**
 * rota de criação de usuário
 */
router.post('/user/create', function (req, res) {
    const fullName = req.body.fullName; 
    const preferedName = req.body.preferedName; 
    const email = req.body.email; 
    const password = req.body.password; 
    const cpf = req.body.cpf;

    res.send({
        'response':'sucess', 
        'message':'usuário registrado com sucesso',
        'data':{
            fullName,
            preferedName,
            email,
            password,
            cpf
        }
    });
    
    if(UserController.userEmailExists(email)){
        res.send({ 
            'response':'email_alredy_exists', 
            'message':'email já cadastrado'
        });
    } else if(UserController.userCPFExists(cpf)){
        res.send({
            'response':'cpf_alredy_exists', 
            'message':'cpf já cadastrado'
        });
    } else {
        try {
            UserController.registerUser(fullName, preferedName, email, password, cpf);
            res.send({
                'response':'sucess', 
                'message':'usuário registrado com sucesso'
            });
        } catch (error) {
            res.send({
                'response':'operation_error', 
                'message':'não foi possível executar esta operação'
            });
        }
    }
});

router.get('/user/read', function (req, res) {

});

router.post('/user/update', function (req, res) {
    
});

router.post('/user/delete', function (req, res) {
    
});

router.post('/user/activate', function (req, res) {
    
});

router.get('/user/authenticate', function (req, res) {
    
});

module.exports = router