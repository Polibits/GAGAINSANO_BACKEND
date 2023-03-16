const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const CourseController = require('../Controllers/CourseController');

/**
 * rota de criação de usuário
 */
router.post('/user/create', UserController.registerUser)

router.get('/user/read', UserController.getUserInfo)

router.get('/user/read/all', UserController.getUsers)

//router.post('/user/update')

<<<<<<< HEAD
router.post('/user/delete' , UserController.deleteUser )
=======
//router.post('/user/delete')

router.post('/user/activateAccount',  UserController.activateAccount)
>>>>>>> a15852cc3e79b31297e6b16851ccc6ad8644dadc
    
router.post('/user/authenticate', UserController.authenticateCredentials)
 
module.exports = router;