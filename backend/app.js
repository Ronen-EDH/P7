const express = require("express");
const { db, connectToDb } = require("./models/db");
// const sequelize = require("sequelize");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const path = require("path");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "assets")));

connectToDb();

// How to do error catching for this?
// (async () => {
//   await db.sequelize.sync({ alter: true });
// })();

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
