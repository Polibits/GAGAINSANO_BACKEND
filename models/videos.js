const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Videos = db.define('User' , {
    name: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    title: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    order: {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },


})

module.exports = Videos