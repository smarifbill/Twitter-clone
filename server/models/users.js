const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["user", "admin", "disabled"],
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    //other options
    {
      underscored: true,
    }
  );
  /*
  Users.associate = function (models) {
    Users.hasMany(models.Posts, { as: "Post", foreignKey: "user_id" });
  };
  */

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Users.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  return Users;
};
