const { DataTypes } = require('sequelize')

const db = require('../db/conn')

// User model definition
const User = db.define('ManoelUser', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

module.exports = User;