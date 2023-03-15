module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "post",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      // Should I use STRING(1234)? or just STRING instead of TEXT?
      text: { type: DataTypes.TEXT, allowNull: false },
      img: { type: DataTypes.STRING },
      isRead: { type: DataTypes.BOOLEAN },
    },
    {}
  );

  return Post;
};
