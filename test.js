const dotenv = require('dotenv/config');
const axios = require('axios');
const UserController = require("./Controllers/UserController");

const fullName = "2Henrique Eduardo dos Santos de Souza";
const preferedName = "2Henrique Eduardo";
const email = "henrique_eduardo_souza@hotmail.com";
const password = "2henrique123";
const cpf = "456.456.456-78";

// UserController.registerUser(fullName, preferedName, email, password, cpf);

var exists = UserController.userEmailExists(email);
console.log(exists);