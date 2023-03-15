const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const CourseController = require('../Controllers/CourseController');

/**
 * rota de criação de usuário
 */
router.post('/user/create', UserController.registerUser )


//router.get('/user/read')

//router.post('/user/update')

//router.post('/user/delete')
    


//router.post('/user/activate')
    


router.post('/user/authenticate'  , UserController.authenticateCredentials)
 
    


module.exports = router