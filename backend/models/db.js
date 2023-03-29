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

// sequelize
//   .sync({ alter: false, force: false })
//   .then(() => {})
//   .catch((err) => {
//     console.log(err);
//   });

sequelize
  .sync({ alter: false, force: false })
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

module.exports = { db, connectToDb };

/* sequelize
  .sync({ alter: true, force: false })
  .then(() => {
    Post.bulkCreate([
      { title: "Best Title", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam doloribus eum, maxime consectetur adipisci veniam.", file: "https://picsum.photos/300/200" },
      { title: "Good Title", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", file: "https://picsum.photos/300/200" },
    ]);
  })
  .catch((err) => {
    console.log(err);
  }); */

/*   let user, post;

  sequelize
    .sync({ alter: true, force: false })
    .then(() => {
      return User.findOne({ where: { email: "testapi@email.com" } });
    })
    .then((data) => {
      user = data;
      return Post.findAll();
    })
    .then((data) => {
      post = data;
      user.addPosts(post);
    })
    .catch((err) => {
      console.log(err);
    }); */
