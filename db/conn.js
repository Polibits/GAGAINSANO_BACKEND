const {Sequelize} = require('sequelize')
// nome do bd, user e senha!
const sequelize = new Sequelize('gagadb' , 'gui' ,'guigui167', {
    host: 'localhost' ,
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log("Conectamos com sucesso")
} catch(err){
    console.log("Não foi possível" + err)
}



module.exports = sequelize;