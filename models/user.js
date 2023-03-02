const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = db.define('User' , {
    fullname: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    prefname: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    email: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    password: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    CPF: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    usertype: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: false,
    },


})

module.exports = User