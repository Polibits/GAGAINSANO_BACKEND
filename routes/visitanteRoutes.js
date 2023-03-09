//======================= importando Routers e Express =================
const express = require('express')
const router = express.Router()
const visitanteController = require('../Controllers/visitanteController');
const CourseController = require('../Controllers/CourseController');
//======================================================================
const auth = require
//Login
router.post('/login' , visitanteController.Login);

//Obter Informações ====================================================
router.get('/getUserInfo' , visitanteController.getUserInfo)

//Autenticações ========================================================
router.get('/authenticateCredentials')
router.get('/getCourseAcessPermission')

//Rotas que registram ==================================================
router.post('/register' , visitanteController.Register);
router.post('/registerNewCourse', CourseController.registerNewCourse )
router.post('/activateAccount')
router.post('/contentUpload')
router.post('/registerLog' , CourseController.registerLog);

//Rotas que atualizam ==================================================
router.put('/modifyCourseAcessPermission')



module.exports = router