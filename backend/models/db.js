const dbConfig = require("../config/db-config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
});

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.User = require("./user")(sequelize, Sequelize.DataTypes);

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

/* const User = db.models.User;

User.sync().then(() => {
  const user = User.build({ username: "apple", password: "strongpass" });
  console.log(user.username);
  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).json({
  //       message: "User added successfully!",
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({
  //       error: error.message,
  //     });
  //   });
}); */

module.exports = { db, connectToDb };
