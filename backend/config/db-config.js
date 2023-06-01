require("dotenv").config();

module.exports = {
  HOST: "localhost",
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DATABASE: process.env.MYSQL_DATABASE,
  DIALECT: "mysql",
};
