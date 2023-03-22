const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const CourseFramework = db.define('CourseFramework', {
    comercialName:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    courseCode:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
        unique: true
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false,
        require: true
    },
    price:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        require: true
    },
    paymentFrequency:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
});

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

const CourseAcess = db.define('CourseAcess' , {
    UserId : {
        type: DataTypes.STRING,
        allowNull : false,
        require: true,
        unique: true
    }
});

module.exports = {
    CourseFramework,
    CourseContent,
    CourseAcess
}