const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const CourseController = require('../Controllers/CourseController');

router.get('/teste', function (req, res) {
    res.send({'message':'teste'});
});