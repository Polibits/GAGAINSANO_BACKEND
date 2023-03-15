const dotenv = require('dotenv/config');
const axios = require('axios');
const UserController = require("./Controllers/UserController");
//const UserInfo = require("../models/userInfo");
const UserCred = require("./models/usercripto")
//const CourseAcess = require("../models/CourseAcess");
//const Videos = require("../models/videos");
const fullName = "2Henrique Eduardo dos Santos de Souza";
const preferedName = "2Henrique Eduardo";
const email = "henrique_eduardo_souza@hotmail.com";
const password = "2henrique123";
const cpf = "456.456.456-78";
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const crypto = require("crypto");

// UserController.registerUser(fullName, preferedName, email, password, cpf);

//var exists = UserController.userEmailExists(email);
//console.log(exists);


async function findUser(email) {
    const shaEmails = sha256(email)
    const usersInDB = await UserCred.findOne({
        where: {email:shaEmails},
            raw: true,
        });
    console.log(sha256(email))
    // Método para transformar Objeto em Json String
    const userInDBJson = JSON.parse(JSON.stringify(usersInDB));
    console.log(userInDBJson)
    console.log(usersInDB)
    return userInDBJson;
}
function sha256(content) {
    return crypto.createHash("sha256").update(content).digest("hex");
}

 findUser('gui@gui.com').then((result) => {
    console.log(result) 
})

