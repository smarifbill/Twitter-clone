module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define(
    "followers",
    {
      //user_id as key does not allow user to post multiple tweets, throws sequelize error
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      likes: {
        type: DataTypes.INTEGER,
        required: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    //other options
    {
      underscored: true,
    }
  );
  /*
  Posts.associate = function (models) {
    Posts.belongsTo(models.Users, { as: "User", foreignKey: "user_id" });
  };
  */
  return Followers;
};
