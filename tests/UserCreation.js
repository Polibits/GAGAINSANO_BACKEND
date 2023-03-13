const UserController = require("./Controllers/UserController");

const fullName = "Henrique Eduardo dos Santos de Souza";
const preferedName = "Henrique Eduardo";
const email = "henrique_eduardo_souza@hotmail.com";
const password = "henrique123";
const cpf = "456.456.456-78";

UserController.registerUser(fullName, preferedName, email, password, cpf);