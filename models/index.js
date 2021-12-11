const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstname: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING },
    birth: { type: DataTypes.STRING },
    country: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
},{
    timestamps: false
});

module.exports = {
    User
};