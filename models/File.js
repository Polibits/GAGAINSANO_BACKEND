const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Files = db.define('Files' , {
    fileId: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

module.exports = Files;