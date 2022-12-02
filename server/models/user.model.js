const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConfig');
    const user = sequelize.define(
        "users",
        {  
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        name: {
            type: Sequelize.STRING,                
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,                
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,                
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,                
            allowNull: false
        },           
        verification_code:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
        },
        { timestamps: false }
    );

    // Address.sync();
    module.exports = user;