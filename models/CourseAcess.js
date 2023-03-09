const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const CourseAcess = db.define('CourseAcess' , {
    UserId : {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    gaga_insano_fisica: {
        type: DataTypes.BOOLEAN ,
        allowNull : false ,
        require: true,
    },
    gaga_insano_matematica: {
        type: DataTypes.BOOLEAN ,
        allowNull : false ,
        require: true,
    },
    gaga_insano_fuvest: {
        type: DataTypes.BOOLEAN ,
        allowNull : true ,
        require: false,
    },
    


})

module.exports = CourseAcess