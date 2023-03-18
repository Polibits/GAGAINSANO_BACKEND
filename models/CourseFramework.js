const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const CourseFramework = db.define('CourseFramework', {
    comercialName:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    courseCode:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
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

module.exports = CourseFramework