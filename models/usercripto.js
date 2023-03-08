const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const UserCred = db.define('UserCred' , {
    email: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    password: {
        type: DataTypes.STRING ,
        allowNull : true ,
        require: true,
    },
    salt:{
        type: DataTypes.STRING ,
        allowNull : false ,
        require: false,
    },
    activationCode: {
        type: DataTypes.INTEGER,
        allowNull : true,
        require: false,
    },
    activationDeadline: {
        type: DataTypes.DATE ,
        allowNull : true ,
        require: false,
    },
    activated: {
        type: DataTypes.BOOLEAN ,
        allowNull : true ,
        require: false,
    },




})

module.exports = UserCred