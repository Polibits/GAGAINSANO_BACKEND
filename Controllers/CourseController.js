const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const crypto = require("crypto");
const fs = require('fs');
const dir = "C:/Temp/Xisto";
const path = require('path');
const fileUpload = require('express-fileupload');

const Courses = require("../models/Courses");
const CourseAcess = Courses.CourseAcess;
const CourseFramework = Courses.CourseFramework;
const CourseContent = Courses.CourseContent;

const fileSecretNameLenght = 64;

module.exports = class CourseController {
    static async createCourseFramework(req, res) {
        try {
            const newCourseFramework = {
                comercialName: req.body.comercialName,
                courseCode: req.body.courseCode,
                description: req.body.description,
                price: req.body.price,
                paymentFrequency: req.body.paymentFrequency
            }
            const createdCourseFramework = await CourseFramework.create(newCourseFramework);
            res.send({
                'response':'sucess',
                'course':newCourseFramework
            });
        } catch (error) {
            res.send({
                'response':'error',
                'details':error
            });
        }
    }
    static async getAllCoursesFrameworks(req, res) {
        try {
            const coursesFrameworks = await CourseFramework.findAll();
            res.send({
                'response':'sucess',
                'coursesFrameworks':coursesFrameworks
            });
        } catch (error) {
            res.send({
                'response':'error',
                'details':error
            });
        }
    }
    static async getCourseFramework(req, res) {
        try {
            const courseCode = req.query.courseCode;
            const courseFramework = await CourseFramework.findOne({
                where:{
                    courseCode:courseCode
                }
            });
            if(courseFramework){
                res.send({
                    'response':'sucess',
                    'message':'curso obtido com sucesso',
                    'coursesFrameworks':courseFramework
                });
            } else {
                res.send({
                    'response':'course_not_founded',
                    'message':'curso não pode ser encontrado'
                });
            }
            
        } catch (error) {
            res.send({
                'response':'error',
                'message':'não foi possível obter curso',
                'details':error
            });
        }
    }
    static async getFile(req, res) {
        const filePrivatePath = req.query.filePrivatePath;
        const authenticationToken = req.query.authenticationToken;
        const privatePath = '../files/' + filePrivatePath;
        try {
            res.sendFile(path.join(__dirname, privatePath));
        } catch (error) {
            res.send('error');
        }
    }

    static async saveFile(req, res) {
        try {
            //console.log(req.files);
            for(var file in req.files){
                const video = req.files[file];
                const fileSecretName = randomHexString(fileSecretNameLenght);
                const fileExtension = getFileExtension(video.name);
                const privatePath = '../files/videos/' + fileSecretName + '.' + fileExtension;
                const uploadPath = path.join(__dirname, privatePath);
                
                video.mv(uploadPath, function(error) {
                    if (error){
                        res.send({
                            'response':'error',
                            'details':error
                        });
                    }
                    res.send({
                        'response':'sucess',
                        'privatePath':privatePath
                    });
                  });
            }
            
        } catch (error) {
            res.send({
                'response':'error',
                'details':error
            });
        }   
    }

    static async getCourseContent(req, res) {
        const courseCode = req.query.courseCode;

        try {
            console.log(courseCode);
            const courses = await CourseContent.findAll(
                {where: {courseCode:courseCode}}
            );
            res.send({
                'response':'sucess',
                'courses':courses
            });
        } catch (error) {
            res.send({
                'response':'error',
                'details':error
            });
        }
    }

    static async registerCourseContent(req, res) {
        const lecture = {
            courseCode:req.body.courseCode,
            title:req.body.title,
            order:req.body.order,
            privatePath:req.body.privatePath,
            description:req.body.description,
            chapterName:req.body.chapterName
        }
        
        try {
            const created = await CourseContent.create(lecture);
            res.send({
                'response':'sucess',
                'message':'aula registrada com sucesso'
            });
        } catch (error) {
            res.send({
                'response':'error',
                'details':error
            });
        }
    }
}

function sha256(content) {
    return crypto.createHash("sha256").update(content).digest("hex");
}

function randomHexString(length) {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
}

function getFileExtension(fileName) {
    var extension = '';
    var crossedDot = false;
    
    for(var i = 0; i < fileName.length; i++){
        if(fileName[i] == '.'){
            crossedDot = true;
            i = i + 1;
        }
        if(crossedDot == true){
            extension = extension + fileName[i];
        }
    }
    
    return extension;
}