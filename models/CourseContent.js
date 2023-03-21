const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const CourseContent = db.define('CourseContent' , {
    courseCode: {
        type: DataTypes.STRING,
        allowNull : false,
        require: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull : false,
        require: true
    },
    chapterName: {
        type: DataTypes.STRING,
        allowNull : false,
        require: true
    },
    order: {
        type: DataTypes.STRING,
        allowNull : false,
        require: true
    },
    privatePath: {
        type: DataTypes.STRING,
        allowNull : false,
        require: true
    },
    description : {
        type: DataTypes.STRING,
        allowNull : false,
        require: false
    },
})

module.exports = CourseContent;