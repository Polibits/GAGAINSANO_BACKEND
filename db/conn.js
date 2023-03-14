const dotenv = require('dotenv/config');
const {Sequelize} = require('sequelize')
// nome do bd, user e senha!
const sequelize = new Sequelize(
    process.env.DATABASE_NAME , 
    process.env.DATABASE_USERNAME ,
    process.env.DATABASE_PASSWORD, 
    { host: 'localhost' , dialect: 'mysql' }
)

try {
    sequelize.authenticate()
    console.log("Conectamos com sucesso")
} catch(err){
    console.log("Não foi possível" + err)
}



module.exports = sequelize;