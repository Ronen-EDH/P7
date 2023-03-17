module.exports = (sequelize, DataTypes) => {
  const PostRead = sequelize.define(
    "postread",
    {
      postreadId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    {
      freezeTableName: true,
    }
  );

  return PostRead;
};
