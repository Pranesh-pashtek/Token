//import 
const Sequelize = require("sequelize");
const env = require('dotenv');

env.config();

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS,  {
    host:process.env.DB_HOST,
    dialect: "mysql", host:"localhost"
});
sequelize.authenticate().then(() => {
    console.log('db connected successfully')
})

module.exports = sequelize;
