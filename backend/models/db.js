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

const User = db.models.User;
const Post = db.models.Post;
const PostRead = db.models.PostRead;

User.belongsToMany(Post, { through: PostRead });
Post.belongsToMany(User, { through: PostRead });

const ensureDatabaseCreated = async () => {
  // Open the connection to MySQL server
  const connection = mysql.createConnection({ host: "localhost", user: dbConfig.USER, password: dbConfig.PASSWORD, connectTimeout: 10000 });

  // Run create database statement
  await new Promise((resolve, reject) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS groupomania`, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

  // Close the connection
  connection.end();
};

const connectToDb = async () => {
  try {
    await ensureDatabaseCreated();
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
    sequelize
      .sync({ alter: false, force: false })
      .then(() => {})
      .catch(console.log);
  } catch (error) {
    console.error("Unable to connect to or create the database:", error);
  }
};

module.exports = { db, connectToDb };

/* sequelize
  .sync({ alter: false, force: true })
  .then(() => {
    Post.bulkCreate([
      { title: "Best Title", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam doloribus eum, maxime consectetur adipisci veniam.", altText: "Best Title", file: "https://picsum.photos/300/200" },
      { title: "Good Title", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", file: "https://picsum.photos/300/200", altText: "Good Title" },
    ]);
  })
  .catch((err) => {
    console.log(err);
  }); */
