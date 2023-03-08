const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const UserInfo = db.define('UserInfo' , {
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
    CPF: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    usertype: {
        type: DataTypes.STRING ,
        allowNull : true ,
        require: false,
    },


})

module.exports = UserInfo