const dotenv = require('dotenv/config');
const {Sequelize} = require('sequelize')

// credenciais de acesso do banco de dados mysql
const sequelize = new Sequelize(
    process.env.DATABASE_NAME , 
    process.env.DATABASE_USERNAME ,
    process.env.DATABASE_PASSWORD, 
    { 
        host: 'localhost' , 
        dialect: 'mysql' 
    }
)

module.exports = sequelize;