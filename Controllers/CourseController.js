const UserInfo = require("../models/UserInfo");
const UserCredentials = require("../models/UserCredentials");
const CourseAcess = require("../models/CourseAcess");
const CourseContentModel = require('../models/CourseContent')
const Videos = require("../models/videos");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const crypto = require("crypto");
const saltLength = 64;
const fs = require('fs');
const dir = "C:/Temp/Xisto";

function registerNewCourse(ID, name, description){
    const Course = { ID, name,description}
    try{
        const createdCourse =  CourseContentModel.create(Course)
        console.log(createdCourse)
        console.log('sucesso: curso registrado com sucesso')
        //Verifica se não existe pasta
        if (!fs.existsSync(name)){
            console.log("Foi possível Criar o Diretório");
        fs.mkdir(name, (err) => {
        if (err) {
            console.log("Não Foi possível Criar o Diretório");
            return
        }else{
            console.log("Diretório criado!, o nome dele é" + name)
        }});}
        }catch(e){
        console.log(e)
        console.log("erro: não foi possível realizar operação")}
}

function getCourseInfo(courseID){
    const CourseContent = CourseContentModel.findOne({
        where: {
            Id: courseID,
        },
        raw: true,
      });
      const CCJson = JSON.parse(JSON.stringify(CourseContent));
      console.log(CCJson);
}