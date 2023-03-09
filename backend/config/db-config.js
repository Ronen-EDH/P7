require("dotenv").config();

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: process.env.SEQUELIZE_PW,
  DATABASE: "groupomania-webapp",
  DIALECT: "mysql",
};
