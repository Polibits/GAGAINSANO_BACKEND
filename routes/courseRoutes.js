const express = require('express');
const router = express.Router();
const CourseController = require('../Controllers/CourseController');

router.post('/courses/create', CourseController.createCourseFramework)

router.get('/courses/read/all', CourseController.getAllCoursesFrameworks)

router.get('/courses/read', CourseController.getCourseFramework)

router.post('/courses/content/lectures/add', CourseController.registerCourseContent)

router.get('/courses/content/lectures/read', CourseController.getCourseContent)

router.get('/files/get', CourseController.getFile)

router.post('/files/upload', CourseController.saveFile)

module.exports = router;