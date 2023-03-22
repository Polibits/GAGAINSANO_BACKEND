const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');


router.post('/user/create', UserController.registerUser);
router.get('/user/read', UserController.getUserInfo);
router.get('/user/read/all', UserController.getAllUsersInfo);
router.post('/user/update');
router.post('/user/delete' , UserController.deleteUser);
router.get('/user/authenticate', UserController.authenticateCredentials);
router.get('/user/test', UserController.test);

module.exports = router;