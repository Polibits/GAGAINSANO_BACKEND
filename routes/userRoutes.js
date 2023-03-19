const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const CourseController = require('../Controllers/CourseController');

/**
 * rota de criação de usuário
 */
router.post('/user/create', UserController.registerUser)

router.get('/user/read', UserController.getUserInfo)

router.get('/user/read/all', UserController.getAllUsersInfo)

//router.post('/user/update')

router.post('/user/delete' , UserController.deleteUser )
    
router.get('/user/authenticate', UserController.authenticateCredentials)

router.get('/user/test', UserController.test)

router.post('/courses/framework/create', CourseController.createCourseFramework)

router.get('/courses/framework/read/all', CourseController.getAllCoursesFrameworks)

router.get('/files/get', CourseController.getFile)

router.post('/files/upload', CourseController.saveFile)
 
module.exports = router;