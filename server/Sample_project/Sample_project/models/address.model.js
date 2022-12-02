const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConfig');
    const Address = sequelize.define(
        "address",
        {
  
          id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
                autoIncrement: true,
  
  
          },
            profile_pic: {
                type: Sequelize.STRING,
                
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
    module.exports = Address;