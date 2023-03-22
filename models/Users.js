const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const UserInfo = db.define('UserInfo' , {
    UserId: {
        type: DataTypes.STRING,
        allowNull : false,
        require: true,
        unique:true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull : false,
        require: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull : false,
        require: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull : false,
        require: true,
        unique:true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull : false,
        require: true,
        unique:true
    },
    userType: {
        type: DataTypes.STRING,
        allowNull : true,
        require: false,
    },
    
});

const UserCredentials = db.define('UserCredentials' , {
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
        type: DataTypes.STRING,
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
    UserId: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
})

module.exports = {
    UserInfo,
    UserCredentials
}