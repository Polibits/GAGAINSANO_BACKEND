const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const CourseContent = db.define('CourseContent' , {
    IdCourse : {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    name : {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
    description : {
        type: DataTypes.STRING ,
        allowNull : false ,
        require: true,
    },
})

module.exports = CourseContent