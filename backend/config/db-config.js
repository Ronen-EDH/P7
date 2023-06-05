require("dotenv").config();

module.exports = {
  HOST: "localhost",
  USER: process.env.SEQUELIZE_User,
  PASSWORD: process.env.SEQUELIZE_PW,
  DATABASE: "groupomania",
  DIALECT: "mysql",
};
