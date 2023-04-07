module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "post",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      createdBy: { type: DataTypes.INTEGER, allowNull: false },
      text: { type: DataTypes.TEXT },
      file: { type: DataTypes.STRING },
      altText: { type: DataTypes.STRING },
    },
    {}
  );

  return Post;
};
