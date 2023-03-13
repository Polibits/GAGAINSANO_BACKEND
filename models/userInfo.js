const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const UserInfo = db.define('UserInfo' , {
    fullName: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    preferedName: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    cpf: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    userType: {
        type: DataTypes.STRING ,
        allowNull : true ,
        require: false,
    },
    UserId: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },


})

module.exports = UserInfo