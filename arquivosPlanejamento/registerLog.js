const UserInfo = require("../models/userInfo");
const UserCred = require("../models/usercripto");
const CourseAcess = require("../models/CourseAcess");
const CourseContentModel = require('../models/CourseContent')
const Videos = require("../models/videos");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const crypto = require("crypto");
const saltLength = 64;
const fs = require('fs');
const dir = "C:/Temp/Xisto";

//==================================================================
//10. Registrar Log (registerLog)
	//-Entradas: {date, type, description}
	//-Retorno: {response}
	//-Respostas:
		//(a) sucesso: informações obtidas com sucesso
		//(b) erro: não foi possível realizar operação
	//-Operações:
		//(a) registrar log na tabela Log

async function registerLog(type , description){
    
}