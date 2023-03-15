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
db.models.Post = require("./post")(sequelize, Sequelize.DataTypes);

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

User.hasMany(Post, {
  foreignKey: {
    //I don't know why but this one doesn't work :( (according to workbench, but it does seem to work when I actually assigning data
    //"notNull Violation: post.userId cannot be null")
    allowNull: false,
  },
});
Post.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

sequelize
  .sync({ alter: false, force: false })
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

module.exports = { db, connectToDb };
