//======================= importando Routers e Express =================
const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/UserController')
const CourseController = require('../Controllers/CourseController');
//======================================================================
const auth = require
//Login
router.post('/login' ,  UserController.Login);

//Obter Informações ====================================================
router.get('/getUserInfo' ,  UserController.getUserInfo)

//Autenticações ========================================================
router.get('/authenticateCredentials')
router.get('/getCourseAcessPermission')

//Rotas que registram ==================================================
router.post('/register' , UserController.Register);
router.post('/registerNewCourse', CourseController.registerNewCourse )
router.post('/activateAccount')
router.post('/contentUpload')
router.post('/registerLog' , CourseController.registerLog);

//Rotas que atualizam ==================================================
router.put('/modifyCourseAcessPermission')



module.exports = router