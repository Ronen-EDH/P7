const dbConfig = require("../config/db-config");
const Sequelize = require("sequelize");
const mysql = require("mysql2");

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
});

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.User = require("./user")(sequelize, Sequelize.DataTypes);
db.models.Post = require("./post")(sequelize, Sequelize.DataTypes);
db.models.PostRead = require("./post_read")(sequelize, Sequelize.DataTypes);

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const User = db.models.User;
const Post = db.models.Post;
const PostRead = db.models.PostRead;

User.belongsToMany(Post, { through: PostRead });
Post.belongsToMany(User, { through: PostRead });

async function createDb() {
  // Open the connection to MySQL server
  const connection = mysql.createConnection({
    host: "localhost",
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
  });

  // Run create database statement
  connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DATABASE}`, function (err, results) {
    console.log(results);
    console.log(err);
  });

  // Close the connection
  connection.end();
}

const updateDb = () => {
  // const result = await createDb();
  sequelize
    .sync({ alter: false, force: false })
    .then(() => {})
    .catch(console.log);
};

createDb().then(updateDb);

// const updateDb = async () => {
//   createDb().then(() => {
//     sequelize
//       .sync({ alter: false, force: false })
//       .then(() => {})
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// };

/* sequelize
  .sync({ alter: true, force: false })
  .then(() => {
    User.bulkCreate([
      { email: "testAPI1@email.com", password: "testAPI1@email.com" },
      { email: "testAPI2@email.com", password: "testAPI2@email.com" },
      { email: "testAPI3@email.com", password: "testAPI3@email.com" },
    ]);
  })
  .catch((err) => {
    console.log(err);
  }); */

module.exports = { db, connectToDb };
