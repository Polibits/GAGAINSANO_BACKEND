/* importações padrão */
const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const CourseController = require('../Controllers/CourseController');

router.post('/user/create', function (req, res) {
    const fullName = req.body.fullName; 
    const preferedName = req.body.preferedName; 
    const email = req.body.email; 
    const password = req.body.password; 
    const cpf = req.body.cpf;

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



//Login
//router.post('/login' ,  UserController.Login);

//Obter Informações ====================================================
//router.get('/getUserInfo' ,  UserController.getUserInfo)

//Autenticações ========================================================
//router.get('/authenticateCredentials');


router.get('/getCourseAcessPermission')

//Rotas que registram ==================================================
//router.post('/register' , UserController.registerUser);
//router.post('/registerNewCourse', CourseController.registerNewCourse )
router.post('/activateAccount')
router.post('/contentUpload')
//router.post('/registerLog' , CourseController.registerLog);

//Rotas que atualizam ==================================================
router.put('/modifyCourseAcessPermission')



module.exports = router